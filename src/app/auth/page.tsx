'use client'

import {
  Card,
} from '@/components/ui/card'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
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
    <div className="flex mx-auto my-auto justify-center items-center h-screen w-full">
      <Card className="flex flex-col mx-auto w-full max-w-md ">
        {isSignUp ? (
          <SignUp
            onToggle={() => setIsSignUp(false)}
            handleGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          <SignIn
            onToggle={() => setIsSignUp(true)}
            handleGoogleSignIn={handleGoogleSignIn}  
          />
        )}
      </Card>

    </div>
  )
}