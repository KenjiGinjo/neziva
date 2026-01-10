import { Book, HelpCircle, MessageCircle, Search, Video } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface HelpArticle {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
}

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'How to create your first workflow',
    description: 'Learn how to create and configure your first AI workflow using our visual editor.',
    category: 'Getting Started',
    tags: ['workflow', 'tutorial', 'beginner'],
  },
  {
    id: '2',
    title: 'Understanding workflow nodes',
    description: 'A comprehensive guide to different node types and how to use them in your workflows.',
    category: 'Workflows',
    tags: ['nodes', 'workflow', 'guide'],
  },
  {
    id: '3',
    title: 'Troubleshooting execution errors',
    description: 'Common execution errors and how to resolve them.',
    category: 'Troubleshooting',
    tags: ['errors', 'troubleshooting', 'execution'],
  },
  {
    id: '4',
    title: 'API authentication guide',
    description: 'Learn how to authenticate and use the AI Workflow Builder API.',
    category: 'API',
    tags: ['api', 'authentication', 'integration'],
  },
  {
    id: '5',
    title: 'Managing subscriptions and billing',
    description: 'Everything you need to know about managing your subscription and billing.',
    category: 'Billing',
    tags: ['billing', 'subscription', 'payment'],
  },
  {
    id: '6',
    title: 'Best practices for workflow design',
    description: 'Tips and best practices for designing efficient and maintainable workflows.',
    category: 'Best Practices',
    tags: ['workflow', 'design', 'best-practices'],
  },
]

const categories = ['All', 'Getting Started', 'Workflows', 'Troubleshooting', 'API', 'Billing', 'Best Practices']

export function PageHelp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [debouncedSearch] = useDebounce(searchQuery, 300)

  const filteredArticles = helpArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSearch = !debouncedSearch
      || article.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      || article.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      || article.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Help Center</h1>
            <p className="text-muted-foreground">
              Find answers to common questions and learn how to use AI Workflow Builder
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <Book className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">Documentation</CardTitle>
                <CardDescription>Browse our comprehensive documentation</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <Video className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">Video Tutorials</CardTitle>
                <CardDescription>Watch step-by-step video guides</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">Community Forum</CardTitle>
                <CardDescription>Get help from the community</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <HelpCircle className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-lg">Contact Support</CardTitle>
                <CardDescription>Reach out to our support team</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h2>
            {filteredArticles.length === 0
              ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No articles found. Try adjusting your search or filters.</p>
                    </CardContent>
                  </Card>
                )
              : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredArticles.map(article => (
                      <Card key={article.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-lg">{article.title}</CardTitle>
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              {article.category}
                            </span>
                          </div>
                          <CardDescription>{article.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
