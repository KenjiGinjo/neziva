import { vUpdateProfile } from '@haole/validations'
import { useQueryClient } from '@packages/ts-rest-react-query/tanstack-react-query'
import { Form } from '@/components/form'
import { GuardAuthPage } from '@/components/guard/auth-page'
import { HeaderDashboard } from '@/components/header'
import { MainLayout } from '@/components/layout'
import { QueryData } from '@/components/query-data'
import { SettingsSidebar } from '@/components/settings/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSchemaPatch } from '@/hooks/schema-patch'
import { useUserState } from '@/hooks/user'
import { $qc } from '@/query-client'

function ProfileForm({ profile }: { profile: any }) {
  const queryClient = useQueryClient()
  const { refetch: refetchUser } = useUserState()

  const { form, dto, patch } = useSchemaPatch(vUpdateProfile, {
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    nickname: profile.nickname || '',
    avatarUrl: profile.avatarUrl || '',
  })

  const handleSave = async () => {
    await $qc.user.profile.$put.mutation({ body: dto })
    // Refresh user profile and state
    await queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey
        return Array.isArray(key) && typeof key[0] === 'string' && key[0].includes('user/profile')
      },
    })
    if (refetchUser) {
      await refetchUser()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form.Form form={form} onChange={patch}>
          <div className="space-y-4">
            <Form.Image
              name="avatarUrl"
              label="Avatar"
              uploaderProps={{
                emptyMessage: 'Click to upload your avatar',
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Input
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
              />
              <Form.Input
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
            </div>
            <Form.Input
              name="nickname"
              label="Nickname"
              placeholder="Enter your nickname (optional)"
            />
            <div className="flex items-center justify-end gap-2">
              <Form.Submit
                form={form}
                request={handleSave}
                showLoading={true}
                showLoadingOption={{ title: 'Saving profile...' }}
              >
                <Button type="button">Save Changes</Button>
              </Form.Submit>
            </div>
          </div>
        </Form.Form>
      </CardContent>
    </Card>
  )
}

export function PageSettingsProfile() {
  return (
    <GuardAuthPage>
      <MainLayout>
        <HeaderDashboard />
        <div className="flex h-[calc(100vh-4rem)]">
          <SettingsSidebar className="hidden md:block" />
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                <p className="text-muted-foreground">
                  Manage your personal information and profile settings
                </p>
              </div>

              <QueryData
                queryRoute={$qc.user.profile.$get}
                queryArgs={{}}
                renderData={(data) => {
                  return <ProfileForm profile={data.data} />
                }}
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </GuardAuthPage>
  )
}
