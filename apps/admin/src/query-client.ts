import { contract } from '@neziva/contracts'
import { createRequest } from '@packages/request'
import { initQueryClient } from '@packages/ts-rest-react-query'
import { config } from './config'

export const $qc = initQueryClient(contract, {
  baseUrl: '',
  baseHeaders: {},
  api: async (props) => {
    const { path, method, headers, body } = props

    const result = await createRequest({
      baseURL: config.baseURL.get(),
      tokenProvider: config.tokenProvider,
    }).request({
      method: method as any,
      url: path,
      headers,
      data: body,
    })

    return { status: 200, body: result, headers: result?.headers as any }
  },
})
