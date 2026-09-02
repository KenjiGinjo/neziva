import {
  EnumBlogPostStatus,
  EnumContactFormStatus,
  EnumNewsletterStatus,
} from '@neziva/enums'
import { FileText, Mail, Newspaper, ScrollText } from 'lucide-react'
import { Link } from 'wouter'
import { Loading } from '@/components/loading'
import { PageShell } from '@/components/page-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { $qc } from '@/query-client'

type Stats = {
  totalContactForms: number
  pendingContactForms: number
  totalBlogPosts: number
  publishedBlogPosts: number
  totalNewsletterSubscribers: number
  activeNewsletterSubscribers: number
  errorLogsToday: number
  systemHealth: 'healthy' | 'warning' | 'error'
}

const healthLabel = {
  healthy: { text: '正常', className: 'bg-emerald-50 text-emerald-800' },
  warning: { text: '注意', className: 'bg-amber-50 text-amber-800' },
  error: { text: '异常', className: 'bg-red-50 text-red-800' },
}

export function PageDashboard() {
  const { data, isLoading, error } = $qc.admin.stats.$get.useQuery()

  if (isLoading)
    return <Loading.Card />
  if (error || !data)
    return <Loading.Error error={error} />

  const stats = data.body.data as Stats
  const health = healthLabel[stats.systemHealth] ?? healthLabel.healthy

  return (
    <PageShell title="总览" description="工作室站点运营数据。">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          href={`/contacts?status=${EnumContactFormStatus.Pending}`}
          icon={Mail}
          label="待处理咨询"
          value={stats.pendingContactForms}
          hint={`共 ${stats.totalContactForms} 条`}
        />
        <StatCard
          href={`/blog?status=${EnumBlogPostStatus.Published}`}
          icon={FileText}
          label="已发布文章"
          value={stats.publishedBlogPosts}
          hint={`共 ${stats.totalBlogPosts} 篇`}
        />
        <StatCard
          href={`/newsletter?status=${EnumNewsletterStatus.Subscribed}`}
          icon={Newspaper}
          label="有效订阅"
          value={stats.activeNewsletterSubscribers}
          hint={`共 ${stats.totalNewsletterSubscribers} 人`}
        />
        <StatCard
          href="/logs"
          icon={ScrollText}
          label="今日错误"
          value={stats.errorLogsToday}
          hint="当天错误日志"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">系统状态</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">根据今日错误量估算</p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${health.className}`}>
            {health.text}
          </span>
        </CardContent>
      </Card>
    </PageShell>
  )
}

function StatCard({
  href,
  icon: Icon,
  label,
  value,
  hint,
}: {
  href: string
  icon: typeof Mail
  label: string
  value: number
  hint: string
}) {
  return (
    <Link href={href}>
      <Card className="transition-colors hover:bg-muted/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
          <Icon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-semibold tracking-tight">{value}</div>
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
