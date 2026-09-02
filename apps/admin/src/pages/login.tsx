import { APP } from '@neziva/constants'
import { vAdminLogin } from '@neziva/validations'
import { get } from 'radash'
import React from 'react'
import { navigate } from 'wouter/use-browser-location'
import { signin } from '@/components/auth/signin'
import { auth } from '@/components/auth/state'
import { Form } from '@/components/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSchemaPatch, useUserState } from '@/hooks'
import { $qc } from '@/query-client'

export function PageLogin() {
  const { form, patch } = useSchemaPatch(vAdminLogin, { username: '', password: '' })
  const { refetch } = useUserState()
  const { isSignin } = auth.useSignin()

  React.useEffect(() => {
    if (isSignin) {
      navigate('/a', { replace: true })
    }
  }, [isSignin])

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <Card className="mx-auto w-[420px]">
        <CardHeader>
          <CardTitle className="text-2xl">
            {APP.appName}
            {' '}
            管理后台
          </CardTitle>
          <CardDescription>登录后处理咨询、博客和订阅。</CardDescription>
        </CardHeader>
        <CardContent>
          <Form.Form form={form} onChange={patch}>
            <Form.Input label="账号" name="username" placeholder="请输入账号" autoComplete="username" />
            <Form.Input label="密码" name="password" type="password" placeholder="请输入密码" autoComplete="current-password" />
          </Form.Form>
          <Form.Submit
            form={form}
            request={() => {
              const values = form.getValues()
              return $qc.admin.auth.login.$post.mutation({
                body: { username: values.username, password: values.password },
              })
            }}
            onSuccess={async (res) => {
              const meta = get(res, 'body.data') as { token: string, type: string } | undefined
              await signin(meta)
              await refetch()
              navigate('/a', { replace: true })
            }}
          >
            <Button className="mt-2 w-full">登录</Button>
          </Form.Submit>
        </CardContent>
      </Card>
    </div>
  )
}
