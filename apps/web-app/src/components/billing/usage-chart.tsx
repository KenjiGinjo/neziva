import Plot from 'react-plotly.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UsageChartProps {
  data?: Array<{ date: string, value: number }>
  title?: string
}

export function UsageChart({ data = [], title = 'Usage Over Time' }: UsageChartProps) {
  // Prepare chart data
  const chartData = data.length > 0
    ? [
        {
          x: data.map(d => d.date),
          y: data.map(d => d.value),
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          name: 'Usage',
          line: { color: 'rgb(99, 102, 241)' },
        },
      ]
    : [
        {
          x: [],
          y: [],
          type: 'scatter' as const,
          mode: 'lines+markers' as const,
          name: 'Usage',
        },
      ]

  const layout = {
    title: title ? { text: title } : undefined,
    xaxis: { title: { text: 'Date' } },
    yaxis: { title: { text: 'Usage' } },
    autosize: true,
    margin: { l: 50, r: 50, t: 50, b: 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Plot
            data={chartData}
            layout={layout}
            style={{ width: '100%', height: '100%' }}
            config={{ responsive: true, displayModeBar: false }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
