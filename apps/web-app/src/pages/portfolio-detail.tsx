import { useRoute } from 'wouter'
import { MainLayout } from '@/components/main-layout'
import { PortfolioDetail } from '@/components/portfolio-detail'

export function PagePortfolioDetail() {
  const [, params] = useRoute('/portfolio/:id')
  const id = params?.id

  return (
    <MainLayout>
      <PortfolioDetail id={id ?? ''} />
    </MainLayout>
  )
}
