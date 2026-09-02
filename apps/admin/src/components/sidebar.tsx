import { observer } from '@legendapp/state/react'
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  ScrollText,
} from 'lucide-react'
import { Link, useLocation } from 'wouter'
import { signout } from '@/components/auth/signin'
import { Request } from '@/components/request'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { $qc } from '@/query-client'
import { stateUser } from '@/states'

const navMain = [
  { title: '总览', url: '/', icon: LayoutDashboard },
  { title: '咨询', url: '/contacts', icon: Mail },
  { title: '博客', url: '/blog', icon: FileText },
  { title: '订阅', url: '/newsletter', icon: Newspaper },
  { title: '日志', url: '/logs', icon: ScrollText },
]

function isActive(url: string, location: string) {
  if (url === '/')
    return location === '/'
  return location === url || location.startsWith(`${url}/`)
}

export const AppSidebar = observer(function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [location] = useLocation()
  const user = stateUser.getData()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex flex-col px-2 py-3">
          <span className="text-sm font-semibold tracking-tight">Neziva</span>
          <span className="text-xs text-muted-foreground">管理后台</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url, location)}>
                      <Link href={item.url}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 px-2 pb-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{user?.nickname || '管理员'}</div>
            <div className="truncate text-xs text-muted-foreground">{user?.id ? '已登录' : ''}</div>
          </div>
          <Request
            request={async () => {
              try {
                await $qc.admin.auth.logout.$post.mutation()
              }
              finally {
                signout()
                window.location.href = '/login'
              }
            }}
          >
            <button type="button" className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground" title="退出登录">
              <LogOut className="size-4" />
            </button>
          </Request>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
})
