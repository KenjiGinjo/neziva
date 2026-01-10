import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  text: string
  level: number
}

interface DocsTocProps {
  content?: string
  className?: string
}

export function DocsToc({ content, className }: DocsTocProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!content) {
      setTocItems([])
      return
    }

    // Extract headings from markdown content
    // Split by lines and process each line to avoid regex backtracking issues
    // This approach is safer than using global regex with exec/matchAll
    const lines = content.split('\n')
    const items: TocItem[] = []

    for (const line of lines) {
      // Match heading pattern: # followed by space, then heading text
      // Use \S to ensure heading text starts with non-whitespace, avoiding backtracking
      // Pattern: ^(#{1,6})\s+(\S.*)$ ensures no overlap between \s+ and \S.*
      const match = line.match(/^(#{1,6})\s+(\S.*)$/)
      if (match) {
        const level = match[1].length
        const text = match[2].trim()
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
        items.push({ id, text, level })
      }
    }

    setTocItems(items)
  }, [content])

  useEffect(() => {
    if (tocItems.length === 0)
      return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' },
    )

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={cn('w-64 border-l bg-muted/30', className)}>
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold">Table of Contents</h3>
      </div>
      <div className="h-[calc(100vh-8rem)] overflow-y-auto">
        <nav className="p-4 space-y-1">
          {tocItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={cn(
                'block w-full text-left px-2 py-1.5 rounded text-sm transition-colors',
                item.level === 1 && 'font-medium',
                item.level === 2 && 'ml-2',
                item.level === 3 && 'ml-4',
                item.level === 4 && 'ml-6',
                activeId === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent',
              )}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
