import {
  ActivityA,
  City,
} from '@acme/interface'
import {
  ValidA,
  ValidD,
} from '@acme/validation'
import { initContract } from '@packages/ts-rest-react-query/ts-rest-core'
const c = initContract()
export const contract = {
  "activity": {
    "e": {
      ":eId": c.router({
        "$delete": {
          method: 'DELETE',
          path: 'activity/e/:eId',
          pathParams: c.type<{eId:string}>(),
          query: c.type<undefined>(),
          body: c.type<undefined>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    "d": c.router({
      "$post": {
        method: 'POST',
        path: 'activity/d',
        query: c.type<undefined>(),
        body: c.type<ValidD>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    "c": c.router({
      "$put": {
        method: 'PUT',
        path: 'activity/c',
        query: c.type<undefined>(),
        body: c.type<undefined>(),
        responses: { 200: c.type<undefined>() },
      },
    }),
    "b": {
      ":bId": c.router({
        "$patch": {
          method: 'PATCH',
          path: 'activity/b/:bId',
          pathParams: c.type<{bId:string}>(),
          query: c.type<undefined>(),
          body: c.type<ValidA>(),
          responses: { 200: c.type<undefined>() },
        },
      }),
    },
    "a": c.router({
      "$get": {
        method: 'GET',
        path: 'activity/a',
        query: c.type<{aId:string}>(),
        responses: { 200: c.type<{d:ActivityA[]}>() },
      },
    }),
  },
  "city": {
    "c": c.router({
      "$get": {
        method: 'GET',
        path: 'city/c',
        query: c.type<undefined>(),
        responses: { 200: c.type<{other:City[]}>() },
      },
    }),
    "b": c.router({
      "$get": {
        method: 'GET',
        path: 'city/b',
        query: c.type<undefined>(),
        responses: { 200: c.type<{meta:City[]}>() },
      },
    }),
    "a": c.router({
      "$get": {
        method: 'GET',
        path: 'city/a',
        query: c.type<undefined>(),
        responses: { 200: c.type<{data:City[]}>() },
      },
    }),
  },
}
