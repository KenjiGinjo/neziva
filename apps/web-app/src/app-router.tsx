import { Route, Switch } from 'wouter'
import { MainLayout } from './components/main-layout'
import { PageAbout } from './pages/about'
import { PageBlog } from './pages/blog'
import { PageBlogDetail } from './pages/blog-detail'
import { PageCareers } from './pages/careers'
import { PageContact } from './pages/contact'
import { PageHome } from './pages/home'
import { PageNotFound } from './pages/not-found'
import { PagePayment } from './pages/payment'
import { PagePrivacy } from './pages/privacy'
import { PageServices } from './pages/services'

export function AppRouter() {
  return (
    <Switch>
      <Route path="/">
        <MainLayout>
          <PageHome />
        </MainLayout>
      </Route>
      <Route path="/services">
        <MainLayout>
          <PageServices />
        </MainLayout>
      </Route>
      <Route path="/about">
        <MainLayout>
          <PageAbout />
        </MainLayout>
      </Route>
      <Route path="/careers">
        <MainLayout>
          <PageCareers />
        </MainLayout>
      </Route>
      <Route path="/payment">
        <MainLayout>
          <PagePayment />
        </MainLayout>
      </Route>
      <Route path="/contact">
        <MainLayout>
          <PageContact />
        </MainLayout>
      </Route>
      <Route path="/blog/:id">
        <MainLayout>
          <PageBlogDetail />
        </MainLayout>
      </Route>
      <Route path="/blog">
        <MainLayout>
          <PageBlog />
        </MainLayout>
      </Route>
      <Route path="/privacy">
        <MainLayout>
          <PagePrivacy />
        </MainLayout>
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  )
}
