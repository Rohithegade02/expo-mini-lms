import { User } from "@/types/auth";

export interface ProfilePresentationProps {
    user: User | null;
    onLogout: () => void;
    onUpdateAvatar: () => void;
    isLoading: boolean;
}
