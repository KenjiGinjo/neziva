import { observable } from '@legendapp/state'
import { get } from 'radash'

type Event = 'unload' | 'didHide'

/**
 * format: `{ [event:path]: { [queryHash]: Function } }`
 */
const $queryListRemoves = observable<Record<string, Record<string, () => void>>>({})

export const stateQueryListRemoves = {
  add: ({
    event,
    path,
    queryHash,
    queryRemove,
  }: {
    event: Event
    path: string
    queryHash: string
    queryRemove: () => void
  }) => {
    const key = `${event}:${path}`
    const removes = get($queryListRemoves.get(), key, {});

    (removes as any)[queryHash] = queryRemove;
    ($queryListRemoves as any)[key].set(removes)

    console.warn('stateQueryListRemoves add: ', { key, queryHash })
  },

  run: ({ event, path }: { event: Event, path: string }) => {
    const key = `${event}:${path}`
    const removes = get($queryListRemoves.get(), key, {})

    for (const remove of Object.values(removes)) {
      if (typeof remove === 'function') {
        remove()
      }
    }
    ($queryListRemoves as any)[key].set({})

    console.warn('stateQueryListRemoves remove: ', { key, removes })
  },
}
