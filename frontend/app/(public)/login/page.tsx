import { AnimatedBackground } from '@/components/Shared/animated-background';
import { LoginView } from '@/modules/auth/views/LoginView';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
      <AnimatedBackground />

      <LoginView />
    </main>
  );
}
