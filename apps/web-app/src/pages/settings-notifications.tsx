import { z } from 'zod'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { SettingsSidebar } from '@/components/settings/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSchemaPatch } from '@/hooks/schema-patch'

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().optional(),
  workflowExecutions: z.boolean().optional(),
  systemUpdates: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
})

export function PageSettingsNotifications() {
  const { form, dto, patch } = useSchemaPatch(notificationSettingsSchema, {
    emailNotifications: true,
    workflowExecutions: true,
    systemUpdates: true,
    marketingEmails: false,
  })

  const handleSave = async () => {
    // TODO: Call API when endpoint is available
    // await $qc.user.notifications.$put.mutation({ body: dto })
    console.warn('Notification settings:', dto)
  }

  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="flex h-[calc(100vh-4rem)]">
          <SettingsSidebar className="hidden md:block" />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
                <p className="text-muted-foreground">
                  Manage your notification preferences
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Choose which email notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form.Form form={form} onChange={patch}>
                    <div className="space-y-4">
                      <Form.Switch
                        name="emailNotifications"
                        label="Email Notifications"
                        description="Receive email notifications for important updates"
                      />
                      <Form.Switch
                        name="workflowExecutions"
                        label="Workflow Executions"
                        description="Get notified when workflows complete or fail"
                      />
                      <Form.Switch
                        name="systemUpdates"
                        label="System Updates"
                        description="Receive notifications about system updates and maintenance"
                      />
                      <Form.Switch
                        name="marketingEmails"
                        label="Marketing Emails"
                        description="Receive promotional emails and product updates"
                      />
                      <div className="flex items-center justify-end gap-2 pt-4">
                        <Form.Submit
                          form={form}
                          request={handleSave}
                          showLoading={true}
                          showLoadingOption={{ title: 'Saving preferences...' }}
                        >
                          <Button type="button">Save Preferences</Button>
                        </Form.Submit>
                      </div>
                    </div>
                  </Form.Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
