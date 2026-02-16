import { TouchableOpacityProps } from 'react-native';

export interface BookmarkButtonProps extends TouchableOpacityProps {
    isBookmarked: boolean;
    onToggle: () => void;
    size?: number;
}
