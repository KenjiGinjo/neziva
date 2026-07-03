import { useRoute } from 'wouter'
import { BlogDetail } from '@/components/blog-detail'

export function PageBlogDetail() {
  const [, params] = useRoute('/blog/:id')
  return <BlogDetail id={params?.id ?? ''} />
}
