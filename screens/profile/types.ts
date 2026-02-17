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
}
