import { EnumWorkflowStatus } from '@neziva/enums'

import { Copy, ExternalLink, Star } from 'lucide-react'
import { Link } from 'wouter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface TemplateCardProps {
  id: string
  name: string
  description?: string | null
  status: EnumWorkflowStatus
  executionCount: number
  successCount: number
  category?: string
  tags?: string[]
  onUse?: () => void
  onPreview?: () => void
}

const statusVariantMap: Record<EnumWorkflowStatus, 'default' | 'success' | 'warning' | 'destructive'> = {
  [EnumWorkflowStatus.Draft]: 'default',
  [EnumWorkflowStatus.Active]: 'success',
  [EnumWorkflowStatus.Paused]: 'warning',
  [EnumWorkflowStatus.Error]: 'destructive',
}

const statusLabelMap: Record<EnumWorkflowStatus, string> = {
  [EnumWorkflowStatus.Draft]: 'Draft',
  [EnumWorkflowStatus.Active]: 'Active',
  [EnumWorkflowStatus.Paused]: 'Paused',
  [EnumWorkflowStatus.Error]: 'Error',
}

export function TemplateCard({
  id,
  name,
  description,
  status,
  executionCount,
  successCount,
  category,
  tags,
  onUse,
  onPreview,
}: TemplateCardProps) {
  const successRate = executionCount > 0 ? ((successCount / executionCount) * 100).toFixed(1) : '0.0'

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{name}</CardTitle>
            {description && (
              <CardDescription className="line-clamp-2">{description}</CardDescription>
            )}
          </div>
          <Badge variant={statusVariantMap[status]}>{statusLabelMap[status]}</Badge>
        </div>
        {category && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">Category:</span>
            <Badge variant="outline" className="text-xs">{category}</Badge>
          </div>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +
                {tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Usage</span>
            <span className="font-medium">{executionCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Success Rate</span>
            <span className="font-medium">
              {successRate}
              %
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">Popular Template</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {onUse && (
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={onUse}
          >
            <Copy className="mr-2 h-4 w-4" />
            Use Template
          </Button>
        )}
        {onPreview && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <Link href={`/workflow/${id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
