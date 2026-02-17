import { ROUTES } from '@/constants/router';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  const { isAuthenticated } = useAuth();

  return <Redirect href={isAuthenticated ? ROUTES.tabs.courses : ROUTES.auth.login} />;
}