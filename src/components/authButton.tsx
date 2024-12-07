"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-2 items-center">
        
        <p className="text-sm font-medium">
        | {session?.user?.name}</p>
        
        <Button size="icon" className="h-8 w-8" onClick={() => signOut()}>
          <LogOut className=" h-4 w-4" />
        </Button>
      </div>
    );
  }
  return (
    <>
      <Link href="/login">
        <Button size="icon" className="h-8 w-8">
          <LogIn className=" h-4 w-4" />
        </Button>
      </Link>
    </>
  );
}