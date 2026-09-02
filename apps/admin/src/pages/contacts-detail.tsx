import type { ResAdminContactFormList } from '@neziva/interfaces'
import { EnumContactFormStatus } from '@neziva/enums'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Link, useParams } from 'wouter'
import { navigate } from 'wouter/use-browser-location'
import { ActionButtons } from '@/components/action-buttons'
import { Loading } from '@/components/loading'
import { PageShell } from '@/components/page-shell'
import { Request } from '@/components/request'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  BUDGET_OPTIONS,
  CONTACT_STATUS_OPTIONS,
  formatDateTime,
  labelOf,
  PROJECT_TYPE_OPTIONS,
  qcArgs,
} from '@/lib/admin'
import { $qc } from '@/query-client'

function contactTone(status: number) {
  if (status === EnumContactFormStatus.Pending)
    return 'amber' as const
  if (status === EnumContactFormStatus.Processed)
    return 'blue' as const
  return 'green' as const
}

export function PageContactsDetail() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const { data, isLoading, error, refetch } = $qc.admin.contact.forms[':id'].$get.useQuery(
    qcArgs({ params: { id } }),
    { enabled: !!id },
  )

  const item = data?.body.data as ResAdminContactFormList | undefined
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (item)
      setNotes(item.notes ?? '')
  }, [item])

  if (!id)
    return <Loading.Error error={new Error('missing id')} />
  if (isLoading)
    return <Loading.Card />
  if (error || !item)
    return <Loading.Error error={error} />

  return (
    <PageShell
      title={item.name}
      description={item.email}
      actions={(
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/contacts">
              <ArrowLeft />
              返回
            </Link>
          </Button>
          <ActionButtons
            onDelete={async () => {
              await $qc.admin.contact.forms[':id'].$delete.mutation(qcArgs({ params: { id } }))
              toast.success('已删除')
              navigate('/contacts')
            }}
          />
        </div>
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">需求</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <Field label="公司" value={item.company} />
              <Field label="电话" value={item.phone} />
              <Field label="项目类型" value={labelOf(PROJECT_TYPE_OPTIONS, item.projectType)} />
              <Field label="预算" value={labelOf(BUDGET_OPTIONS, item.budget)} />
              <Field label="来源" value={item.source === 'chat' ? '聊天' : '表单'} />
              <Field label="提交时间" value={formatDateTime(item.createdAt)} />
            </dl>
            <div>
              <div className="mb-2 text-sm font-medium">描述</div>
              <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
            <div>
              <div className="mb-2 text-sm font-medium">备注</div>
              <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={5} placeholder="内部备注，客户不可见" />
              <Request
                request={() => $qc.admin.contact.forms[':id'].notes.$put.mutation(qcArgs({
                  params: { id },
                  body: { notes },
                }))}
                onSuccess={async () => {
                  toast.success('备注已保存')
                  await refetch()
                }}
              >
                <Button className="mt-3" variant="secondary">保存备注</Button>
              </Request>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              状态
              <StatusBadge label={labelOf(CONTACT_STATUS_OPTIONS, item.status)} tone={contactTone(item.status)} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {CONTACT_STATUS_OPTIONS.map(option => (
              <Request
                key={option.value}
                request={() => $qc.admin.contact.forms[':id'].status.$put.mutation(qcArgs({
                  params: { id },
                  body: { status: Number(option.value) as EnumContactFormStatus },
                }))}
                onSuccess={async () => {
                  toast.success('状态已更新')
                  await refetch()
                }}
              >
                <Button
                  variant={String(item.status) === option.value ? 'default' : 'outline'}
                  className="w-full justify-start"
                >
                  {option.label}
                </Button>
              </Request>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

function Field({ label, value }: { label: string, value?: string | null }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value || '—'}</dd>
    </div>
  )
}
