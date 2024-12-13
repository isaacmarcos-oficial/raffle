"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {

    const initials = session.user.name
      ?.split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("");

    return (
      <div className="flex gap-2 items-center">
        <Avatar className="bg-green-500 h-7 w-7">
          <AvatarImage src={session.user.image || ""} />
          <AvatarFallback className="bg-primary text-xs font-bold">{initials}</AvatarFallback>
        </Avatar>

        <Button size="icon" className="h-7 w-7 rounded-full" onClick={() => signOut()}>
          <LogOut className=" h-4 w-4" />
        </Button>
      </div>
    );
  }
  return (
    <>
      <Link href="/login">
        <Button size="icon" className="h-7 w-7 rounded-full">
          <LogIn className=" h-4 w-4" />
        </Button>
      </Link>
    </>
  );
}