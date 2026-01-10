import { EnumSubscriptionPlan, EnumSubscriptionStatus } from '@haole/enums'

import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { CreditCard, X } from 'lucide-react'
import { BillingHistory } from '@/components/billing/billing-history'
import { PricingCard } from '@/components/billing/pricing-card'
import { UsageChart } from '@/components/billing/usage-chart'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { Request } from '@/components/request'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { $qc } from '@/query-client'

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

const statusVariantMap: Record<EnumSubscriptionStatus, 'default' | 'success' | 'warning' | 'destructive'> = {
  [EnumSubscriptionStatus.Active]: 'success',
  [EnumSubscriptionStatus.Canceled]: 'default',
  [EnumSubscriptionStatus.Expired]: 'destructive',
  [EnumSubscriptionStatus.PastDue]: 'warning',
}

const statusLabelMap: Record<EnumSubscriptionStatus, string> = {
  [EnumSubscriptionStatus.Active]: 'Active',
  [EnumSubscriptionStatus.Canceled]: 'Canceled',
  [EnumSubscriptionStatus.Expired]: 'Expired',
  [EnumSubscriptionStatus.PastDue]: 'Past Due',
}

export function PageBilling() {
  const queryClient = useQueryClient()

  const handleSubscribe = (plan: EnumSubscriptionPlan) => {
    return async () => {
      // Only allow subscribing to paid plans
      if (plan === EnumSubscriptionPlan.Free) {
        return
      }
      const res = await $qc.billing.subscribe.$post.mutation({
        body: {
          plan: plan as 'starter' | 'pro' | 'business',
          paymentMethod: 'stripe', // Default payment method
        },
      })
      const checkoutUrl = res.body.data.checkoutUrl
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }
    }
  }

  const handleCancel = async () => {
    await $qc.billing.cancel.$post.mutation({})
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes('billing')
      },
    })
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
            <p className="text-muted-foreground">
              Manage your subscription and view billing history
            </p>
          </div>

          <div className="space-y-8">
            {/* Current Subscription */}
            <QueryData
              queryRoute={$qc.billing.subscription.$get}
              queryArgs={{}}
              renderData={(data) => {
                const subscription = data.data
                const plan = subscription.plan as EnumSubscriptionPlan
                const status = subscription.status as EnumSubscriptionStatus

                return (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Current Subscription</CardTitle>
                          <CardDescription>
                            Your current subscription plan and status
                          </CardDescription>
                        </div>
                        <Badge variant={statusVariantMap[status]}>
                          {statusLabelMap[status]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Plan</span>
                          <span className="font-medium">
                            {planPrices[plan]}
                            {' '}
                            / month
                          </span>
                        </div>
                        {subscription.currentPeriodStart && subscription.currentPeriodEnd && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Current Period</span>
                              <span className="text-sm">
                                {new Date(subscription.currentPeriodStart).toLocaleDateString()}
                                {' '}
                                -
                                {' '}
                                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                              </span>
                            </div>
                            {subscription.cancelAtPeriodEnd && (
                              <div className="flex items-center justify-between text-warning">
                                <span className="text-sm">Cancels at period end</span>
                                <Request
                                  request={handleCancel}
                                  showLoading={true}
                                  showLoadingOption={{ title: 'Canceling subscription...' }}
                                  showModal={true}
                                  showModalOption={{
                                    title: 'Cancel Subscription',
                                    description: 'Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period.',
                                  }}
                                >
                                  <Button variant="outline" size="sm">
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel Subscription
                                  </Button>
                                </Request>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              }}
            />

            {/* Usage Statistics */}
            <QueryData
              queryRoute={$qc.billing.usage.$get}
              queryArgs={{}}
              renderData={(data) => {
                const usage = data.data
                const apiCallsPercentage = usage.apiCallsLimit > 0
                  ? (usage.apiCallsUsed / usage.apiCallsLimit) * 100
                  : 0

                return (
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>API Calls Usage</CardTitle>
                        <CardDescription>
                          Period:
                          {' '}
                          {new Date(usage.periodStart).toLocaleDateString()}
                          {' '}
                          -
                          {' '}
                          {new Date(usage.periodEnd).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Used</span>
                            <span className="font-medium">
                              {usage.apiCallsUsed}
                              {' '}
                              /
                              {' '}
                              {usage.apiCallsLimit}
                            </span>
                          </div>
                          <Progress value={apiCallsPercentage} className="h-2" />
                          <div className="text-xs text-muted-foreground text-right">
                            {apiCallsPercentage.toFixed(1)}
                            % used
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm text-muted-foreground">
                            Workflow Executions:
                            {' '}
                            <span className="font-medium">{usage.workflowExecutions}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <UsageChart
                      title="Usage Over Time"
                      data={[
                        { date: '2024-01-01', value: 100 },
                        { date: '2024-01-02', value: 150 },
                        { date: '2024-01-03', value: 120 },
                        { date: '2024-01-04', value: 180 },
                        { date: '2024-01-05', value: 200 },
                      ]}
                    />
                  </div>
                )
              }}
            />

            {/* Pricing Plans */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
              <QueryData
                queryRoute={$qc.billing.subscription.$get}
                queryArgs={{}}
                renderData={(subscriptionData) => {
                  const currentPlan = subscriptionData.data.plan as EnumSubscriptionPlan

                  return (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {Object.values(EnumSubscriptionPlan).map((plan) => {
                        const isCurrentPlan = plan === currentPlan
                        const card = (
                          <PricingCard
                            key={plan}
                            plan={plan}
                            price={planPrices[plan]}
                            description={planDescriptions[plan]}
                            features={planFeatures[plan]}
                            isPopular={plan === EnumSubscriptionPlan.Pro}
                            currentPlan={isCurrentPlan}
                            onSubscribe={isCurrentPlan ? undefined : handleSubscribe(plan)}
                          />
                        )
                        return isCurrentPlan || plan === EnumSubscriptionPlan.Free
                          ? card
                          : (
                              <Request
                                key={plan}
                                request={handleSubscribe(plan)}
                                showLoading={true}
                                showLoadingOption={{ title: 'Processing subscription...' }}
                              >
                                {card}
                              </Request>
                            )
                      })}
                    </div>
                  )
                }}
              />
            </div>

            {/* Billing History */}
            <QueryData
              queryRoute={$qc.billing.invoices.$get}
              queryArgs={{}}
              renderData={(data) => {
                const invoices = data.items || []
                return (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Billing History</h2>
                    <BillingHistory invoices={invoices} />
                  </div>
                )
              }}
            />

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">Payment method management</div>
                    <div className="text-sm text-muted-foreground">
                      Payment method management coming soon
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
