import { Control, FieldErrors } from "react-hook-form";

export type RegisterData = {
    username: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
};

export interface RegisterPresentationProps {
    control?: Control<RegisterData>;
    onSubmit: () => void;
    isLoading: boolean;
    errors?: FieldErrors<RegisterData>;
    onLoginPress: () => void;
}