import { Book, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface DocsNavItem {
  id: string
  label: string
  href: string
  children?: DocsNavItem[]
}

const docsNavItems: DocsNavItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    href: '/docs/getting-started',
    children: [
      { id: 'introduction', label: 'Introduction', href: '/docs/getting-started/introduction' },
      { id: 'quick-start', label: 'Quick Start', href: '/docs/getting-started/quick-start' },
      { id: 'installation', label: 'Installation', href: '/docs/getting-started/installation' },
    ],
  },
  {
    id: 'workflows',
    label: 'Workflows',
    href: '/docs/workflows',
    children: [
      { id: 'create-workflow', label: 'Creating Workflows', href: '/docs/workflows/create' },
      { id: 'edit-workflow', label: 'Editing Workflows', href: '/docs/workflows/edit' },
      { id: 'run-workflow', label: 'Running Workflows', href: '/docs/workflows/run' },
    ],
  },
  {
    id: 'nodes',
    label: 'Nodes',
    href: '/docs/nodes',
    children: [
      { id: 'node-types', label: 'Node Types', href: '/docs/nodes/types' },
      { id: 'node-config', label: 'Node Configuration', href: '/docs/nodes/config' },
    ],
  },
  {
    id: 'api',
    label: 'API Reference',
    href: '/docs/api',
    children: [
      { id: 'authentication', label: 'Authentication', href: '/docs/api/auth' },
      { id: 'workflows-api', label: 'Workflows API', href: '/docs/api/workflows' },
      { id: 'executions-api', label: 'Executions API', href: '/docs/api/executions' },
    ],
  },
]

interface DocsSidebarProps {
  className?: string
  onSearch?: (query: string) => void
}

export function DocsSidebar({ className, onSearch }: DocsSidebarProps) {
  const [location] = useLocation()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <div className={cn('w-64 border-r bg-muted/30 flex flex-col', className)}>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Documentation</h2>
        </div>
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {docsNavItems.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href)
            return (
              <div key={item.id}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isChildActive = location === child.href
                      return (
                        <Link key={child.id} href={child.href}>
                          <div
                            className={cn(
                              'px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-sm',
                              isChildActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'hover:bg-accent text-muted-foreground hover:text-foreground',
                            )}
                          >
                            {child.label}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
