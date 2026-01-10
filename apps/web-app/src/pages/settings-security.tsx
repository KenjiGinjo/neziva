import { vAuthChangePassword } from '@haole/validations'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { SettingsSidebar } from '@/components/settings/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSchemaPatch } from '@/hooks/schema-patch'
import { $qc } from '@/query-client'

export function PageSettingsSecurity() {
  const queryClient = useQueryClient()
  const { form, dto, patch } = useSchemaPatch(vAuthChangePassword)

  const handleChangePassword = async () => {
    await $qc.user.password.$put.mutation({ body: dto })
    // Invalidate password-related queries if any
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes('user/password')
      },
    })
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
                <h1 className="text-3xl font-bold mb-2">Security Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account security and authentication settings
                </p>
              </div>

              <div className="space-y-6">
                {/* Change Password */}
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form.Form form={form} onChange={patch}>
                      <div className="space-y-4">
                        <Form.Input
                          name="oldPassword"
                          label="Current Password"
                          type="password"
                          placeholder="Enter your current password"
                        />
                        <Form.Input
                          name="newPassword"
                          label="New Password"
                          type="password"
                          placeholder="Enter your new password"
                        />
                        <Form.Input
                          name="confirmPassword"
                          label="Confirm New Password"
                          type="password"
                          placeholder="Confirm your new password"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <Form.Submit
                            form={form}
                            request={handleChangePassword}
                            showLoading={true}
                            showLoadingOption={{ title: 'Changing password...' }}
                          >
                            <Button type="button">Change Password</Button>
                          </Form.Submit>
                        </div>
                      </div>
                    </Form.Form>
                  </CardContent>
                </Card>

                {/* 2FA */}
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      2FA feature coming soon
                    </div>
                  </CardContent>
                </Card>

                {/* Active Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>
                      Manage your active login sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Active sessions list coming soon
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
