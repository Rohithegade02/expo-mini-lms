import { Icon, Text } from '@/components/atoms';
import { getInitialDataScript } from '@/lib/webview/inject-data';
import { useCourseStore } from '@/stores/course-store';
import { Asset } from 'expo-asset';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function CourseContentViewer() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { courses } = useCourseStore();
    const webViewRef = useRef<WebView>(null);
    const [isWebViewReady, setIsWebViewReady] = useState(false);
    const [htmlUri, setHtmlUri] = useState<string | null>(null);

    const course = courses.find((c) => c.id === id);

    useEffect(() => {
        const loadAsset = async () => {
            const asset = Asset.fromModule(require('@/assets/webview/course-template.html'));
            await asset.downloadAsync();
            setHtmlUri(asset.localUri);
        };
        loadAsset();
    }, []);

    const onMessage = useCallback((event: any) => {
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
            webViewRef.current.postMessage(script);
        }
    }, [course]);

    if (!course || !htmlUri) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563eb" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
                <Pressable onPress={() => router.back()} className="mr-4">
                    <Icon name="chevron-back" size={24} color="#1f2937" />
                </Pressable>
                <Text variant="h3" className="flex-1 text-gray-900" numberOfLines={1}>
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
                    style={{ flex: 1 }}
                />
                {!isWebViewReady && (
                    <View className="absolute inset-0 justify-center items-center bg-white">
                        <ActivityIndicator size="large" color="#2563eb" />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}
