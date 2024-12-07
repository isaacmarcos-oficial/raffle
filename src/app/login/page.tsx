'use client'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

export default function Auth() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, 
      });

      if (result?.error) {
        toast.error("Erro ao tentar fazer login.");
      } else {
        toast.success('Login realizado com sucesso!');
        window.location.href = '/';
      }
    } catch {
      toast.error("Ocorreu um erro. Por favor, tente novamente.");
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch {
      toast.error("Não foi possível fazer login com o Google.");
    }
  };

  return (
    <div className="flex mx-auto my-auto justify-center items-center h-[100vh]">
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Entre com suas credenciais ou faça login com Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                {...form.register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="********"
                required
                type="password"
                {...form.register('password')}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
            <Button
              className="w-full bg-red-600 text-white hover:bg-red-700"
              type="button"
              onClick={handleGoogleSignIn}
            >
              Entrar com Google
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}