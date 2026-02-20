import { User } from "@/types/auth";
import { Ionicons } from '@expo/vector-icons';

export interface MenuItem {
    id: string;
    label: string;
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    isDestructive?: boolean;
}

export interface ProfilePresentationProps {
    user: User | null;
    onLogout: () => void;
    onUpdateAvatar: () => void;
    isLoading: boolean;
    testID?: string;
    accessibilityLabel?: string;
}


export interface ProfileFooterProps {
    version: string;
    testID?: string;
    accessibilityLabel?: string;
}

export interface ProfileHeaderProps {
    user: User;
    onUpdateAvatar: () => void;
    testID?: string;
    accessibilityLabel?: string;
}

export interface ProfileMenuItemProps {
    item: MenuItem;
    isLast: boolean;
    isFirst?: boolean;
    testID?: string;
    accessibilityLabel?: string;
}