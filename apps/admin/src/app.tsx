import { Route, Switch } from 'wouter'
import { GuardAuthPage } from '@/components/guard'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { PageDashboard } from './pages/dashboard'
import { PageExecutions } from './pages/executions'
import { PageExecutionsDetail } from './pages/executions-detail'
import { PageFinance } from './pages/finance'
import { PageLogin } from './pages/login'
import { PageLogs } from './pages/logs'
import { NotFound } from './pages/not-found'
import { PageSettings } from './pages/settings'
import { PageUsers } from './pages/users'
import { PageUsersDetail } from './pages/users-detail'
import { PageWorkflows } from './pages/workflows'
import { PageWorkflowsDetail } from './pages/workflows-detail'

export function App() {
  return (
    <Switch>
      {/* 管理员登录 */}
      <Route path="/login" component={PageLogin} />
      <Route path="/" component={PageLogin} />

      {/* 管理员后台（需要认证） */}
      <Route path="/a" nest>
        <GuardAuthPage>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex sticky z-10 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
              </header>
              <Switch>
                {/* Dashboard */}
                <Route path="/" component={PageDashboard} />

                {/* 用户管理 */}
                <Route path="/users/:id" component={PageUsersDetail} />
                <Route path="/users" component={PageUsers} />

                {/* 工作流管理 */}
                <Route path="/workflows/:id" component={PageWorkflowsDetail} />
                <Route path="/workflows" component={PageWorkflows} />

                {/* 执行监控 */}
                <Route path="/executions/:id" component={PageExecutionsDetail} />
                <Route path="/executions" component={PageExecutions} />

                {/* 系统设置 */}
                <Route path="/settings" component={PageSettings} />

                {/* 日志查看 */}
                <Route path="/logs" component={PageLogs} />

                {/* 财务统计 */}
                <Route path="/finance" component={PageFinance} />

                {/* 404 */}
                <Route component={NotFound} />
              </Switch>
            </SidebarInset>
          </SidebarProvider>
        </GuardAuthPage>
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  )
}
