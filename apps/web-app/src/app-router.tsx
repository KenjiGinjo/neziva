import { Route, Switch } from 'wouter'
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
      <Route path="/" component={PageHome} />
      <Route path="/services" component={PageServices} />
      <Route path="/portfolio" component={PagePortfolio} />
      <Route path="/about" component={PageAbout} />
      <Route path="/contact" component={PageContact} />
      <Route path="/blog" component={PageBlog} />
      <Route component={PageNotFound} />
    </Switch>
  )
}
