import { Exception } from '@neziva/tools/exception'
import { get } from 'radash'

function getErrors(response: any, defaultValue: string): string {
  return get(response, 'body.detail', defaultValue)
}

export function normalizeError(response: any) {
  if (!response) {
    throw new Exception.BadRequestException('网络错误')
  }

  const message = get(response.body, 'detail', '请求错误')

  if (response.status === 404) {
    throw new Exception.NotFoundException(getErrors(response, '资源不存在'))
  }
  else if (response.status === 401) {
    throw new Exception.UnauthorizedException(getErrors(response, '帐号未登录'))
  }
  else if (response.status === 403) {
    throw new Exception.ForbiddenException(getErrors(response, '访问未授权'))
  }
  else if (response.status === 400) {
    throw new Exception.BadRequestException(getErrors(response, message))
  }
  else if (response.status === 422) {
    throw new Exception.BadRequestException(getErrors(response, message))
  }
  else {
    throw new Exception.Server.InternalErrorException('很抱歉，发生了未知错误, 请保存截图联系技术支持')
  }
}
