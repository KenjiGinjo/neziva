import { EnumBlogPostStatus } from '@neziva/enums'
import { vBlogCreate } from '@neziva/validations'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { toast } from 'sonner'
import { Link, useParams } from 'wouter'
import { navigate } from 'wouter/use-browser-location'
import { Form } from '@/components/form'
import { PageShell } from '@/components/page-shell'
import { QueryData } from '@/components/query-data'
import { Button } from '@/components/ui/button'
import { useSchemaPatch } from '@/hooks'
import {
  BLOG_CATEGORY_OPTIONS,
  BLOG_STATUS_OPTIONS,
  estimateReadTime,
  qcArgs,
  toSlug,
} from '@/lib/admin'
import { $qc } from '@/query-client'

type BlogFormValues = {
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  tags?: string[]
  author: string
  readTime?: number
  featured?: boolean
  status?: number | string
  coverImage?: string
  seoTitle?: string
  seoDesc?: string
}

export function PageBlogEdit() {
  const params = useParams<{ id?: string }>()
  const id = params.id

  if (!id) {
    return <BlogForm />
  }

  return (
    <QueryData
      queryRoute={$qc.admin.blog.posts[':id'].$get}
      queryArgs={qcArgs({ params: { id } })}
      renderData={({ data }) => <BlogForm id={id} initial={data as BlogFormValues} />}
    />
  )
}

function BlogForm({ id, initial }: { id?: string, initial?: BlogFormValues }) {
  const slugTouched = useRef(Boolean(id))
  const { form, dto, patch } = useSchemaPatch(vBlogCreate, {
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    content: initial?.content ?? '',
    excerpt: initial?.excerpt ?? '',
    category: initial?.category ?? 'Technical Insights',
    tags: initial?.tags ?? [],
    author: initial?.author ?? 'neziva',
    readTime: initial?.readTime ?? 1,
    featured: initial?.featured ?? false,
    status: initial?.status ?? EnumBlogPostStatus.Draft,
    coverImage: initial?.coverImage ?? '',
    seoTitle: initial?.seoTitle ?? '',
    seoDesc: initial?.seoDesc ?? '',
  })

  const buildBody = (status?: number) => {
    const nextStatus = status ?? Number(dto.status ?? EnumBlogPostStatus.Draft)
    return {
      title: dto.title,
      slug: dto.slug,
      content: dto.content,
      excerpt: dto.excerpt || undefined,
      category: dto.category,
      tags: dto.tags ?? [],
      author: dto.author,
      readTime: estimateReadTime(dto.content || ''),
      featured: Boolean(dto.featured),
      status: nextStatus,
      coverImage: dto.coverImage || undefined,
      seoTitle: dto.seoTitle || undefined,
      seoDesc: dto.seoDesc || undefined,
    }
  }

  return (
    <PageShell
      title={id ? '编辑文章' : '写文章'}
      description="正文使用 Markdown，与站点展示一致。"
      actions={(
        <Button variant="outline" asChild>
          <Link href="/blog">
            <ArrowLeft />
            返回
          </Link>
        </Button>
      )}
    >
      <Form.Form
        form={form}
        onChange={(values) => {
          patch(values)
          if (!slugTouched.current && values.title) {
            form.setValue('slug', toSlug(values.title))
          }
        }}
        className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div className="rounded-xl border bg-card p-6">
          <Form.Input label="标题" name="title" placeholder="文章标题" />
          <Form.Input
            label="Slug"
            name="slug"
            placeholder="url-slug"
            onFocus={() => {
              slugTouched.current = true
            }}
          />
          <Form.Textarea label="摘要" name="excerpt" rows={3} placeholder="列表页展示的短介绍" />
          <Form.Textarea
            label="正文（Markdown）"
            name="content"
            rows={22}
            className="font-mono text-sm"
            placeholder={'# 标题\n\n正文...'}
          />
        </div>

        <div className="h-fit space-y-0 rounded-xl border bg-card p-6">
          <Form.Select label="状态" name="status" options={BLOG_STATUS_OPTIONS} />
          <Form.Select label="分类" name="category" options={BLOG_CATEGORY_OPTIONS} />
          <Form.Input label="作者" name="author" />
          <Form.Tags label="标签" name="tags" placeholder="输入后回车" />
          <Form.Switch name="featured" label="精选" />
          <Form.Input label="封面图 URL" name="coverImage" placeholder="https://" />
          {dto.coverImage && (
            <img src={dto.coverImage} alt="封面" className="mb-6 max-h-40 w-full rounded-md object-cover" />
          )}
          <Form.Input label="SEO 标题" name="seoTitle" />
          <Form.Textarea label="SEO 描述" name="seoDesc" rows={3} />

          <div className="flex flex-col gap-2 pt-2">
            <Form.Submit
              form={form}
              request={async () => {
                const body = buildBody()
                if (id) {
                  await $qc.admin.blog.posts[':id'].$put.mutation(qcArgs({ params: { id }, body }))
                  return { id }
                }
                return $qc.admin.blog.posts.$post.mutation({ body: { ...body, views: 0 } })
              }}
              onSuccess={async (res) => {
                toast.success(id ? '已保存' : '已创建')
                const createdId = id || (res as { body?: { data?: { id?: string } } })?.body?.data?.id
                if (createdId && !id)
                  navigate(`/blog/${createdId}`, { replace: true })
              }}
            >
              <Button className="w-full">保存</Button>
            </Form.Submit>
            {Number(dto.status) !== EnumBlogPostStatus.Published && (
              <Form.Submit
                form={form}
                request={async () => {
                  const body = buildBody(EnumBlogPostStatus.Published)
                  if (id) {
                    await $qc.admin.blog.posts[':id'].$put.mutation(qcArgs({ params: { id }, body }))
                    return { id }
                  }
                  return $qc.admin.blog.posts.$post.mutation({ body: { ...body, views: 0 } })
                }}
                onSuccess={async (res) => {
                  toast.success('已发布')
                  const createdId = id || (res as { body?: { data?: { id?: string } } })?.body?.data?.id
                  if (createdId && !id)
                    navigate(`/blog/${createdId}`, { replace: true })
                  else
                    navigate('/blog')
                }}
              >
                <Button variant="secondary" className="w-full">保存并发布</Button>
              </Form.Submit>
            )}
          </div>
        </div>
      </Form.Form>
    </PageShell>
  )
}
