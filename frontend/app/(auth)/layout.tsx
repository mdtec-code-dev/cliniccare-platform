/**
 * Layout para rutas de autenticacion (/login, /register, etc.).
 * Centra el contenido vertical y horizontalmente.
 * No incluye sidebar ni navigation.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {children}
    </div>
  );
}
