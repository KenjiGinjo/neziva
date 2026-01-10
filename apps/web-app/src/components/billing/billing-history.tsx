import type { ColumnDef } from '@tanstack/react-table'
import { Download, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/table'

interface Invoice {
  id: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'failed'
  date: string
  invoiceUrl?: string
}

interface BillingHistoryProps {
  invoices: Invoice[]
}

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
  paid: 'success',
  pending: 'warning',
  failed: 'destructive',
}

const statusLabelMap: Record<string, string> = {
  paid: 'Paid',
  pending: 'Pending',
  failed: 'Failed',
}

export function BillingHistory({ invoices }: BillingHistoryProps) {
  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('date'))
        return <span className="text-sm">{date.toLocaleDateString()}</span>
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const invoice = row.original
        return (
          <span className="font-medium">
            {invoice.currency}
            {' '}
            {(invoice.amount / 100).toFixed(2)}
          </span>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge variant={statusVariantMap[status] || 'default'}>
            {statusLabelMap[status] || status}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const invoice = row.original
        return (
          <div className="flex items-center gap-2">
            {invoice.invoiceUrl && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => window.open(invoice.invoiceUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    // Download invoice
                    window.open(invoice.invoiceUrl, '_blank')
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0
          ? (
              <div className="text-center text-muted-foreground py-8">
                No invoices found
              </div>
            )
          : (
              <DataTable columns={columns} data={invoices} />
            )}
      </CardContent>
    </Card>
  )
}
