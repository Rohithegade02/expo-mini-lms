import { ROUTES } from '@/constants/router';
import { useAuthStore } from '@/stores/auth-store';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  return <Redirect href={isAuthenticated ? ROUTES.tabs.courses : ROUTES.auth.login} />;
}