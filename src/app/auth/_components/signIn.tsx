import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SignInProps {
  onToggle: () => void;
}

export default function SignIn({ onToggle }: SignInProps) {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await signIn('credentials', {
        emailOrPhone: data.emailOrPhone,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Erro ao tentar fazer login.");
      } else {
        toast.success('Login realizado com sucesso!');
        window.location.href = '/dashboard';
      }
    } catch {
      toast.error("Ocorreu um erro. Por favor, tente novamente.");
    }
  });

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Entre com a sua conta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone">Email ou Telefone</Label>
              <Input
                id="emailOrPhone"
                placeholder="m@example.com"
                required
                type="text"
                {...form.register('emailOrPhone')}
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

          </div>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-sm text-center">
          Não tem uma conta?{" "}
          <button
            className="text-green-500 font-bold hover:underline"
            onClick={onToggle}
          >
            Cadastre-se aqui.
          </button>
        </p>
      </CardFooter>
    </>
  )
}