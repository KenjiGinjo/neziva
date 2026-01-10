import type { AxiosError, AxiosResponse } from 'axios'
import { Exception } from '@neziva/tools/exception'
import { get } from 'radash'

function getErrors(response: AxiosResponse<unknown, any>, defaultValue: string): string {
  return get(response, 'data.detail', defaultValue)
}

export function normalizeError(error: AxiosError) {
  const response = error.response

  if (!response) {
    throw new Exception.Client.ServerErrorException('Internal Server Error, please try again later.')
  }

  if (response.status === 404) {
    throw new Exception.NotFoundException(getErrors(response, 'Resource not found'))
  }
  else if (response.status === 401) {
    throw new Exception.UnauthorizedException(getErrors(response, 'Account not logged in'))
  }
  else if (response.status === 403) {
    throw new Exception.ForbiddenException(getErrors(response, 'Access not authorized'))
  }
  else if (response.status === 400) {
    throw new Exception.BadRequestException(getErrors(response, 'Request parameter error'))
  }
  else if (response.status === 422) {
    throw new Exception.BadRequestException(getErrors(response, 'Request parameter error'))
  }
  else if (response.status >= 400 && response.status < 500) {
    throw new Exception.Client.ClientErrorException('Unknown client error')
  }
  else if (response.status === 503) {
    throw new Exception.Client.ServerErrorException(getErrors(response, 'Server is under maintenance'))
  }
  else if (response.status >= 500) {
    throw new Exception.Client.ServerErrorException('Unknown server error, please try again later.')
  }
  else {
    throw new Exception.Client.ClientErrorException('Unknown error, please try again later.')
  }
}
