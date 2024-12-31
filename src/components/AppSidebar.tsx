'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, List, User } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import Logo from './logo'
import { useSession } from 'next-auth/react'

export function AppSidebar() {
  const pathname = usePathname()

  const { data: session } = useSession();

  if (!session) {
    return null
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2 px-4 py-2">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem key="dashboard">
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
              <Link href="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="create">
            <SidebarMenuButton asChild isActive={pathname === '/dashboard/create'}>
              <Link href="/dashboard/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Criar Sorteio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="sorteios">
            <SidebarMenuButton asChild isActive={pathname === '/sorteios'}>
              <Link href="/sorteios">
                <List className="h-4 w-4 mr-2" />
                <span>Ver Sorteios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="profile">
            <SidebarMenuButton asChild isActive={pathname === '/update-profile'}>
              <Link href="/dashboard/profile">
                <User className="h-4 w-4 mr-2" />
                <span>Atualizar Perfil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-gray-500 px-4 py-2">
          © 2023 RaffleHub. Todos os direitos reservados.
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}