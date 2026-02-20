import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { getInitialDataScript } from '@/lib/webview/inject-data';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { CourseContentPresentationProps } from './types';

export const CourseContentPresentation: React.FC<CourseContentPresentationProps> = ({
    course,
    htmlUri,
    isDark,
    onBackPress,
    onMessage,
}) => {
    const webViewRef = useRef<WebView>(null);
    const [isWebViewReady, setIsWebViewReady] = useState(false);

    const injectInitialData = useCallback(() => {
        if (course && webViewRef.current) {
            const script = getInitialDataScript(course);
            webViewRef.current.injectJavaScript(script);
        }
    }, [course]);

    if (!course || !htmlUri) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
                <ActivityIndicator size="large" color={theme.light.colors.primary[600]} />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="flex-row items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <Pressable onPress={onBackPress} className="mr-4">
                    <Icon name="chevron-back" size={24} color={isDark ? "white" : "black"} />
                </Pressable>
                <Text variant="h3" className="flex-1 text-gray-900 dark:text-white" numberOfLines={1}>
                    {course.title}
                </Text>
            </View>

            <View className="flex-1">
                <WebView
                    ref={webViewRef}
                    source={{ uri: htmlUri }}
                    onLoadEnd={() => {
                        setIsWebViewReady(true);
                        injectInitialData();
                    }}
                    onMessage={onMessage}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    allowingReadAccessToURL={htmlUri}
                    allowFileAccess={true}
                    className="flex-1"
                />
                {!isWebViewReady && (
                    <View className="absolute inset-0 justify-center items-center bg-white dark:bg-gray-900">
                        <ActivityIndicator size="large" color={theme.light.colors.primary[600]} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
