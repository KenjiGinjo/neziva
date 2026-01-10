import { Bell, Key, Settings, Shield, User } from 'lucide-react'
import { Link, useLocation } from 'wouter'
import { cn } from '@/lib/utils'

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const sidebarItems: SidebarItem[] = [
  { id: 'profile', label: 'Profile', icon: User, href: '/settings/profile' },
  { id: 'security', label: 'Security', icon: Shield, href: '/settings/security' },
  { id: 'api-keys', label: 'API Keys', icon: Key, href: '/settings/api-keys' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/settings/notifications' },
]

interface SettingsSidebarProps {
  className?: string
}

export function SettingsSidebar({ className }: SettingsSidebarProps) {
  const [location] = useLocation()

  return (
    <div className={cn('w-64 border-r bg-muted/30', className)}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = location === item.href || location.startsWith(item.href)
            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
