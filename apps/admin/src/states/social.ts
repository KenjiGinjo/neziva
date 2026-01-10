import { observable } from '@legendapp/state'

interface State {
  countCollect: number
  countComment: number
  countLike: number
  countShare: number
  isCollect: boolean
  isLike: boolean
}

const defaultState: State = {
  countCollect: 0,
  countComment: 0,
  countLike: 0,
  countShare: 0,
  isCollect: false,
  isLike: false,
}

interface States {
  [key: string]: State
}

const $state = observable<States>({})

export const stateSocial = {
  set: ({ id, data }: { id: string, data: State }) => {
    if (data) {
      $state[id]?.set({
        countCollect: data.countCollect,
        countComment: data.countComment,
        countLike: data.countLike,
        countShare: data.countShare,
        isCollect: data.isCollect,
        isLike: data.isLike,
      })
    }
  },

  like: (id: string) => {
    $state[id]?.set(prev => ({ ...prev, countLike: prev.countLike + 1, isLike: true }))
  },

  unlike: (id: string) => {
    $state[id]?.set(prev => ({ ...prev, countLike: prev.countLike - 1, isLike: false }))
  },

  collect: (id: string) => {
    $state[id]?.set(prev => ({ ...prev, countCollect: prev.countCollect + 1, isCollect: true }))
  },

  uncollect: (id: string) => {
    $state[id]?.set(prev => ({ ...prev, countCollect: prev.countCollect - 1, isCollect: false }))
  },

  share: (id: string) => {
    $state[id]?.set(prev => ({ ...prev, countShare: prev.countShare + 1 }))
  },

  get: (id: string): State => {
    return $state[id]?.get() || defaultState
  },
}
