import { RegisterData } from "@/schema";
import { Control } from "react-hook-form";

export interface RegisterPresentationProps {
    control?: Control<RegisterData>;
    onSubmit: () => void;
    isLoading: boolean;
    onLoginPress: () => void;
    testID?: string;
    accessibilityLabel?: string;
    orientation?: string;
}