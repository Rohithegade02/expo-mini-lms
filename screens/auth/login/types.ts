import { LoginCredentials } from "@/types/auth";
import { Control, FieldErrors } from "react-hook-form";

export interface LoginPresentationProps {
    control?: Control<LoginCredentials>;
    onSubmit: () => void;
    isLoading: boolean;
    errors?: FieldErrors<LoginCredentials>;
    onRegisterPress: () => void;
    testID?: string;
    accessibilityLabel?: string;
    orientation?: string;
}