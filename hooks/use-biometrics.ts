import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useRef, useState } from 'react';

export type BiometricType = 'FaceID' | 'TouchID' | 'Iris' | 'None';

interface UseBiometricsReturn {
    isHardwareSupported: boolean;
    isEnrolled: boolean;
    biometricType: BiometricType;
    isLoading: boolean;
    isBiometricAuthenticated: boolean;
    authenticate: (reason?: string) => Promise<{ success: boolean; error?: string; warning?: string }>;
}

interface UseBiometricsOptions {
    auto?: boolean;
    reason?: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useBiometrics(options?: UseBiometricsOptions): UseBiometricsReturn {
    const [isHardwareSupported, setIsHardwareSupported] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [biometricType, setBiometricType] = useState<BiometricType>('None');
    const [isLoading, setIsLoading] = useState(true);
    const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState(false);

    const hasAttemptedAuto = useRef(false);

    useEffect(() => {
        (async () => {
            try {
                const compatible = await LocalAuthentication.hasHardwareAsync();
                setIsHardwareSupported(compatible);

                if (compatible) {
                    const enrolled = await LocalAuthentication.isEnrolledAsync();
                    setIsEnrolled(enrolled);

                    if (enrolled) {
                        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

                        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                            setBiometricType('FaceID');
                        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                            setBiometricType('TouchID');
                        } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
                            setBiometricType('Iris');
                        } else {
                            setBiometricType('None');
                        }
                    }
                }
            } catch (error) {
                console.error('Error checking biometrics:', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const authenticate = async (reason: string = options?.reason || 'Verify your identity') => {
        try {
            if (!isHardwareSupported || !isEnrolled) {
                const compatible = await LocalAuthentication.hasHardwareAsync();
                const enrolled = await LocalAuthentication.isEnrolledAsync();

                if (!compatible) return { success: false, error: 'Biometric hardware not supported' };
                if (!enrolled) return { success: false, error: 'No biometrics enrolled' };
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: reason,
                fallbackLabel: 'Use Passcode',
                cancelLabel: 'Cancel',
                disableDeviceFallback: false,
            });

            if (result.success) {
                setIsBiometricAuthenticated(true);
                options?.onSuccess?.();
                return { success: true };
            } else {
                setIsBiometricAuthenticated(false);
                options?.onError?.(result.error || 'Authentication failed');
                return { success: false, error: result.error, warning: result.warning };
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            setIsBiometricAuthenticated(false);
            options?.onError?.(msg);
            return {
                success: false,
                error: msg,
            };
        }
    };

    // Auto-trigger effect
    useEffect(() => {
        if (options?.auto && !isLoading && isHardwareSupported && isEnrolled && !hasAttemptedAuto.current) {
            hasAttemptedAuto.current = true;
            authenticate();
        }
    }, [isLoading, isHardwareSupported, isEnrolled, options?.auto]);

    return {
        isHardwareSupported,
        isEnrolled,
        biometricType,
        isLoading,
        isBiometricAuthenticated,
        authenticate,
    };
}
