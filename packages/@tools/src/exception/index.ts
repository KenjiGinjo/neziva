import { ERROR_CODE } from '@haole/constants'
import { BaseException } from './base'

class UnauthorizedException extends BaseException {
  public constructor(
    messages: unknown,
    code = ERROR_CODE.UnauthorizedException,
  ) {
    super(401, messages, code, 'Unauthorized')
  }
}

class ForbiddenException extends BaseException {
  public constructor(messages: unknown, code = ERROR_CODE.ForbiddenException) {
    super(403, messages, code, 'Forbidden')
  }
}

class BadRequestException extends BaseException {
  public constructor(messages: unknown, code = ERROR_CODE.BadRequestException) {
    super(400, messages, code, 'Bad Request')
  }
}

class NotFoundException extends BaseException {
  public constructor(messages: unknown, code = ERROR_CODE.NotFoundError) {
    super(404, messages, code, 'Not Found')
  }
}

class InternalErrorException extends BaseException {
  public constructor(
    messages: unknown,
    code = ERROR_CODE.InternalErrorException,
  ) {
    super(500, messages, code, 'Internal Server Error')
  }
}

export class ClientErrorException extends BaseException {
  public constructor(messages: unknown, code = ERROR_CODE.ClientErrorException) {
    super(400, messages, code, 'Client Error')
  }
}

export class ServerErrorException extends BaseException {
  public constructor(messages: unknown, code = ERROR_CODE.ServerErrorException) {
    super(500, messages, code, 'Server Error')
  }
}

export const Exception = {
  Client: {
    ClientErrorException,
    ServerErrorException,
  },
  Server: {
    InternalErrorException,
  },
  BaseException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
}
