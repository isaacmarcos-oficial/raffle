import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import React from "react"

export default function TicketsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className=" mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Selecione o seus títulos</DrawerTitle>
            <DrawerDescription>Após selecionar todos os seus números, clique em comprar</DrawerDescription>
          </DrawerHeader>

          <div className="flex gap-2 px-4">
            <Badge>01</Badge>
            <Badge>13</Badge>
            <Badge>72</Badge>
          </div>

          <DrawerFooter className="w-full">
            <div className="flex w-full gap-2">
              <Button >Comprar</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}