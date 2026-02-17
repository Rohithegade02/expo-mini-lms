import { PressableProps } from 'react-native';

export interface BookmarkButtonProps extends PressableProps {
    isBookmarked: boolean;
    onToggle: () => void;
    size?: number;
}
