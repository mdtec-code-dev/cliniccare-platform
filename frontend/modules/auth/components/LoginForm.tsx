'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Package,
  ArrowRight,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  username: string;
  password: string;
  loading: boolean;
  error?: string;

  onUsernameChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onTogglePassword: () => void;
  showPassword: boolean;

  onSubmit: () => void;
}

export function LoginForm({
  username,
  password,
  loading,
  error,
  showPassword,
  onUsernameChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <motion.div initial="hidden" animate="visible" className="w-full max-w-md">
      <Card className="border-0 shadow-2xl shadow-primary/10 bg-card/80 backdrop-blur-xl">
        <CardHeader className="space-y-4 pb-6">
          <motion.div className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-balance">
              Bienvenido de nuevo
            </CardTitle>
            <CardDescription className="text-muted-foreground text-pretty">
              Inicie sesión para continuar
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-5"
          >
            {/* Username */}
            <motion.div>
              <Label
                htmlFor="username"
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  focusedField === 'username' && 'text-primary'
                )}
              >
                Usuario
              </Label>

              <div className="relative">
                <User
                  className={cn(
                    'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200',
                    focusedField === 'username'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                />
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={e => onUsernameChange(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className="pl-10 h-12 bg-secondary/50 border-border/50 focus:bg-background transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div className="space-y-2">
              <Label
                htmlFor="password"
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  focusedField === 'password' && 'text-primary'
                )}
              >
                Contraseña
              </Label>

              <div className="relative">
                <Lock
                  className={cn(
                    'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200',
                    focusedField === 'password'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                />
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => onPasswordChange(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="pl-10 pr-10 h-12 bg-secondary/50 border-border/50 focus:bg-background transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div>
              <Button
                type="submit"
                className="w-full h-12 bg-black text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:bg-purple-700 transition-all duration-300 group"
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Iniciando sesión...</span>
                  </motion.div>
                ) : (
                  <span className="flex items-center gap-2">
                    Entrar{' '}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
