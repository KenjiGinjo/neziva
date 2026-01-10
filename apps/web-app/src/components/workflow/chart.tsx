import Plot from 'react-plotly.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type ChartType = 'line' | 'bar' | 'scatter'

interface ChartDataPoint {
  x: string | number
  y: number
  label?: string
}

interface ChartProps {
  title?: string
  data: ChartDataPoint[]
  type?: ChartType
  xLabel?: string
  yLabel?: string
  height?: number
}

export function Chart({
  title,
  data,
  type = 'line',
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  height = 300,
}: ChartProps) {
  const chartData: any = data.length > 0
    ? [
        {
          x: data.map(d => d.x),
          y: data.map(d => d.y),
          type: type === 'bar' ? 'bar' : 'scatter',
          mode: type === 'line' ? 'lines+markers' : type === 'scatter' ? 'markers' : undefined,
          name: title || 'Data',
          marker: type === 'bar' ? { color: 'rgb(99, 102, 241)' } : undefined,
          line: type === 'line' ? { color: 'rgb(99, 102, 241)' } : undefined,
        },
      ]
    : [
        {
          x: [],
          y: [],
          type: type === 'bar' ? 'bar' : 'scatter',
          name: title || 'Data',
        },
      ]

  const layout = {
    title: title ? { text: title } : undefined,
    xaxis: { title: { text: xLabel } },
    yaxis: { title: { text: yLabel } },
    autosize: true,
    margin: { l: 50, r: 50, t: title ? 50 : 20, b: 50 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      family: 'system-ui, -apple-system, sans-serif',
      size: 12,
    },
  }

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div style={{ height: `${height}px` }}>
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
