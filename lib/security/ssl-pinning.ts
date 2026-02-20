import {
    addSslPinningErrorListener,
    initializeSslPinning,
    isSslPinningAvailable,
} from 'react-native-ssl-public-key-pinning';

const SSL_PINNING_CONFIG: Parameters<typeof initializeSslPinning>[0] = {
    'api.freeapi.app': {
        includeSubdomains: false,
        publicKeyHashes: [
            'rYrua5iz5cbffh4cq2A1bk8W39HpY7SaIxXe7q4s1Dc=',
            'AlSQhgtJirc8ahLyekmtX+Iw+v46yPYRLJt9Cq1GlB0=',
        ],
    },
};

/**
 * Initializes SSL public key pinning as early as possible at app startup.
 *
 */
export async function setupSslPinning(): Promise<boolean> {
    if (!isSslPinningAvailable()) {
        if (__DEV__) {
            console.warn(
                '[SSL Pinning] Not available on this platform (likely Expo Go). ' +
                'Pinning is only enforced in development builds and production.'
            );
        }
        return false;
    }

    await initializeSslPinning(SSL_PINNING_CONFIG);

    if (__DEV__) {
        console.log('[SSL Pinning] Initialized successfully for api.freeapi.app');
    }

    return true;
}

/**
 * Sets up a global listener that fires whenever an SSL pinning failure occurs.
 * Call this once in the root layout to log or report pinning violations.
 *
 * @param onError - callback invoked with the failing server hostname
 * @returns subscription that must be removed when the component unmounts
 */
export function listenForSslPinningErrors(
    onError: (hostname: string) => void
) {
    return addSslPinningErrorListener((error) => {
        console.error(`[SSL Pinning] Certificate mismatch for host: ${error.serverHostname}`);
        onError(error.serverHostname);
    });
}
