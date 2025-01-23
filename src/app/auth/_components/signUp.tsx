"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("Digite um e-mail válido."),
    phone: z.string().nonempty("O telefone é obrigatório."),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

interface SignUpProps {
  onToggle: () => void;
  handleGoogleSignIn: () => void
}

export default function Signup({ onToggle, handleGoogleSignIn }: SignUpProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  function normalizePhone(phone: string): string {
    // Remove todos os caracteres que não são dígitos
    const digitsOnly = phone.replace(/\D/g, "");

    // Valida se o número tem 13 dígitos (formato +55 seguido por 11 dígitos)
    if (digitsOnly.length === 13 && digitsOnly.startsWith("55")) {
      return digitsOnly;
    }

    throw new Error("Número de telefone inválido. Certifique-se de usar o formato +55XXXXXXXXXXX.");
  }


  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const normalizedPhone = normalizePhone(data.phone);

      const payload = {
        ...data,
        phone: normalizedPhone, // Substitui o número normalizado
      };

      const response = await fetch("/api/campaign/owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Usuário registrado com sucesso!");
        // redirect("/auth");
        window.location.href = "/auth"; // Redireciona para o login
      } else {
        const error = await response.json();
        toast.error(error.error || "Erro ao registrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      toast.error("Erro ao registrar usuário.");
    }
  };

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold">
          Crie sua conta
        </CardTitle>
        <CardDescription className="">
          Crie a sua campanha e configure do seu jeito com muita facilidade!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" {...register("name")} placeholder="Digite seu nome e sobrenome" className="capitalize" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="lowercase">Endereço de E-mail</Label>
              <Input id="email" {...register("email")} type="email" placeholder="Digite seu melhor e-mail" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <PhoneInput
                id="phone"
                placeholder="Seu telefone"
                defaultCountry="BR"
                onChange={(value) => setValue("phone", value)}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <PasswordInput
                  id="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Repita sua Senha</Label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Repita sua senha"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}

              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-700 font-bold"
              disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 font-bold"
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
          Já tem uma conta?{" "}
          <button
            className="text-green-500 font-bold hover:underline"
            onClick={onToggle}
          >
            Faça login aqui.
          </button>
        </p>
      </CardFooter>
    </>
  );
}
