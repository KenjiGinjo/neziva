import { Link, useLocation } from 'wouter'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function HeaderMainPage() {
  const [location, setLocation] = useLocation()

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '/docs' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary">
              <span className="text-sm font-bold text-white">W</span>
            </div>
            <span className="text-xl font-bold">WorkflowAI</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location === item.href ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side: Theme toggle and Auth buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => setLocation('/auth/login')}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setLocation('/auth/signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
