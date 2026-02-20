export interface APIResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    page: number;
    limit: number;
    totalPages: number;
    previousPage: boolean;
    nextPage: boolean;
    totalItems: number;
    currentPageItems: number;
    data: T[];
}

export interface APIError {
    statusCode: number;
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export interface RequestConfig<T> {
    method: HTTPMethod;
    url: string;
    data?: T;
    params?: Record<string, string>;
    headers?: Record<string, string>;
}
