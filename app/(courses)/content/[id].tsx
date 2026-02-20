import { Icon, Text } from '@/components/atoms';
import { theme } from '@/constants/theme';
import { useCourses } from '@/hooks/use-courses';
import { useTheme } from '@/hooks/use-theme';
import { getInitialDataScript } from '@/lib/webview/inject-data';
import { Asset } from 'expo-asset';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export default function CourseContentPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { courses, updateProgress } = useCourses();
    const webViewRef = useRef<WebView>(null);
    const [isWebViewReady, setIsWebViewReady] = useState(false);
    const [htmlUri, setHtmlUri] = useState<string | null>(null);
    const { isDark } = useTheme()

    const course = courses.find((c) => c.id === id);

    useEffect(() => {
        const loadAsset = async () => {
            const asset = Asset.fromModule(require('@/assets/webview/course-template.html'));
            await asset.downloadAsync();
            setHtmlUri(asset.localUri);
        };
        loadAsset();
    }, []);

    const onMessage = useCallback((event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'LESSON_CLICK') {
                Alert.alert('Lesson Started', `You clicked on lesson ${data.lessonId}`);
            }
        } catch (error) {
            console.error('Error parsing WebView message:', error);
        }
    }, []);

    const injectInitialData = useCallback(() => {
        if (course && webViewRef.current) {
            const script = getInitialDataScript(course);
            webViewRef.current.injectJavaScript(script);
        }
    }, [course]);

    if (!course || !htmlUri) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color={theme.light.colors.primary[600]} />
            </View>
        );
    }

    const handleBackPress = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="flex-row items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <Pressable onPress={handleBackPress} className="mr-4">
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
                    className='flex-1'
                />
                {!isWebViewReady && (
                    <View className="absolute inset-0 justify-center items-center bg-white dark:bg-gray-900">
                        <ActivityIndicator size="large" color={theme.light.colors.primary[600]} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
