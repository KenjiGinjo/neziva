import { APP } from '@neziva/constants'
import { vAuthLoginByPassword } from '@neziva/validations'
import { get } from 'radash'
import React from 'react'
import { navigate } from 'wouter/use-browser-location'
import { signin } from '@/components/auth/signin'
import { auth } from '@/components/auth/state'
import { Form } from '@/components/form'
import { MainLayout } from '@/components/layout'
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
  const { form, dto, patch } = useSchemaPatch(vAuthLoginByPassword)
  const { refetch } = useUserState()

  const { isSignin } = auth.useSignin()

  React.useEffect(() => {
    if (isSignin) {
      navigate('/a', { replace: true })
    }
  }, [isSignin])

  return (
    <MainLayout className="flex h-screen w-full items-center justify-center bg-slate-50">
      <Card className="mx-auto w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">
            {`管理后台(${APP.appName})`}
          </CardTitle>
          <CardDescription>
            欢迎回来，祝您日进斗金，万事如意。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form.Form form={form} onChange={patch}>
            <Form.Input label="账号" name="username" placeholder="请输入账号" />
            <Form.Input label="密码" name="password" type="password" placeholder="请输入密码" />
          </Form.Form>
          <Form.Submit
            form={form}
            request={() => $qc.admin.auth.login.$post.mutation({ body: { username: dto.email, password: dto.password } })}
            onSuccess={async (res) => {
              const meta = get(res, 'body.meta', undefined)
              await signin(meta)
              await refetch()
              navigate('/a', { replace: true })
            }}
          >
            <Button disabled={!form.formState.isValid} className="w-full rounded-full mt-4 font-bold">
              确认登陆
            </Button>
          </Form.Submit>
        </CardContent>
      </Card>
    </MainLayout>
  )
}
