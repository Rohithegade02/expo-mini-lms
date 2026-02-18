import { ThemeToggle } from "@/components/molecules";
import { LoginScreen } from "@/screens/auth/login";

export default function LoginPage() {
    return (
        <ThemeToggle>
            <LoginScreen />
        </ThemeToggle>
    );
}
