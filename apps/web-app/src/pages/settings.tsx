import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { SettingsSidebar } from '@/components/settings/sidebar'

export function PageSettings() {
  const [, setLocation] = useLocation()

  useEffect(() => {
    // Redirect to profile settings by default
    setLocation('/settings/profile')
  }, [setLocation])

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="flex h-[calc(100vh-4rem)]">
          <SettingsSidebar className="hidden md:block" />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center text-muted-foreground">Redirecting...</div>
            </div>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
