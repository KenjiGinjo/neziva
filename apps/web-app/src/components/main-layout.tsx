import { FooterMarketing } from '@/components/footer/marketing'
import { HeaderMarketing } from '@/components/header/marketing'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <HeaderMarketing />
      {children}
      <FooterMarketing />
    </div>
  )
}
