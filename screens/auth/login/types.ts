import { LoginData } from "@/schema";
import { Control } from "react-hook-form";

export interface LoginPresentationProps {
    control?: Control<LoginData>;
    onSubmit: () => void;
    isLoading: boolean;
    onRegisterPress: () => void;
    testID?: string;
    accessibilityLabel?: string;
    orientation?: string;
}