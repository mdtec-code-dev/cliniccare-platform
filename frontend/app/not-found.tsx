import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TriangleAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-background to-amber-50">
      <div className="w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/10 p-8 text-center space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <TriangleAlert className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">404</h1>
          <p className="text-muted-foreground text-sm">
            La página que buscas no existe o no está disponible.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/dashboard">Volver al Dashboard</Link>
          </Button>

          <Button asChild variant="ghost" className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
