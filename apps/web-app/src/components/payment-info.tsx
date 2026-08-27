import { useState } from 'react'
import { useI18n } from '@/i18n'

const LEGAL = '两江新区涅智维网络科技工作室'
const USCC = '92500157MAKD81B01T'
const PAYEE = '崔丛昆'
const ACCOUNT_DISPLAY = '6217 0011 4000 2950 548'
const ACCOUNT_PLAIN = '6217001140002950548'
const BANK = '中国建设银行股份有限公司哈尔滨田地支行'
const CNAPS = '105261000773'

function CopyRow({
  label,
  value,
  copyValue,
}: {
  label: string
  value: string
  copyValue?: string
}) {
  const { m } = useI18n()
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }
    catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-4 border-b border-gray-200 last:border-0">
      <dt className="sm:w-32 shrink-0 text-gray-500">{label}</dt>
      <dd className="flex-1 flex flex-wrap items-center gap-3">
        <span className="text-gray-900 font-medium break-all">{value}</span>
        <button
          type="button"
          onClick={copy}
          className="text-sm text-[#4F46E5] hover:underline"
        >
          {copied ? m.payment.copied : m.payment.copy}
        </button>
      </dd>
    </div>
  )
}

export function PaymentInfo() {
  const { m } = useI18n()
  const p = m.payment

  return (
    <section className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{p.infoTitle}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{p.infoIntro}</p>
        </div>
        <dl className="max-w-3xl border border-gray-200 rounded-2xl px-6 md:px-8">
          <CopyRow label={p.legalLabel} value={LEGAL} />
          <CopyRow label={p.usccLabel} value={USCC} />
          <CopyRow label={p.payeeLabel} value={PAYEE} />
          <CopyRow label={p.accountLabel} value={ACCOUNT_DISPLAY} copyValue={ACCOUNT_PLAIN} />
          <CopyRow label={p.bankLabel} value={BANK} />
          <CopyRow label={p.cnapsLabel} value={CNAPS} />
        </dl>
        <p className="max-w-3xl mt-6 text-gray-600 leading-relaxed">{p.note}</p>
      </div>
    </section>
  )
}
