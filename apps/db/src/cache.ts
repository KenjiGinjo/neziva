import { BentoCache, bentostore } from 'bentocache'
import { orchidDriver } from 'bentocache/drivers/orchid'
import { createDb } from 'orchid-orm/node-postgres'
import { ENV } from './env'

const cacheDb = createDb({ databaseURL: ENV.DATABASE_URL })

export const Cache = new BentoCache({
  default: 'cache',
  stores: {
    cache: bentostore().useL2Layer(
      orchidDriver({
        connection: cacheDb,
        tableName: '__cache',
      }),
    ),
  },
})
