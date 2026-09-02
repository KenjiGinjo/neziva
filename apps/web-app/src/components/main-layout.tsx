import { ChatFloating } from '@/components/chat-floating'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      {children}
      <Footer />
      <ChatFloating />
    </div>
  )
}
