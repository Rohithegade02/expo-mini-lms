import { useCourses } from '@/hooks/use-courses';
import { useTheme } from '@/hooks/use-theme';
import { Asset } from 'expo-asset';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview';
import { CourseContentPresentation } from './CourseContentPresentation';

const CourseContentContainer: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { courses } = useCourses();
    const { isDark } = useTheme();

    const [htmlUri, setHtmlUri] = useState<string | null>(null);

    const course = courses.find((c) => c.id === id);

    useEffect(() => {
        const loadAsset = async () => {
            try {
                const asset = Asset.fromModule(require('@/assets/webview/course-template.html'));
                await asset.downloadAsync();
                setHtmlUri(asset.localUri);
            } catch (error) {
                console.error("Error loading WebView asset:", error);
            }
        };
        loadAsset();
    }, []);

    const handleBackPress = useCallback(() => {
        router.back();
    }, [router]);

    const handleMessage = useCallback((event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'LESSON_CLICK') {
                Alert.alert('Lesson Started', `You clicked on lesson ${data.lessonId}`);
            }
        } catch (error) {
            console.error('Error parsing WebView message:', error);
        }
    }, []);

    return (
        <CourseContentPresentation
            course={course}
            htmlUri={htmlUri}
            isDark={isDark}
            onBackPress={handleBackPress}
            onMessage={handleMessage}
        />
    );
};

export default CourseContentContainer;
