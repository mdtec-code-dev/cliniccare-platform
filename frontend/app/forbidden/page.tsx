import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-background to-amber-50">
      <div className="w-full max-w-md rounded-2xl border bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/10 p-8 text-center space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive text-destructive-foreground shadow-lg shadow-destructive/30">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Acceso denegado</h1>
          <p className="text-muted-foreground text-sm">
            No tienes permisos para acceder a esta sección. Si crees que es un
            error, contacta al administrador.
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
