export interface CourseThumbnailProps {
    thumbnail: string;
    category: string;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
}
