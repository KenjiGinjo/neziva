import type { EnumWorkflowStatus } from '@haole/enums'

import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { get } from 'radash'
import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useLocation } from 'wouter'
import { Empty } from '@/components/empty'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryPageList } from '@/components/query-page-list'
import { TemplateCard } from '@/components/template/template-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LIST_CACHE } from '@/lib/query-cache-config'
import { $qc } from '@/query-client'

interface TemplateItem {
  id: string
  name: string
  description?: string | null
  status: EnumWorkflowStatus
  executionCount: number
  successCount: number
  errorCount: number
  category?: string
  tags?: string[]
}

const categories = ['All', 'Content Creation', 'Data Analysis', 'Code Documentation', 'Automation', 'AI/ML']

export function PageTemplates() {
  const [, setLocation] = useLocation()
  const queryClient = useQueryClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const [debouncedSearch] = useDebounce(searchQuery, 300)

  const queryArgs = useMemo(() => {
    const query: Record<string, string> = {}
    if (debouncedSearch) {
      query.search = debouncedSearch
    }
    // Note: Category filtering would need API support
    return { query }
  }, [debouncedSearch])

  const handleUseTemplate = (templateId: string) => {
    return async () => {
      // Duplicate the template as a new workflow
      const duplicateRoute = $qc.workflows[':id'].duplicate.$post as any
      const res = await duplicateRoute.mutation({ params: { id: templateId } })
      const newWorkflowId = get(res, 'body.data.id', undefined)
      if (newWorkflowId) {
        // Navigate to the new workflow's edit page
        setLocation(`/workflow/${newWorkflowId}/edit`)
        // Invalidate workflows query
        await queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey
            return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes('workflows')
          },
        })
      }
    }
  }

  const handlePreviewTemplate = (templateId: string) => {
    return () => {
      // Open template in a modal or navigate to detail page
      setLocation(`/workflow/${templateId}`)
    }
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Template Market</h1>
            <p className="text-muted-foreground">
              Browse and use pre-built workflow templates to get started quickly
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>

          {/* Template List */}
          <QueryPageList
            queryRoute={$qc.workflows.$get}
            queryArgs={queryArgs}
            queryOptions={LIST_CACHE}
            renderWrapper={
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" />
            }
            renderItem={({ data }) => {
              const template = data as TemplateItem
              // Client-side category filtering
              if (selectedCategory !== 'All' && template.category !== selectedCategory) {
                return null
              }
              return (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  description={template.description}
                  status={template.status}
                  executionCount={template.executionCount}
                  successCount={template.successCount}
                  category={template.category}
                  tags={template.tags}
                  onUse={handleUseTemplate(template.id)}
                  onPreview={handlePreviewTemplate(template.id)}
                />
              )
            }}
            renderEmpty={
              <Empty.Icon message="No templates found. Try adjusting your search or filters." />
            }
            removeOnUnload={true}
          />
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
