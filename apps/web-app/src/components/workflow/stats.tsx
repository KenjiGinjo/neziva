import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface WorkflowStatsProps {
  total?: number
  active?: number
  todayExecutions?: number
  successRate?: number
}

export function WorkflowStats({
  total = 0,
  active = 0,
  todayExecutions = 0,
  successRate = 0,
}: WorkflowStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground">All workflows created</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{active}</div>
          <p className="text-xs text-muted-foreground">Currently running</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today Executions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todayExecutions}</div>
          <p className="text-xs text-muted-foreground">Executions today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {successRate.toFixed(1)}
            %
          </div>
          <p className="text-xs text-muted-foreground">Overall success rate</p>
        </CardContent>
      </Card>
    </div>
  )
}
