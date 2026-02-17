import { Course } from '@/types/course';

/**
 * Prepares the JavaScript to be injected into the WebView to initialize data
 */
export const getInitialDataScript = (course: Course): string => {
    const data = {
        type: 'INITIAL_DATA',
        course: {
            title: course.title,
            category: course.category,
            description: course.description,
            thumbnail: course.thumbnail,
        },
    };

    return `
        window.postMessage(JSON.stringify(${JSON.stringify(data)}), '*');
        true; // Required for Android
    `;
};
