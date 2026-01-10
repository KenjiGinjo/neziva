import type {
  ResAdminAuthStateResponse,
  ResAdminDeleteUser,
  ResAdminExecutionList,
  ResAdminLogin,
  ResAdminLogList,
  ResAdminSettings,
  ResAdminStats,
  ResAdminUpdateUser,
  ResAdminUserList,
  ResAdminUserStats,
  ResAdminWorkflowList,
  ResAdminWorkflowStats,
  ResAuthMessage,
  ResAuthToken,
  ResCancelSubscription,
  ResChangePassword,
  ResCreateSubscription,
  ResCreateWorkflow,
  ResDeleteWorkflow,
  ResDuplicateWorkflow,
  ResExecutionLogs,
  ResInvoices,
  ResRunWorkflow,
  ResStopWorkflow,
  ResSubscription,
  ResSystemSetting,
  ResUpdateWorkflow,
  ResUsage,
  ResUserProfile,
  ResWorkflowExecutions,
  ResWorkflowList,
} from '@haole/interfaces'
import type {
  vAdminLogin,
  vAuthChangePassword,
  vAuthForgotPassword,
  vAuthLoginByGithub,
  vAuthLoginByGoogle,
  vAuthLoginByPassword,
  vAuthRegisterByEmail,
  vAuthResetPassword,
  vCreateSubscription,
  vCreateWorkflow,
  vRunWorkflow,
  vUpdateProfile,
  vUpdateSettings,
  vUpdateUser,
  vUpdateWorkflow,
} from '@haole/validations'
import { initContract } from '@packages/ts-rest-react-query/ts-rest-core'

const c = initContract()
export const contract = {
  auth: {
    'verify-email': c.router({
      $get: {
        method: 'GET',
        path: 'auth/verify-email',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAuthMessage }>() },
      },
    }),
    'login': c.router({
      github: c.router({
        $post: {
          method: 'POST',
          path: 'auth/login/github',
          query: c.type<undefined>(),
          body: c.type<vAuthLoginByGithub>(),
          responses: { 200: c.type<{ data: ResAuthToken }>() },
        },
      }),
      google: c.router({
        $post: {
          method: 'POST',
          path: 'auth/login/google',
          query: c.type<undefined>(),
          body: c.type<vAuthLoginByGoogle>(),
          responses: { 200: c.type<{ data: ResAuthToken }>() },
        },
      }),
      $post: {
        method: 'POST',
        path: 'auth/login',
        query: c.type<undefined>(),
        body: c.type<vAuthLoginByPassword>(),
        responses: { 200: c.type<{ data: ResAuthToken }>() },
      },
    }),
    'reset-password': c.router({
      $post: {
        method: 'POST',
        path: 'auth/reset-password',
        query: c.type<undefined>(),
        body: c.type<vAuthResetPassword>(),
        responses: { 200: c.type<{ data: ResAuthMessage }>() },
      },
    }),
    'forgot-password': c.router({
      $post: {
        method: 'POST',
        path: 'auth/forgot-password',
        query: c.type<undefined>(),
        body: c.type<vAuthForgotPassword>(),
        responses: { 200: c.type<{ data: ResAuthMessage }>() },
      },
    }),
    'logout': c.router({
      $post: {
        method: 'POST',
        path: 'auth/logout',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAuthMessage }>() },
      },
    }),
    'register': c.router({
      $post: {
        method: 'POST',
        path: 'auth/register',
        query: c.type<undefined>(),
        body: c.type<vAuthRegisterByEmail>(),
        responses: { 200: c.type<{ data: ResAuthToken }>() },
      },
    }),
  },
  billing: {
    invoices: c.router({
      $get: {
        method: 'GET',
        path: 'billing/invoices',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResInvoices }>() },
      },
    }),
    usage: c.router({
      $get: {
        method: 'GET',
        path: 'billing/usage',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResUsage }>() },
      },
    }),
    cancel: c.router({
      $post: {
        method: 'POST',
        path: 'billing/cancel',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResCancelSubscription }>() },
      },
    }),
    subscribe: c.router({
      $post: {
        method: 'POST',
        path: 'billing/subscribe',
        query: c.type<undefined>(),
        body: c.type<vCreateSubscription>(),
        responses: { 200: c.type<{ data: ResCreateSubscription }>() },
      },
    }),
    subscription: c.router({
      $get: {
        method: 'GET',
        path: 'billing/subscription',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResSubscription }>() },
      },
    }),
  },
  executions: {
    ':id': c.router({
      logs: c.router({
        $get: {
          method: 'GET',
          path: 'executions/:id/logs',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResExecutionLogs }>() },
        },
      }),
      $get: {
        method: 'GET',
        path: 'executions/:id',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: any }>() },
      },
    }),
  },
  system: {
    setting: c.router({
      $get: {
        method: 'GET',
        path: 'system/setting',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResSystemSetting }>() },
      },
    }),
  },
  upload: c.router({
    $post: {
      method: 'POST',
      path: 'upload',
      query: c.type<undefined>(),
      body: c.type<undefined>(),
      responses: { 200: c.type<{ data: string }>() },
    },
  }),
  user: {
    password: c.router({
      $put: {
        method: 'PUT',
        path: 'user/password',
        query: c.type<undefined>(),
        body: c.type<vAuthChangePassword>(),
        responses: { 200: c.type<{ data: ResChangePassword }>() },
      },
    }),
    profile: c.router({
      $put: {
        method: 'PUT',
        path: 'user/profile',
        query: c.type<undefined>(),
        body: c.type<vUpdateProfile>(),
        responses: { 200: c.type<{ data: any }>() },
      },
      $get: {
        method: 'GET',
        path: 'user/profile',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResUserProfile | null }>() },
      },
    }),
  },
  workflows: c.router({
    ':id': c.router({
      executions: c.router({
        $get: {
          method: 'GET',
          path: 'workflows/:id/executions',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResWorkflowExecutions }>() },
        },
      }),
      duplicate: c.router({
        $post: {
          method: 'POST',
          path: 'workflows/:id/duplicate',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResDuplicateWorkflow }>() },
        },
      }),
      stop: c.router({
        $post: {
          method: 'POST',
          path: 'workflows/:id/stop',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResStopWorkflow }>() },
        },
      }),
      run: c.router({
        $post: {
          method: 'POST',
          path: 'workflows/:id/run',
          query: c.type<undefined>(),
          body: c.type<vRunWorkflow>(),
          responses: { 200: c.type<{ data: ResRunWorkflow }>() },
        },
      }),
      $delete: {
        method: 'DELETE',
        path: 'workflows/:id',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResDeleteWorkflow }>() },
      },
      $put: {
        method: 'PUT',
        path: 'workflows/:id',
        query: c.type<undefined>(),
        body: c.type<vUpdateWorkflow>(),
        responses: { 200: c.type<{ data: ResUpdateWorkflow }>() },
      },
      $get: {
        method: 'GET',
        path: 'workflows/:id',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: any }>() },
      },
    }),
    '$post': {
      method: 'POST',
      path: 'workflows',
      query: c.type<undefined>(),
      body: c.type<vCreateWorkflow>(),
      responses: { 200: c.type<{ data: ResCreateWorkflow }>() },
    },
    '$get': {
      method: 'GET',
      path: 'workflows',
      query: c.type<undefined>(),
      responses: { 200: c.type<{ data: ResWorkflowList }>() },
    },
  }),
  admin: {
    auth: {
      state: c.router({
        $get: {
          method: 'GET',
          path: 'admin/auth/state',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAdminAuthStateResponse }>() },
        },
      }),
      logout: c.router({
        $post: {
          method: 'POST',
          path: 'admin/auth/logout',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAuthMessage }>() },
        },
      }),
      login: c.router({
        $post: {
          method: 'POST',
          path: 'admin/auth/login',
          query: c.type<undefined>(),
          body: c.type<vAdminLogin>(),
          responses: { 200: c.type<{ data: ResAdminLogin }>() },
        },
      }),
    },
    executions: c.router({
      ':id': c.router({
        $get: {
          method: 'GET',
          path: 'admin/executions/:id',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: any }>() },
        },
      }),
      '$get': {
        method: 'GET',
        path: 'admin/executions',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAdminExecutionList }>() },
      },
    }),
    logs: c.router({
      $get: {
        method: 'GET',
        path: 'admin/logs',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAdminLogList }>() },
      },
    }),
    settings: c.router({
      $put: {
        method: 'PUT',
        path: 'admin/settings',
        query: c.type<undefined>(),
        body: c.type<vUpdateSettings>(),
        responses: { 200: c.type<{ data: ResAdminSettings }>() },
      },
      $get: {
        method: 'GET',
        path: 'admin/settings',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: any }>() },
      },
    }),
    stats: c.router({
      $get: {
        method: 'GET',
        path: 'admin/stats',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAdminStats }>() },
      },
    }),
    users: c.router({
      'stats': c.router({
        $get: {
          method: 'GET',
          path: 'admin/users/stats',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAdminUserStats }>() },
        },
      }),
      ':id': c.router({
        $delete: {
          method: 'DELETE',
          path: 'admin/users/:id',
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAdminDeleteUser }>() },
        },
        $put: {
          method: 'PUT',
          path: 'admin/users/:id',
          query: c.type<undefined>(),
          body: c.type<vUpdateUser>(),
          responses: { 200: c.type<{ data: ResAdminUpdateUser }>() },
        },
        $get: {
          method: 'GET',
          path: 'admin/users/:id',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: any }>() },
        },
      }),
      '$get': {
        method: 'GET',
        path: 'admin/users',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAdminUserList }>() },
      },
    }),
    workflows: c.router({
      'stats': c.router({
        $get: {
          method: 'GET',
          path: 'admin/workflows/stats',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: ResAdminWorkflowStats }>() },
        },
      }),
      ':id': c.router({
        $get: {
          method: 'GET',
          path: 'admin/workflows/:id',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: any }>() },
        },
      }),
      '$get': {
        method: 'GET',
        path: 'admin/workflows',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: ResAdminWorkflowList }>() },
      },
    }),
  },
}
