import { BentoCache, bentostore } from 'bentocache'
import { orchidDriver } from 'bentocache/drivers/orchid'
import { createDb } from 'orchid-orm'
import { ENV } from './env'

export const Cache = new BentoCache({
  default: 'cache',
  stores: {
    cache: bentostore().useL2Layer(
      orchidDriver({
        connection: createDb({ databaseURL: ENV.DATABASE_URL }),
        tableName: '__cache',
      }),
    ),
  },
})
