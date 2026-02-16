import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { APIError, AuthError, ErrorHandler, NetworkError } from '../errors/error-handler';
import * as secureStorage from '../storage/secure-storage';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.freeapi.app/api/v1';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Type for API error responses
interface APIErrorResponse {
    message?: string;
    errors?: any;
}

class APIClient {
    private client: AxiosInstance;
    private retryCount: Map<string, number>;

    constructor() {
        this.retryCount = new Map();

        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: REQUEST_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor - inject auth token
        this.client.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const token = await secureStorage.getAccessToken();
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - handle errors and retry logic
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                // Clear retry count on successful response
                const requestKey = this.getRequestKey(response.config);
                this.retryCount.delete(requestKey);
                return response;
            },
            async (error: AxiosError) => {
                return this.handleResponseError(error);
            }
        );
    }

    private getRequestKey(config: AxiosRequestConfig): string {
        return `${config.method}-${config.url}`;
    }

    private async handleResponseError(error: AxiosError): Promise<any> {
        const config = error.config;
        if (!config) {
            return Promise.reject(new NetworkError('Request configuration is missing'));
        }

        const requestKey = this.getRequestKey(config);
        const currentRetryCount = this.retryCount.get(requestKey) || 0;

        // Handle network errors
        if (!error.response) {
            if (currentRetryCount < MAX_RETRIES) {
                this.retryCount.set(requestKey, currentRetryCount + 1);
                await this.delay(RETRY_DELAY * Math.pow(2, currentRetryCount)); // Exponential backoff
                return this.client.request(config);
            }
            this.retryCount.delete(requestKey);
            return Promise.reject(new NetworkError('Network error. Please check your connection.'));
        }

        const { status, data } = error.response as { status: number; data: APIErrorResponse };

        // Handle 401 - Unauthorized (try to refresh token)
        if (status === 401) {
            const refreshed = await this.refreshToken();
            if (refreshed && currentRetryCount === 0) {
                this.retryCount.set(requestKey, 1);
                return this.client.request(config);
            }
            this.retryCount.delete(requestKey);
            return Promise.reject(new AuthError('Session expired. Please log in again.'));
        }

        // Handle 408 - Request Timeout (retry)
        if (status === 408 && currentRetryCount < MAX_RETRIES) {
            this.retryCount.set(requestKey, currentRetryCount + 1);
            await this.delay(RETRY_DELAY);
            return this.client.request(config);
        }

        // Handle 429 - Too Many Requests (retry with delay)
        if (status === 429 && currentRetryCount < MAX_RETRIES) {
            this.retryCount.set(requestKey, currentRetryCount + 1);
            await this.delay(RETRY_DELAY * 5); // Longer delay for rate limiting
            return this.client.request(config);
        }

        // Handle 5xx - Server errors (retry)
        if (status >= 500 && currentRetryCount < MAX_RETRIES) {
            this.retryCount.set(requestKey, currentRetryCount + 1);
            await this.delay(RETRY_DELAY * Math.pow(2, currentRetryCount));
            return this.client.request(config);
        }

        this.retryCount.delete(requestKey);

        // Create API error with message from response
        const message = data?.message || ErrorHandler.getMessageForStatusCode(status);
        return Promise.reject(new APIError(message, status, data?.errors));
    }

    private async refreshToken(): Promise<boolean> {
        try {
            const refreshToken = await secureStorage.getRefreshToken();
            if (!refreshToken) {
                return false;
            }

            const response = await axios.post(`${API_BASE_URL}/users/refresh-token`, {
                refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data.data;
            await secureStorage.saveTokens(accessToken, newRefreshToken);
            return true;
        } catch (error) {
            await secureStorage.clearTokens();
            return false;
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Public methods
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.get(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.post(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.put(url, data, config);
        return response.data;
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.patch(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.client.delete(url, config);
        return response.data;
    }
}

export const apiClient = new APIClient();
