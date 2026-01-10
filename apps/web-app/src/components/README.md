# 组件使用说明文档

本文档介绍项目中核心组件的使用方法，包括数据查询组件、表单组件、认证组件、请求组件等。

## 目录

- [组件使用说明文档](#组件使用说明文档)
  - [目录](#目录)
  - [数据查询组件](#数据查询组件)
    - [QueryData](#querydata)
      - [基本用法](#基本用法)
      - [Props](#props)
      - [示例](#示例)
    - [QueryList](#querylist)
      - [基本用法](#基本用法-1)
      - [Props](#props-1)
      - [示例](#示例-1)
    - [QueryPageData](#querypagedata)
      - [基本用法](#基本用法-2)
      - [Props](#props-2)
      - [特性](#特性)
      - [示例](#示例-2)
    - [QueryPageList](#querypagelist)
      - [基本用法](#基本用法-3)
      - [Props](#props-3)
      - [特性](#特性-1)
      - [示例](#示例-3)
  - [认证组件](#认证组件)
    - [auth.state](#authstate)
      - [基本用法](#基本用法-4)
      - [API](#api)
    - [signin / signout](#signin--signout)
      - [基本用法](#基本用法-5)
      - [API](#api-1)
  - [扩展组件](#扩展组件)
    - [Modal](#modal)
      - [基本用法](#基本用法-6)
      - [全局调用](#全局调用)
      - [API](#api-2)
    - [showModalAuth](#showmodalauth)
      - [基本用法](#基本用法-7)
      - [API](#api-3)
  - [表单组件](#表单组件)
    - [Form](#form)
      - [基本用法](#基本用法-8)
      - [表单字段组件](#表单字段组件)
        - [Form.Input](#forminput)
        - [Form.Textarea](#formtextarea)
        - [Form.Switch](#formswitch)
        - [Form.Radio](#formradio)
        - [Form.Image](#formimage)
        - [Form.Tags](#formtags)
        - [Form.InputStep](#forminputstep)
      - [Form.Submit](#formsubmit)
      - [Props](#props-4)
  - [守卫组件](#守卫组件)
    - [GuardAuthPage](#guardauthpage)
      - [基本用法](#基本用法-9)
      - [特性](#特性-2)
    - [GuardAuthAction](#guardauthaction)
      - [基本用法](#基本用法-10)
      - [特性](#特性-3)
    - [AuthSection](#authsection)
      - [基本用法](#基本用法-11)
      - [Props](#props-5)
  - [请求组件](#请求组件)
    - [Request](#request)
      - [基本用法](#基本用法-12)
      - [Props](#props-6)
      - [错误处理](#错误处理)
      - [示例](#示例-4)
    - [RequestCountDown](#requestcountdown)
      - [基本用法](#基本用法-13)
      - [Props](#props-7)
  - [最佳实践](#最佳实践)
    - [1. 数据查询组件选择](#1-数据查询组件选择)
    - [2. 缓存策略](#2-缓存策略)
    - [3. 错误处理](#3-错误处理)
    - [4. 表单验证](#4-表单验证)
    - [5. 认证守卫使用](#5-认证守卫使用)
  - [注意事项](#注意事项)
  - [相关文件](#相关文件)

---

## 数据查询组件

### QueryData

用于查询单个数据项的组件，自动处理加载状态和错误状态。

#### 基本用法

```tsx
import { QueryData } from '@/components/query-data'

<QueryData
  queryRoute={$qc.user.profile.$get}
  queryArgs={{ params: { id: '123' } }}
  renderData={data => (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  )}
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `queryRoute` | `QueryRoute` | 必填 | 查询路由对象，包含 `useQuery` 方法 |
| `queryArgs` | `TClientArgs` | 必填 | 查询参数 |
| `queryOptions` | `object` | `{}` | React Query 的查询选项 |
| `renderData` | `(data) => ReactNode` | 必填 | 数据渲染函数，接收响应体数据 |
| `hookRequested` | `(data) => void` | - | 数据请求成功后的回调函数 |
| `showLoadingOnFetching` | `boolean` | `false` | 是否在重新获取时也显示加载状态 |
| `refetchOnLoad` | `boolean` | `false` | 组件加载时是否重新获取数据 |
| `refetchOnPageVisible` | `boolean` | `false` | 页面可见时是否重新获取数据 |

#### 示例

```tsx
<QueryData
  queryRoute={$qc.product.detail.$get}
  queryArgs={{ params: { id: productId } }}
  queryOptions={SEMI_REALTIME_CACHE}
  showLoadingOnFetching={true}
  refetchOnPageVisible={true}
  hookRequested={(data) => {
    console.log('Product loaded:', data)
  }}
  renderData={data => (
    <ProductDetail product={data} />
  )}
/>
```

---

### QueryList

用于查询列表数据的组件，支持自定义包装器和空状态。

#### 基本用法

```tsx
import { Empty } from '@/components/empty'
import { QueryList } from '@/components/query-list'

<QueryList
  queryRoute={$qc.product.list.$get}
  queryArgs={{ query: { category: 'electronics' } }}
  renderWrapper={<div className="grid grid-cols-2 gap-4" />}
  renderItem={({ data }, index) => (
    <ProductCard key={data.id} product={data} />
  )}
  renderEmpty={<Empty.Icon message="No products found" />}
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `queryRoute` | `QueryRoute` | 必填 | 查询路由对象，包含 `useQuery` 和 `getQueryKey` 方法 |
| `queryArgs` | `TClientArgs` | 必填 | 查询参数 |
| `queryOptions` | `object` | `{}` | React Query 的查询选项 |
| `renderItem` | `(item, index) => ReactNode` | 必填 | 列表项渲染函数 |
| `renderProcessor` | `(items) => items` | `data => data` | 数据处理函数，用于过滤或转换数据 |
| `renderWrapper` | `ReactElement` | `<div />` | 列表包装器元素 |
| `renderEmpty` | `ReactElement` | 必填 | 空状态渲染元素 |
| `hookRequested` | `(data) => void` | - | 数据请求成功后的回调函数 |
| `showLoadingOnFetching` | `boolean` | `false` | 是否在重新获取时也显示加载状态 |
| `refetchOnLoad` | `boolean` | `false` | 组件加载时是否重新获取数据 |
| `refetchOnPageVisible` | `boolean` | `false` | 页面可见时是否重新获取数据 |

#### 示例

```tsx
<QueryList
  queryRoute={$qc.figurine['page-list'].$get}
  queryArgs={{
    query: {
      orderBy: 'latest',
      tags: selectedTags,
    },
  }}
  queryOptions={LIST_CACHE}
  renderWrapper={
    <div className="flex gap-2 overflow-x-scroll p-4" style={{ scrollbarWidth: 'none' }} />
  }
  renderProcessor={(items) => {
    // 过滤掉已售罄的商品
    return items.filter(item => item.stock > 0)
  }}
  renderItem={({ data }, index) => (
    <div key={data.id} className="shrink-0 w-[240px]">
      <FigurineCard data={data} />
    </div>
  )}
  renderEmpty={<Empty.Icon message="No figurines available" />}
  refetchOnLoad={true}
/>
```

---

### QueryPageData

用于分页查询数据的组件，支持无限滚动加载更多数据。

#### 基本用法

```tsx
import { QueryPageData } from '@/components/query-page-data'

<QueryPageData
  queryRoute={$qc.product['page-list'].$get}
  queryArgs={{ query: { category: 'electronics' } }}
  renderData={({ data, page }) => (
    <div>
      <p>
        Total items:
        {data.length}
      </p>
      <p>
        Pages loaded:
        {page.params.length}
      </p>
      {data.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )}
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `queryRoute` | `QueryRoute` | 必填 | 查询路由对象，包含 `useInfiniteQuery` 和 `getQueryKey` 方法 |
| `queryArgs` | `TClientArgs` | 必填 | 查询参数（会自动添加 `page` 参数） |
| `queryOptions` | `object` | `{}` | React Query 的无限查询选项 |
| `renderData` | `({ data, page }) => ReactNode` | 必填 | 数据渲染函数，接收所有页面的数据和页码信息 |
| `hookRequested` | `(data) => void` | - | 数据请求成功后的回调函数 |
| `showLoadingOnFetching` | `boolean` | `false` | 是否在重新获取时也显示加载状态 |
| `refetchOnLoad` | `boolean` | `false` | 组件加载时是否重新获取数据 |
| `refetchOnPageVisible` | `boolean` | `false` | 页面可见时是否重新获取数据 |
| `removeOnUnload` | `boolean` | `false` | 退出页面时是否清空查询缓存 |
| `removeOnDidHide` | `boolean` | `false` | 进入子页面时是否清空查询缓存 |

#### 特性

- **自动分页**: 组件会自动处理分页逻辑，从第 1 页开始
- **无限滚动**: 当用户滚动到底部时，自动加载下一页
- **缓存管理**: 支持在页面卸载或隐藏时清空缓存，避免重新打开页面时请求多个页面

#### 示例

```tsx
<QueryPageData
  queryRoute={$qc.product['page-list'].$get}
  queryArgs={{
    query: {
      category: 'electronics',
      minPrice: 100,
    },
  }}
  queryOptions={SEMI_REALTIME_CACHE}
  showLoadingOnFetching={true}
  removeOnUnload={true}
  renderData={({ data, page }) => (
    <div className="space-y-4">
      {data.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )}
/>
```

---

### QueryPageList

用于分页查询列表数据的组件，支持无限滚动和自定义包装器。

#### 基本用法

```tsx
import { Empty } from '@/components/empty'
import { QueryPageList } from '@/components/query-page-list'

<QueryPageList
  queryRoute={$qc.figurine['page-list'].$get}
  queryArgs={{ query: { orderBy: 'latest' } }}
  renderWrapper={<div className="grid grid-cols-2 gap-2 mt-4" />}
  renderItem={({ data }, index) => (
    <FigurineCard key={data.id} data={data} />
  )}
  renderEmpty={<Empty.Icon message="No figurines found" />}
/>
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `queryRoute` | `QueryRoute` | 必填 | 查询路由对象，包含 `useInfiniteQuery` 和 `getQueryKey` 方法 |
| `queryArgs` | `TClientArgs` | 必填 | 查询参数（会自动添加 `page` 参数） |
| `queryOptions` | `object` | `{}` | React Query 的无限查询选项 |
| `renderItem` | `({ data, index }) => ReactNode` | 必填 | 列表项渲染函数 |
| `renderProcessor` | `(items) => items` | `data => data` | 数据处理函数，用于过滤或转换数据 |
| `renderWrapper` | `ReactElement` | `<div />` | 列表包装器元素 |
| `renderEmpty` | `ReactElement` | 必填 | 空状态渲染元素 |
| `hookRequested` | `(data) => void` | - | 数据请求成功后的回调函数 |
| `showLoadingOnFetching` | `boolean` | `false` | 是否在重新获取时也显示加载状态（滚动加载时不会生效） |
| `refetchOnLoad` | `boolean` | `false` | 组件加载时是否重新获取数据 |
| `refetchOnPageVisible` | `boolean` | `false` | 页面可见时是否重新获取数据 |
| `removeOnUnload` | `boolean` | `false` | 退出页面时是否清空查询缓存 |
| `removeOnDidHide` | `boolean` | `false` | 进入子页面时是否清空查询缓存 |

#### 特性

- **自动分页**: 组件会自动处理分页逻辑，从第 1 页开始
- **无限滚动**: 当用户滚动到底部时，自动加载下一页
- **加载提示**: 在列表底部显示加载状态和结束提示
- **缓存管理**: 支持在页面卸载或隐藏时清空缓存

#### 示例

```tsx
<QueryPageList
  queryRoute={$qc.figurine['page-list'].$get}
  queryArgs={{
    query: {
      orderBy: 'latest',
      name: searchKeyword,
      tags: selectedTags,
    },
  }}
  queryOptions={SEMI_REALTIME_CACHE}
  renderWrapper={<div className="grid grid-cols-2 gap-2 mt-4" />}
  renderProcessor={(items) => {
    // 过滤掉已售罄的商品
    return items.filter(item => item.stock > 0)
  }}
  renderItem={({ data }, index) => (
    <FigurineCard key={data.id} data={data} />
  )}
  renderEmpty={<Empty.Icon message="No figurines found" />}
  refetchOnLoad={true}
  removeOnUnload={true}
/>
```

---

## 认证组件

### auth.state

认证状态管理，提供登录状态和 Token 管理。

#### 基本用法

```tsx
import { auth } from '@/components/auth/state'

function MyComponent() {
  const { isLoading, isSignin, token } = auth.useSignin()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSignin) {
    return (
      <div>
        Welcome! Token:
        {token}
      </div>
    )
  }

  return <div>Please login</div>
}
```

#### API

- `auth.useSignin()`: Hook，返回 `{ isLoading, isSignin, token }`
- `auth.setToken(token: string)`: 设置 Token
- `auth.setIsSignin(isSignin: boolean)`: 设置登录状态

---

### signin / signout

登录和登出功能。

#### 基本用法

```tsx
import { signin, signout } from '@/components/auth/signin'

// 登录
await signin({
  token: 'your-token-here',
  type: 'bearer',
})

// 登出
await signout()
```

#### API

- `signin(meta?: { token: string, type: string })`: 登录，保存 Token 到 localStorage
- `signout()`: 登出，清除 Token 和登录状态
- `getStorageToken()`: 从 localStorage 获取 Token

---

## 扩展组件

### Modal

全局模态框组件，提供确认对话框功能。

#### 基本用法

```tsx
import { ModalProvider, useModal } from '@/components/extend/modal'

// 在应用根组件中提供 Provider
function App() {
  return (
    <ModalProvider>
      <YourApp />
    </ModalProvider>
  )
}

// 在组件中使用
function MyComponent() {
  const { showModal } = useModal()

  const handleClick = async () => {
    const confirmed = await showModal({
      title: 'Confirm Action',
      description: 'Are you sure you want to delete this item?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        console.log('Confirmed')
      },
    })

    if (confirmed) {
      // 执行操作
    }
  }

  return <button onClick={handleClick}>Delete</button>
}
```

#### 全局调用

```tsx
import { showModal } from '@/components/extend/modal'

// 在任何地方调用（需要先初始化 ModalProvider）
const confirmed = await showModal({
  title: 'System Message',
  description: 'Operation completed successfully',
  showCancel: false,
  confirmText: 'OK',
})
```

#### API

- `showModal(options: ModalOptions): Promise<boolean>`: 显示模态框，返回用户是否确认
- `ModalOptions`:
  - `title?: string`: 标题
  - `description?: string | ReactNode`: 描述内容
  - `confirmText?: string`: 确认按钮文本
  - `cancelText?: string`: 取消按钮文本
  - `showCancel?: boolean`: 是否显示取消按钮
  - `onConfirm?: () => void`: 确认回调
  - `onCancel?: () => void`: 取消回调

---

### showModalAuth

显示需要登录的提示模态框。

#### 基本用法

```tsx
import { showModalAuth } from '@/components/extend'

function MyComponent() {
  const handleAction = () => {
    if (!isSignin) {
      showModalAuth({
        description: 'You need to be logged in to access this feature.',
      })
    }

    // 执行需要登录的操作
  }

  return <button onClick={handleAction}>Action</button>
}
```

#### API

- `showModalAuth(options?: { description?: string })`: 显示登录提示模态框，点击确认会跳转到登录页面

---

## 表单组件

### Form

基于 React Hook Form 的表单组件系统。

#### 基本用法

```tsx
import { useForm } from 'react-hook-form'
import { Form } from '@/components/form'

interface FormData {
  name: string
  email: string
  age: number
}

function MyForm() {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      age: 0,
    },
  })

  return (
    <Form.Form form={form}>
      <Form.Input
        name="name"
        label="Name"
        placeholder="Enter your name"
      />
      <Form.Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      <Form.Input
        name="age"
        label="Age"
        type="number"
      />
      <Form.Submit
        form={form}
        request={async () => {
          const values = form.getValues()
          // 提交表单
          await api.submit(values)
        }}
        onSuccess={() => {
          console.log('Form submitted successfully')
        }}
      >
        <button>Submit</button>
      </Form.Submit>
    </Form.Form>
  )
}
```

#### 表单字段组件

所有表单字段组件都支持以下通用属性：

- `name`: 字段名称（必填）
- `label`: 标签文本
- `desc`: 描述文本
- `className`: 自定义样式类
- `wrapperClassName`: 包装器样式类

##### Form.Input

文本输入框。

```tsx
<Form.Input
  name="username"
  label="Username"
  placeholder="Enter username"
  type="text"
/>
```

##### Form.Textarea

多行文本输入框。

```tsx
<Form.Textarea
  name="description"
  label="Description"
  placeholder="Enter description"
  rows={5}
/>
```

##### Form.Switch

开关组件。

```tsx
<Form.Switch
  name="notifications"
  label="Enable Notifications"
/>
```

##### Form.Radio

单选按钮组。

```tsx
<Form.Radio
  name="gender"
  label="Gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ]}
/>
```

##### Form.Image

图片上传组件。

```tsx
<Form.Image
  name="avatar"
  label="Avatar"
  maxSize={5 * 1024 * 1024} // 5MB
  accept="image/*"
/>
```

##### Form.Tags

标签选择组件。

```tsx
<Form.Tags
  name="tags"
  label="Tags"
  options={['tag1', 'tag2', 'tag3']}
/>
```

##### Form.InputStep

步进输入组件。

```tsx
<Form.InputStep
  name="quantity"
  label="Quantity"
  min={1}
  max={100}
  step={1}
/>
```

#### Form.Submit

表单提交按钮，自动处理表单验证和请求。

```tsx
<Form.Submit
  form={form}
  request={async () => {
    const values = form.getValues()
    return await api.submit(values)
  }}
  onSuccess={(data) => {
    console.log('Success:', data)
  }}
  showLoading={true}
  showModal={true}
  showModalOption={{
    title: 'Confirm Submit',
    description: 'Are you sure you want to submit?',
  }}
>
  <button>Submit</button>
</Form.Submit>
```

#### Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `form` | `UseFormReturn` | React Hook Form 的 form 对象 |
| `request` | `() => Promise<unknown>` | 提交请求函数 |
| `onSuccess` | `(data) => void` | 成功回调 |
| `showLoading` | `boolean` | 是否显示加载状态（默认 `true`） |
| 其他 `Request` 组件的属性 | - | 支持所有 `Request` 组件的属性 |

---

## 守卫组件

### GuardAuthPage

页面级认证守卫，未登录时显示登录提示页面。

#### 基本用法

```tsx
import { GuardAuthPage } from '@/components/guard'

function ProtectedPage() {
  return (
    <GuardAuthPage>
      <div>This is a protected page</div>
    </GuardAuthPage>
  )
}
```

#### 特性

- 自动检查登录状态
- 未登录时显示 `AuthSection` 组件
- 加载中时显示加载状态

---

### GuardAuthAction

操作级认证守卫，未登录时拦截操作并提示登录。

#### 基本用法

```tsx
import { GuardAuthAction } from '@/components/guard'

function MyComponent() {
  const handleLike = () => {
    // 执行点赞操作
  }

  return (
    <GuardAuthAction onClick={handleLike}>
      <button>Like</button>
    </GuardAuthAction>
  )
}
```

#### 特性

- 已登录时正常执行操作
- 未登录时拦截操作并显示登录提示
- 支持自定义点击处理函数

---

### AuthSection

登录提示页面组件。

#### 基本用法

```tsx
import { AuthSection } from '@/components/guard'

function MyPage() {
  return (
    <AuthSection message="This page requires login" />
  )
}
```

#### Props

- `message?: string`: 提示消息（默认: "Current page requires login to access"）

---

## 请求组件

### Request

通用的请求处理组件，自动处理加载状态、错误处理和认证。

#### 基本用法

```tsx
import { Request } from '@/components/request'

function MyComponent() {
  return (
    <Request
      request={async () => {
        return await api.deleteItem(itemId)
      }}
      onSuccess={() => {
        console.log('Item deleted')
      }}
      showLoading={true}
      showModal={true}
      showModalOption={{
        title: 'Confirm Delete',
        description: 'Are you sure you want to delete this item?',
      }}
    >
      <button>Delete</button>
    </Request>
  )
}
```

#### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `authGuard` | `boolean` | `false` | 是否需要认证守卫 |
| `showModal` | `boolean` | `false` | 是否在请求前显示确认模态框 |
| `showModalOption` | `object` | - | 模态框选项 |
| `showLoading` | `boolean` | `false` | 是否显示加载提示（Toast） |
| `showLoadingOption` | `object` | - | 加载提示选项 |
| `showBaseLoading` | `boolean` | `false` | 是否显示基础加载状态（替换子元素） |
| `showBaseLoadingProps` | `LoadingProps` | - | 基础加载组件属性 |
| `onBeforeRequest` | `() => boolean \| Promise<boolean>` | - | 请求前的拦截函数，返回 `false` 可取消请求 |
| `request` | `() => Promise<unknown>` | 必填 | 请求函数 |
| `onSuccess` | `(data) => void` | - | 成功回调 |
| `onErrorHandle` | `(e) => ErrorHandler` | - | 错误处理函数 |
| `onErrorBaseException` | `(e) => ErrorHandler` | - | 基础异常处理函数 |
| `extraAwait` | `boolean` | `true` | 是否在请求前额外等待（iOS 兼容性） |

#### 错误处理

组件会自动处理以下错误：

- `UnauthorizedException`: 显示登录提示
- `BaseException`: 显示错误消息
- 其他错误: 显示通用错误提示

#### 示例

```tsx
<Request
  authGuard={true}
  showModal={true}
  showModalOption={{
    title: 'Confirm Action',
    description: 'This action cannot be undone',
  }}
  showLoading={true}
  showLoadingOption={{
    title: 'Processing...',
    description: 'Please wait',
  }}
  onBeforeRequest={async () => {
    // 执行前置检查
    if (!canProceed) {
      return false
    }
    return true
  }}
  request={async () => {
    return await api.performAction()
  }}
  onSuccess={(data) => {
    toast.success('Action completed')
    navigate('/success')
  }}
  onErrorHandle={async (e) => {
    // 自定义错误处理
    if (e instanceof CustomError) {
      // 处理自定义错误
      return RequestSymbol.CancelErrorHandle // 取消默认错误处理
    }
  }}
>
  <button>Perform Action</button>
</Request>
```

---

### RequestCountDown

带倒计时的请求组件，常用于发送验证码等场景。

#### 基本用法

```tsx
import { RequestCountDown } from '@/components/request'

function MyComponent() {
  return (
    <RequestCountDown
      countdown={60}
      request={async () => {
        return await api.sendVerificationCode()
      }}
      onSuccess={() => {
        toast.success('Verification code sent')
      }}
    >
      {({ isCounting, countdownLeft }) => (
        <button disabled={isCounting}>
          {isCounting ? `Resend in ${countdownLeft}s` : 'Send Code'}
        </button>
      )}
    </RequestCountDown>
  )
}
```

#### Props

继承 `Request` 组件的所有属性，额外提供：

- `countdown: number`: 倒计时秒数（默认 60）
- `children: ({ isCounting, countdownLeft }) => ReactNode`: 渲染函数，接收倒计时状态

---

## 最佳实践

### 1. 数据查询组件选择

- **QueryData**: 用于查询单个数据项（如用户详情、商品详情）
- **QueryList**: 用于查询固定列表（如首页推荐列表）
- **QueryPageData**: 用于分页数据，需要自定义渲染逻辑
- **QueryPageList**: 用于分页列表，需要列表项渲染

### 2. 缓存策略

```tsx
// 实时数据
const REALTIME_CACHE = {
  staleTime: 0,
  cacheTime: 0,
}

// 半实时数据
const SEMI_REALTIME_CACHE = {
  staleTime: 30 * 1000, // 30秒
  cacheTime: 5 * 60 * 1000, // 5分钟
}

// 列表数据
const LIST_CACHE = {
  staleTime: 60 * 1000, // 1分钟
  cacheTime: 10 * 60 * 1000, // 10分钟
}
```

### 3. 错误处理

```tsx
// 在 Request 组件中自定义错误处理
<Request
  request={async () => {
    return await api.action()
  }}
  onErrorHandle={async (e) => {
    if (e instanceof CustomException) {
      // 处理自定义异常
      showModal({
        title: 'Custom Error',
        description: e.message,
      })
      return RequestSymbol.CancelErrorHandle // 取消默认处理
    }
  }}
/>
```

### 4. 表单验证

```tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

### 5. 认证守卫使用

```tsx
// 页面级守卫
<GuardAuthPage>
  <ProtectedContent />
</GuardAuthPage>

// 操作级守卫
<GuardAuthAction>
  <button onClick={handleAction}>Action</button>
</GuardAuthAction>
```

---

## 注意事项

1. **QueryPageList 和 QueryPageData**: 使用无限滚动时，`showLoadingOnFetching` 在滚动加载时不会生效，避免页面自动滚动到顶部。

2. **缓存清理**: `removeOnUnload` 和 `removeOnDidHide` 用于在页面卸载或隐藏时清理缓存，避免重新打开页面时请求多个页面。

3. **表单提交**: `Form.Submit` 会自动进行表单验证，验证失败时会显示错误提示。

4. **请求组件**: `Request` 组件会自动处理错误，包括未授权错误，无需手动处理。

5. **Modal Provider**: 使用 `showModal` 全局函数前，必须先在应用根组件中提供 `ModalProvider`。

---

## 相关文件

- 数据查询组件: `apps/web-app/src/components/query-*.tsx`
- 认证组件: `apps/web-app/src/components/auth/`
- 扩展组件: `apps/web-app/src/components/extend/`
- 表单组件: `apps/web-app/src/components/form/`
- 守卫组件: `apps/web-app/src/components/guard/`
- 请求组件: `apps/web-app/src/components/request/`
