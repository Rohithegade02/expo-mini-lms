import { Course } from '@/types/course';
import { WebViewMessageEvent } from 'react-native-webview';

export interface CourseContentPresentationProps {
    course: Course | undefined;
    htmlUri: string | null;
    isDark: boolean;
    onBackPress: () => void;
    onMessage: (event: WebViewMessageEvent) => void;
}
