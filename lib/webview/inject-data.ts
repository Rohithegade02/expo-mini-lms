import { Course } from '@/types/course';

/**
 * Prepares the JavaScript to be injected into the WebView to initialize data
 */
export const getInitialDataScript = (course: Course): string => {
    return `
        (function() {
            if (window.updateContent) {
                window.updateContent(${JSON.stringify(course)});
            } else {
                console.warn('updateContent not found on window');
            }
        })();
        true;
    `;
};
