'use client'

import {
  Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import SignUp from './_components/signUp'
import SignIn from './_components/signIn'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch {
      toast.error("Não foi possível fazer login com o Google.");
    }
  };

  return (
    <div className="flex mx-auto my-auto justify-center items-center h-[100vh]">
      <Card className="flex flex-col mx-auto w-full max-w-xl">
        {isSignUp ? (
          <SignUp onToggle={() => setIsSignUp(false)} />
        ) : (
          <SignIn onToggle={() => setIsSignUp(true)} />
        )}

        <Button
          className="p-6 bg-red-600 text-white hover:bg-red-700"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Entrar com Google
        </Button>
      </Card>

    </div>
  )
}