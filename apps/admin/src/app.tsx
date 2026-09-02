import { Route, Switch } from 'wouter'
import { GuardAuthPage } from '@/components/guard'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { PageBlog } from './pages/blog'
import { PageBlogEdit } from './pages/blog-edit'
import { PageContacts } from './pages/contacts'
import { PageContactsDetail } from './pages/contacts-detail'
import { PageDashboard } from './pages/dashboard'
import { PageLogin } from './pages/login'
import { PageLogs } from './pages/logs'
import { PageNewsletter } from './pages/newsletter'
import { NotFound } from './pages/not-found'

export function App() {
  return (
    <Switch>
      <Route path="/login" component={PageLogin} />
      <Route path="/" component={PageLogin} />

      <Route path="/a" nest>
        <GuardAuthPage>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
              </header>
              <Switch>
                <Route path="/" component={PageDashboard} />
                <Route path="/contacts/:id" component={PageContactsDetail} />
                <Route path="/contacts" component={PageContacts} />
                <Route path="/blog/new" component={PageBlogEdit} />
                <Route path="/blog/:id" component={PageBlogEdit} />
                <Route path="/blog" component={PageBlog} />
                <Route path="/newsletter" component={PageNewsletter} />
                <Route path="/logs" component={PageLogs} />
                <Route component={NotFound} />
              </Switch>
            </SidebarInset>
          </SidebarProvider>
        </GuardAuthPage>
      </Route>

      <Route component={NotFound} />
    </Switch>
  )
}
