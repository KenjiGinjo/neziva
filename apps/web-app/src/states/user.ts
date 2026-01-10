import type { ResUserProfile } from '@haole/interfaces'
import { observable } from '@legendapp/state'

interface UserState {
  data: ResUserProfile | null
}

const $state = observable<UserState>({
  data: null,
})

export const stateUser = {
  $state,

  setData: (data: ResUserProfile) => {
    $state.data.set(data)
  },

  getData: (): ResUserProfile | null => {
    return $state.data.get()
  },
}
