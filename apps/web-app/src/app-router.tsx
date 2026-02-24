import { Route, Switch } from 'wouter'
import { MainLayout } from './components/main-layout'
import { PageAbout } from './pages/about'
import { PageBlog } from './pages/blog'
import { PageContact } from './pages/contact'
import { PageHome } from './pages/home'
import { PageNotFound } from './pages/not-found'
import { PagePortfolio } from './pages/portfolio'
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
      <Route path="/portfolio">
        <MainLayout>
          <PagePortfolio />
        </MainLayout>
      </Route>
      <Route path="/about">
        <MainLayout>
          <PageAbout />
        </MainLayout>
      </Route>
      <Route path="/contact">
        <MainLayout>
          <PageContact />
        </MainLayout>
      </Route>
      <Route path="/blog">
        <MainLayout>
          <PageBlog />
        </MainLayout>
      </Route>
      <Route component={PageNotFound} />
    </Switch>
  )
}
