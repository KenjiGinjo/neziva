import { Route, Switch } from 'wouter'
import { GuardAuthPage } from '@/components/guard'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { NotFound } from '../not-found'
import { PageCharacterEdit } from './character/edit'
import PageCharacterList from './character/list'
import PageHome from './home'
import { PageOrderDetail } from './order/detail'
import { PageOrderList } from './order/list'
import { PageRaffleCreate } from './raffle/create'
import { PageRaffleDetail } from './raffle/detail'
import { PageRaffleEdit } from './raffle/edit'
import { PageRaffleList } from './raffle/list'
import { PageReportList } from './report/list'
import { PageSystemSetting } from './system/setting'
import { PageUserList } from './user/list'

export function PageAdmin() {
  return (
    <GuardAuthPage>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex sticky z-10 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <Switch>
            <Route path="/" component={PageHome} />
            <Route path="/character/list" component={PageCharacterList} />
            <Route path="/character/edit/:characterId" component={PageCharacterEdit} />
            <Route path="/order/list" component={PageOrderList} />
            <Route path="/order/detail/:type/:orderId" component={PageOrderDetail} />
            <Route path="/user/list" component={PageUserList} />
            <Route path="/report/list" component={PageReportList} />
            <Route path="/raffle/list" component={PageRaffleList} />
            <Route path="/raffle/detail/:raffleId" component={PageRaffleDetail} />
            <Route path="/raffle/edit/:raffleId" component={PageRaffleEdit} />
            <Route path="/raffle/create" component={PageRaffleCreate} />
            <Route path="/system/setting" component={PageSystemSetting} />

            <Route component={NotFound} />
          </Switch>
        </SidebarInset>
      </SidebarProvider>
    </GuardAuthPage>
  )
}
