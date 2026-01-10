import { EnumSubscriptionPlan } from '@neziva/enums'

import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface PricingFeature {
  text: string
}

interface PricingCardProps {
  plan: EnumSubscriptionPlan
  price: string
  description: string
  features: PricingFeature[]
  isPopular?: boolean
  currentPlan?: boolean
  onSubscribe?: () => void
}

const planLabels: Record<EnumSubscriptionPlan, string> = {
  [EnumSubscriptionPlan.Free]: 'Free',
  [EnumSubscriptionPlan.Starter]: 'Starter',
  [EnumSubscriptionPlan.Pro]: 'Pro',
  [EnumSubscriptionPlan.Business]: 'Business',
}

export function PricingCard({
  plan,
  price,
  description,
  features,
  isPopular = false,
  currentPlan = false,
  onSubscribe,
}: PricingCardProps) {
  return (
    <Card className={`relative ${isPopular ? 'border-primary shadow-lg' : ''} ${currentPlan ? 'border-2 border-primary' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
        </div>
      )}
      {currentPlan && (
        <div className="absolute top-4 right-4">
          <Badge variant="outline">Current Plan</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{planLabels[plan]}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {currentPlan
          ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            )
          : (
              onSubscribe
                ? (
                    <Button
                      variant={isPopular ? 'default' : 'outline'}
                      className="w-full"
                      onClick={onSubscribe}
                    >
                      {plan === EnumSubscriptionPlan.Free ? 'Get Started' : 'Subscribe'}
                    </Button>
                  )
                : (
                    <Button
                      variant={isPopular ? 'default' : 'outline'}
                      className="w-full"
                      disabled
                    >
                      {plan === EnumSubscriptionPlan.Free ? 'Get Started' : 'Subscribe'}
                    </Button>
                  )
            )}
      </CardFooter>
    </Card>
  )
}
