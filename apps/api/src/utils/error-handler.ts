import type { ErrorHandler } from 'hono'
import { ERROR_CODE } from '@neziva/constants'
import { EnumErrorLogType } from '@neziva/enums'
import { Exception } from '@neziva/tools/exception'
import { db, du, NotFoundError, OrchidOrmInternalError } from 'db'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

export const errorHandler: ErrorHandler = async (e, c) => {
  if (e instanceof HTTPException) {
    if (e.status === 404) {
      return c.text('404 Not Found', 404)
    }
    return c.json(
      {
        code: ERROR_CODE.HonoHTTPExceptionError,
        detail: e.message,
        title: 'Bad Request',
        status: e.status.toString(),
      },
      e.status,
    )
  }
  else if (e instanceof ZodError) {
    const flattenError = e.flatten()
    const fieldErrorMessages = Object.entries(flattenError.fieldErrors)
      .map(([field, messages]) => {
        if (messages && Array.isArray(messages)) {
          return `error in field [${field}]: ${messages.join(', ')}`
        }
        return null
      })
      .filter(Boolean)

    return c.json(
      {
        code: ERROR_CODE.ZodValidationError,
        detail:
          flattenError.formErrors[0]
          || fieldErrorMessages[0]
          || 'validate error',
        title: 'Bad Request',
        status: '400',
      },
      400,
    )
  }
  else if (e instanceof Exception.BaseException) {
    if (e instanceof Exception.UnauthorizedException) {
      // TODO: more things to do
    }

    return c.json(
      {
        code: e.code,
        detail: e.message,
        title: e.title,
        status: e.status.toString(),
      },
      e.status as 400,
    )
  }
  else if (e instanceof NotFoundError) {
    return c.json(
      {
        code: ERROR_CODE.NotFoundError,
        detail: `${e.message}`,
        title: 'Not Found',
        status: '404',
      },
      404,
    )
  }
  else if (e instanceof OrchidOrmInternalError) {
    await db.errorLog.create({
      type: EnumErrorLogType.DatabaseError,
      code: du.ErrorInstance(e),
      detail: e.message,
      path: c.req.path,
      method: c.req.method,
      body: await c.req.json(),
      headers: c.req.header(),
      stack: e.stack,
    })
  }
  else if (e instanceof TypeError) {
    await db.errorLog.create({
      type: EnumErrorLogType.ApplicationError,
      code: ERROR_CODE.TypeError,
      detail: e.message,
      path: c.req.path,
      method: c.req.method,
      body: await c.req.json(),
      headers: c.req.header(),
      stack: e.stack,
    })
  }
  await db.errorLog.create({
    type: EnumErrorLogType.ApplicationError,
    code: ERROR_CODE.UnknownError,
    detail: e.message,
    path: c.req.path,
    method: c.req.method,
    body: await c.req.json(),
    headers: c.req.header(),
    stack: e.stack,
  })
  console.error(e)

  return c.text('Internal Server Error', 500)
}
