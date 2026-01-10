import type { AxiosResponse } from 'axios'

export function normalizeResponse(response: AxiosResponse) {
  return response.data
}
