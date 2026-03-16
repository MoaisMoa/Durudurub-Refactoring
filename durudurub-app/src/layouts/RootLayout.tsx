import { Outlet } from 'react-router';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from 'sonner';

export function RootLayout() {
  return (
    <AppProvider>
      <Toaster position="top-center" richColors />
      <Outlet />
    </AppProvider>
  );
}
