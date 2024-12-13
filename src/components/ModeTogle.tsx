"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex">
      {theme === "dark" ? (
        <Button variant="outline" className="bg-green-600 border-0 rounded-full h-7 w-7" size="icon" onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="outline" className="bg-green-600 border-0 rounded-full h-7 w-7" size="icon" onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
