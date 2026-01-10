import { EnumSubscriptionPlan } from '@haole/enums'
import {
  BarChart3,
  Check,
  Code2,
  FileText,
  Play,
  Sparkles,
  TrendingDown,
  Workflow,
  Zap,
} from 'lucide-react'
import { useLocation } from 'wouter'
import { PricingCard } from '@/components/billing/pricing-card'
import { Footer } from '@/components/footer'
import { HeaderMainPage } from '@/components/header/main-page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const planPrices: Record<EnumSubscriptionPlan, string> = {
  [EnumSubscriptionPlan.Free]: '$0',
  [EnumSubscriptionPlan.Starter]: '$19',
  [EnumSubscriptionPlan.Pro]: '$49',
  [EnumSubscriptionPlan.Business]: '$149',
}

const planDescriptions: Record<EnumSubscriptionPlan, string> = {
  [EnumSubscriptionPlan.Free]: 'Perfect for getting started',
  [EnumSubscriptionPlan.Starter]: 'For individuals and small teams',
  [EnumSubscriptionPlan.Pro]: 'For growing businesses',
  [EnumSubscriptionPlan.Business]: 'For large organizations',
}

const planFeatures: Record<EnumSubscriptionPlan, Array<{ text: string }>> = {
  [EnumSubscriptionPlan.Free]: [
    { text: '10 workflow executions/month' },
    { text: 'Basic AI models' },
    { text: 'Community support' },
  ],
  [EnumSubscriptionPlan.Starter]: [
    { text: '100 workflow executions/month' },
    { text: 'Advanced AI models' },
    { text: 'Email support' },
    { text: 'Priority processing' },
  ],
  [EnumSubscriptionPlan.Pro]: [
    { text: '1,000 workflow executions/month' },
    { text: 'Premium AI models' },
    { text: '24/7 support' },
    { text: 'Advanced analytics' },
    { text: 'Custom integrations' },
  ],
  [EnumSubscriptionPlan.Business]: [
    { text: 'Unlimited workflow executions' },
    { text: 'All AI models' },
    { text: 'Dedicated support' },
    { text: 'Custom SLA' },
    { text: 'On-premise deployment' },
    { text: 'Enterprise features' },
  ],
}

export function PageHome() {
  const [, setLocation] = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMainPage />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="text-white space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Automate Your Work with AI
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-xl">
                  Build powerful workflows with our visual editor. No coding required. Deploy in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={() => setLocation('/auth/signup')}
                  >
                    Get Started Free
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>
              </div>

              {/* Right: Preview Image */}
              <div className="relative">
                <div className="relative rounded-lg bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center">
                    <Workflow className="h-24 w-24 text-white/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build and manage AI-powered workflows
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <CardHeader>
                  <Workflow className="h-10 w-10 mb-4 text-blue-600 dark:text-blue-400" />
                  <CardTitle>Visual Workflow Builder</CardTitle>
                  <CardDescription>
                    Drag and drop interface to build complex workflows without coding
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                <CardHeader>
                  <Sparkles className="h-10 w-10 mb-4 text-purple-600 dark:text-purple-400" />
                  <CardTitle>AI Model Selection</CardTitle>
                  <CardDescription>
                    Choose from a wide range of AI models optimized for different tasks
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <CardHeader>
                  <TrendingDown className="h-10 w-10 mb-4 text-green-600 dark:text-green-400" />
                  <CardTitle>Cost Optimization</CardTitle>
                  <CardDescription>
                    Smart routing and caching to minimize costs while maximizing performance
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-4 text-orange-600 dark:text-orange-400" />
                  <CardTitle>Real-time Execution</CardTitle>
                  <CardDescription>
                    Monitor and debug workflows in real-time with detailed logs and metrics
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how teams use AI Workflow Builder to automate their work
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle>Content Creation</CardTitle>
                  <CardDescription>
                    Automate content generation, editing, and publishing workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Blog post generation
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Social media content
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Email campaigns
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle>Data Analysis</CardTitle>
                  <CardDescription>
                    Process and analyze large datasets with AI-powered workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Data extraction
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Report generation
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Trend analysis
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                    <Code2 className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle>Code Documentation</CardTitle>
                  <CardDescription>
                    Automatically generate and maintain code documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      API documentation
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      Code comments
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      README generation
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PricingCard
                plan={EnumSubscriptionPlan.Starter}
                price={planPrices[EnumSubscriptionPlan.Starter]}
                description={planDescriptions[EnumSubscriptionPlan.Starter]}
                features={planFeatures[EnumSubscriptionPlan.Starter]}
                onSubscribe={() => setLocation('/auth/signup')}
              />
              <PricingCard
                plan={EnumSubscriptionPlan.Pro}
                price={planPrices[EnumSubscriptionPlan.Pro]}
                description={planDescriptions[EnumSubscriptionPlan.Pro]}
                features={planFeatures[EnumSubscriptionPlan.Pro]}
                isPopular={true}
                onSubscribe={() => setLocation('/auth/signup')}
              />
              <PricingCard
                plan={EnumSubscriptionPlan.Business}
                price={planPrices[EnumSubscriptionPlan.Business]}
                description={planDescriptions[EnumSubscriptionPlan.Business]}
                features={planFeatures[EnumSubscriptionPlan.Business]}
                onSubscribe={() => setLocation('/auth/signup')}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
