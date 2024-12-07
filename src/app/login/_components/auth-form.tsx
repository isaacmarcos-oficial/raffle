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
// import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export default function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data)
    // try {
    //   await signIn('nodemailer', { email: data.email, redirect: false })
    //   toast({
    //     title: 'Magic Link Sent',
    //     description: 'Check your email for the magic link to login',
    //   })
    // } catch (error) {
    //   toast({
    //     title: 'Error',
    //     description: 'An error ocurred. Please try again',
    //   })
    // }
  })

  return (
    <div className="flex mx-auto my-auto justify-center items-center h-[100vh]">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Entre com seu email abaixo para acessar sua conta
          
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
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Sending' : 'Send Magic Link'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}