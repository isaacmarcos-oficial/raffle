'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, List, User, ListCollapse, LifeBuoy, Ticket } from 'lucide-react'
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

const menuItems = [
  { key: 'home', href: '/', icon: Home, label: 'Início', requiresSession: false },
  { key: 'minhas-campanhas', href: '/dashboard/minhas-campanhas', icon: Ticket, label: 'Minhas Campanhas', requiresSession: true },
  { key: 'campanhas', href: '/campanhas', icon: List, label: 'Buscar Campanhas', requiresSession: false },
  { key: 'meus-bilhetes', href: '/meus-bilhetes', icon: ListCollapse, label: 'Meus títulos', requiresSession: false },
  { key: 'profile', href: '/dashboard/profile', icon: User, label: 'Atualizar Perfil', requiresSession: true },
  { key: 'contato', href: '#', icon: LifeBuoy, label: 'Fale conosco', requiresSession: false },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession();

  // Filtra os itens de menu de acordo com a sessão
  const filteredMenuItems = menuItems.filter(
    (item) => !item.requiresSession || (item.requiresSession && session)
  )

  return (
    <Sidebar>
    <SidebarHeader>
      <Link href="/" className="flex items-center space-x-2 px-4 py-2">
        <Logo />
      </Link>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        {filteredMenuItems.map(({ key, href, icon: Icon, label }) => (
          <SidebarMenuItem key={key}>
            <SidebarMenuButton asChild isActive={pathname === href}>
              <Link href={href}>
                <Icon className="h-4 w-4 mr-2" />
                <span>{label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
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