import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordInput";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SignInProps {
  onToggle: () => void;
  handleGoogleSignIn: () => void;
}

export default function SignIn({ onToggle, handleGoogleSignIn }: SignInProps) {

  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const result = await signIn('credentials', {
        emailOrPhone: data.emailOrPhone,
        password: data.password,
        redirect: false,
      });

      console.log(result);

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
        <CardDescription className="">
          Insira suas informações abaixo ou acesse com o Google para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone">Email ou Telefone</Label>
              <Input
                id="emailOrPhone"
                placeholder="Digite seu e-mail ou telefone"
                required
                type="text"
                {...form.register('emailOrPhone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <PasswordInput
                id="password"
                placeholder="********"
                required
                type="password"
                {...form.register('password')}
              />
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 font-bold"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="h-4 w-4 mr-2" />
              Entrar com Google
            </Button>

          </div>
        </form>
      </CardContent>
      <CardFooter className=" flex flex-col text-muted-foreground text-center w-ful">
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