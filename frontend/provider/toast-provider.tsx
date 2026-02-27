'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3500}
      expand={false}
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast:
            'rounded-2xl border border-border bg-background text-foreground shadow-xl px-4 py-3',
          title: 'text-sm font-semibold',
          description: 'text-xs text-muted-foreground mt-1',
          actionButton:
            'bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-3 py-1 text-xs font-medium',
          cancelButton:
            'bg-muted text-muted-foreground hover:bg-muted/80 rounded-xl px-3 py-1 text-xs font-medium',
        },
      }}
    />
  );
}
