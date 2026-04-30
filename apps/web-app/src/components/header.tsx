import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const [location] = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return location === '/'
    }
    return location.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo size="sm" withBox withText href="/" className="flex items-center" />
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-gray-700 hover:text-[#4F46E5] font-medium transition-colors',
                  isActive(item.href) && 'text-[#4F46E5] font-semibold',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block py-2 text-gray-700 hover:text-[#4F46E5] font-medium transition-colors',
                  isActive(item.href) && 'text-[#4F46E5] font-semibold',
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#F97316] hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold mt-2">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
