import type {
  ResAdminAuthStateResponse,
  ResAdminBlogPostList,
  ResAdminContactFormList,
  ResAdminLogin,
  ResAdminLogList,
  ResAdminNewsletterList,
  ResAuthMessage,
  ResBlogPostList,
  ResNewsletterSubscribe,
  ResPagination,
  ResSystemSetting,
} from '@neziva/interfaces'
import type {
  vAdminLogin,
  vBlogAdminPostsQuery,
  vBlogCreate,
  vBlogFeature,
  vBlogPostsQuery,
  vBlogPublish,
  vBlogRelated,
  vBlogSearch,
  vBlogUpdate,
  vContactFormNotes,
  vContactFormsQuery,
  vContactFormStatus,
  vContactSubmit,
  vLogsQuery,
  vNewsletterSubscribe,
  vNewsletterSubscribersQuery,
  vNewsletterSubscriberStatus,
} from '@neziva/validations'

import { initContract } from '@packages/ts-rest-react-query/ts-rest-core'

const c = initContract()
export const contract = {
  blog: {
    related: {
      ':id': c.router({
        $get: {
          method: 'GET',
          path: 'blog/related/:id',
          query: c.type<vBlogRelated>(),
          responses: { 200: c.type<{ data: any[] }>() },
        },
      }),
    },
    search: c.router({
      $get: {
        method: 'GET',
        path: 'blog/search',
        query: c.type<vBlogSearch>(),
        responses: {
          200: c.type<{
            data: ResBlogPostList[]
            query?: string
            pagination: ResPagination
          }>(),
        },
      },
    }),
    posts: c.router({
      ':id': c.router({
        $get: {
          method: 'GET',
          path: 'blog/posts/:id',
          query: c.type<undefined>(),
          responses: { 200: c.type<{ data: any }>() },
        },
      }),
      '$get': {
        method: 'GET',
        path: 'blog/posts',
        query: c.type<vBlogPostsQuery>(),
        responses: {
          200: c.type<{ data: ResBlogPostList[], pagination: ResPagination }>(),
        },
      },
    }),
  },
  contact: {
    submit: c.router({
      $post: {
        method: 'POST',
        path: 'contact/submit',
        query: c.type<undefined>(),
        body: c.type<vContactSubmit>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
  },
  newsletter: {
    subscribe: c.router({
      $post: {
        method: 'POST',
        path: 'newsletter/subscribe',
        query: c.type<undefined>(),
        body: c.type<vNewsletterSubscribe>(),
        responses: { 200: c.type<{ data: ResNewsletterSubscribe }>() },
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
    blog: {
      posts: c.router({
        ':id': c.router({
          feature: c.router({
            $put: {
              method: 'PUT',
              path: 'admin/blog/posts/:id/feature',
              query: c.type<undefined>(),
              body: c.type<vBlogFeature>(),
              responses: { 200: c.type<undefined>() },
            },
          }),
          publish: c.router({
            $put: {
              method: 'PUT',
              path: 'admin/blog/posts/:id/publish',
              query: c.type<undefined>(),
              body: c.type<vBlogPublish>(),
              responses: { 200: c.type<undefined>() },
            },
          }),
          $delete: {
            method: 'DELETE',
            path: 'admin/blog/posts/:id',
            query: c.type<undefined>(),
            body: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
          $get: {
            method: 'GET',
            path: 'admin/blog/posts/:id',
            query: c.type<undefined>(),
            responses: { 200: c.type<{ data: any }>() },
          },
          $put: {
            method: 'PUT',
            path: 'admin/blog/posts/:id',
            query: c.type<undefined>(),
            body: c.type<vBlogUpdate>(),
            responses: { 200: c.type<undefined>() },
          },
        }),
        '$get': {
          method: 'GET',
          path: 'admin/blog/posts',
          query: c.type<vBlogAdminPostsQuery>(),
          responses: {
            200: c.type<{
              data: ResAdminBlogPostList[]
              pagi: ResPagination
            }>(),
          },
        },
        '$post': {
          method: 'POST',
          path: 'admin/blog/posts',
          query: c.type<undefined>(),
          body: c.type<vBlogCreate>(),
          responses: { 200: c.type<{ data: { id: string } }>() },
        },
      }),
    },
    contact: {
      forms: c.router({
        ':id': c.router({
          $delete: {
            method: 'DELETE',
            path: 'admin/contact/forms/:id',
            query: c.type<undefined>(),
            body: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
          notes: c.router({
            $put: {
              method: 'PUT',
              path: 'admin/contact/forms/:id/notes',
              query: c.type<undefined>(),
              body: c.type<vContactFormNotes>(),
              responses: { 200: c.type<undefined>() },
            },
          }),
          status: c.router({
            $put: {
              method: 'PUT',
              path: 'admin/contact/forms/:id/status',
              query: c.type<undefined>(),
              body: c.type<vContactFormStatus>(),
              responses: { 200: c.type<undefined>() },
            },
          }),
          $get: {
            method: 'GET',
            path: 'admin/contact/forms/:id',
            query: c.type<undefined>(),
            responses: { 200: c.type<{ data: any }>() },
          },
        }),
        '$get': {
          method: 'GET',
          path: 'admin/contact/forms',
          query: c.type<vContactFormsQuery>(),
          responses: {
            200: c.type<{
              data: ResAdminContactFormList[]
              pagi: ResPagination
            }>(),
          },
        },
      }),
    },
    logs: c.router({
      $get: {
        method: 'GET',
        path: 'admin/logs',
        query: c.type<vLogsQuery>(),
        responses: {
          200: c.type<{ data: ResAdminLogList[], pagi: ResPagination }>(),
        },
      },
    }),
    newsletter: {
      subscribers: c.router({
        ':id': c.router({
          $delete: {
            method: 'DELETE',
            path: 'admin/newsletter/subscribers/:id',
            query: c.type<undefined>(),
            body: c.type<undefined>(),
            responses: { 200: c.type<undefined>() },
          },
          status: c.router({
            $put: {
              method: 'PUT',
              path: 'admin/newsletter/subscribers/:id/status',
              query: c.type<undefined>(),
              body: c.type<vNewsletterSubscriberStatus>(),
              responses: { 200: c.type<undefined>() },
            },
          }),
        }),
        '$get': {
          method: 'GET',
          path: 'admin/newsletter/subscribers',
          query: c.type<vNewsletterSubscribersQuery>(),
          responses: {
            200: c.type<{
              data: ResAdminNewsletterList[]
              pagi: ResPagination
            }>(),
          },
        },
      }),
    },
    stats: c.router({
      $get: {
        method: 'GET',
        path: 'admin/stats',
        query: c.type<undefined>(),
        responses: { 200: c.type<{ data: any }>() },
      },
    }),
  },
}
