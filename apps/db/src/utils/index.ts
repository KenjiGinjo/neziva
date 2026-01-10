import type { OrchidOrmInternalError } from 'orchid-orm'
import { ERROR_CODE } from '@neziva/constants'
import { MoreThanOneRowError, QueryError } from 'orchid-orm'

export const du = {
  ErrorInstance: (error: OrchidOrmInternalError) => {
    if (error instanceof QueryError) {
      return ERROR_CODE.QueryError
    }
    else if (error instanceof MoreThanOneRowError) {
      return ERROR_CODE.MoreThanOneRowError
    }
    else {
      return ERROR_CODE.UnknownError
    }
  },
}
