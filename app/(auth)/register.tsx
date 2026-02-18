import { ThemeToggle } from "@/components/molecules";
import { RegisterScreen } from "@/screens/auth/register";

export default function RegisterPage() {
    return (
        <ThemeToggle>
            <RegisterScreen />
        </ThemeToggle>
    );
}
