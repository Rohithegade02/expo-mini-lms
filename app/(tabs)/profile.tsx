import { ThemeToggle } from '@/components/molecules';
import { ProfileScreen } from '@/screens/profile';

export default function ProfilePage() {
    return (
        <ThemeToggle>
            <ProfileScreen />
        </ThemeToggle>
    );
}
