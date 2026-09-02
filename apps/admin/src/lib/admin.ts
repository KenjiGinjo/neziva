import {
  EnumBlogPostStatus,
  EnumContactFormStatus,
  EnumErrorLogType,
  EnumNewsletterStatus,
} from '@neziva/enums'
import { format } from 'date-fns'

export const PAGE_SIZE = 20

export const CONTACT_STATUS_OPTIONS = [
  { value: String(EnumContactFormStatus.Pending), label: '未处理' },
  { value: String(EnumContactFormStatus.Processed), label: '已处理' },
  { value: String(EnumContactFormStatus.Replied), label: '已回复' },
] as const

export const PROJECT_TYPE_OPTIONS = [
  { value: 'strategy', label: '免费沟通' },
  { value: 'poc', label: '原型' },
  { value: 'implementation', label: '整套上线' },
  { value: 'maintenance', label: '上线后支持' },
  { value: 'other', label: '其他' },
] as const

export const BUDGET_OPTIONS = [
  { value: 'under2k', label: '$2,000 以下' },
  { value: 'under5k', label: '$5,000 以下' },
  { value: '2k-8k', label: '$2,000 – $8,000' },
  { value: '5k-15k', label: '$5,000 – $15,000' },
  { value: '8k-25k', label: '$8,000 – $25,000' },
  { value: '25k+', label: '$25,000 以上' },
  { value: '50k+', label: '$50,000 以上' },
] as const

export const BLOG_STATUS_OPTIONS = [
  { value: String(EnumBlogPostStatus.Draft), label: '草稿' },
  { value: String(EnumBlogPostStatus.Published), label: '已发布' },
  { value: String(EnumBlogPostStatus.Archived), label: '已归档' },
] as const

export const BLOG_CATEGORY_OPTIONS = [
  { value: 'Technical Insights', label: 'Technical Insights' },
  { value: 'Case Studies', label: 'Case Studies' },
  { value: 'Guides & Tutorials', label: 'Guides & Tutorials' },
  { value: 'AI Trends', label: 'AI Trends' },
] as const

export const NEWSLETTER_STATUS_OPTIONS = [
  { value: String(EnumNewsletterStatus.Pending), label: '待验证' },
  { value: String(EnumNewsletterStatus.Subscribed), label: '已订阅' },
  { value: String(EnumNewsletterStatus.Unsubscribed), label: '已退订' },
] as const

export const NEWSLETTER_SOURCE_OPTIONS = [
  { value: 'homepage', label: '首页' },
  { value: 'blog', label: '博客' },
] as const

export const LOG_TYPE_OPTIONS = [
  { value: String(EnumErrorLogType.ApplicationError), label: '应用错误' },
  { value: String(EnumErrorLogType.DatabaseError), label: '数据库' },
  { value: String(EnumErrorLogType.ThirdPartyPay), label: '第三方支付' },
] as const

export function labelOf(
  options: readonly { value: string, label: string }[],
  value: string | number | null | undefined,
  fallback = '—',
) {
  if (value === null || value === undefined || value === '')
    return fallback
  return options.find(o => o.value === String(value))?.label ?? String(value)
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value)
    return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return '—'
  return format(date, 'yyyy-MM-dd HH:mm')
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value)
    return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime()))
    return '—'
  return format(date, 'yyyy-MM-dd')
}

export function toSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function estimateReadTime(content: string) {
  const chars = content.replace(/\s/g, '').length
  return Math.max(1, Math.round(chars / 400))
}

export function compactQuery<T extends Record<string, unknown>>(query: T): T {
  return Object.fromEntries(
    Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T
}

export function qcArgs<T extends Record<string, unknown>>(args: T): any {
  return args
}
