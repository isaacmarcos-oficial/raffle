"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";

interface SignUpProps {
  onToggle: () => void;
}

interface SignUpFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function Signup({ onToggle }: SignUpProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch("/api/campaign/owner", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || ""
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Usuário registrado com sucesso!");
        window.location.href = "/login"; // Redireciona para o login
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
        <CardTitle className="text-2xl font-bold text-center">
          Crie sua conta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} required placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" {...register("email")} required type="email" placeholder="Seu e-mail" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <PhoneInput
                id="phone"
                placeholder="Seu telefone"
                defaultCountry="BR"
                onChange={(value) => setValue("phone", value)} // Conecta manualmente ao `react-hook-form`
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" {...register("password")} required type="password" placeholder="Sua senha" />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="text-center">
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
