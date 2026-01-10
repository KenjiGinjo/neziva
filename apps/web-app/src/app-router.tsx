import { Route, Switch } from 'wouter'
import { PageAuthLogin } from './pages/auth-login'
import { PageAuthSignup } from './pages/auth-signup'
import { PageBilling } from './pages/billing'
import { PageDashboard } from './pages/dashboard'
import { PageDocs } from './pages/docs'
import { PageHelp } from './pages/help'
import { PageHome } from './pages/home'
import { PageNotFound } from './pages/not-found'
import { PageSettings } from './pages/settings'
import { PageSettingsApiKeys } from './pages/settings-api-keys'
import { PageSettingsNotifications } from './pages/settings-notifications'
import { PageSettingsProfile } from './pages/settings-profile'
import { PageSettingsSecurity } from './pages/settings-security'
import { PageTemplates } from './pages/templates'
import { PageWorkflowDetail } from './pages/workflow-detail'
import { PageWorkflowEdit } from './pages/workflow-edit'
import { PageWorkflowLogs } from './pages/workflow-logs'

export function AppRouter() {
  return (
    <Switch>
      {/* 首页 */}
      <Route path="/" component={PageHome} />

      {/* 认证相关 */}
      <Route path="/auth/signup" component={PageAuthSignup} />
      <Route path="/auth/login" component={PageAuthLogin} />

      {/* 工作流相关 */}
      <Route path="/dashboard" component={PageDashboard} />
      <Route path="/workflow/:id/edit" component={PageWorkflowEdit} />
      <Route path="/workflow/:id/logs" component={PageWorkflowLogs} />
      <Route path="/workflow/:id" component={PageWorkflowDetail} />

      {/* 模板市场 */}
      <Route path="/templates" component={PageTemplates} />

      {/* 设置相关 */}
      <Route path="/settings/profile" component={PageSettingsProfile} />
      <Route path="/settings/security" component={PageSettingsSecurity} />
      <Route path="/settings/api-keys" component={PageSettingsApiKeys} />
      <Route path="/settings/notifications" component={PageSettingsNotifications} />
      <Route path="/settings" component={PageSettings} />

      {/* 订阅/账单 */}
      <Route path="/billing" component={PageBilling} />

      {/* 帮助/文档 */}
      <Route path="/docs" component={PageDocs} />
      <Route path="/help" component={PageHelp} />

      {/* 404 */}
      <Route component={PageNotFound} />
    </Switch>
  )
}
