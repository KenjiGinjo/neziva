import type { ResAdminAuthState } from '@haole/interfaces'
import { observable } from '@legendapp/state'

interface UserState {
  data: ResAdminAuthState | null
}

const $state = observable<UserState>({
  data: null,
})

export const stateUser = {
  $state,

  setData: (data: ResAdminAuthState) => {
    $state.data.set(data)
  },

  getData: (): ResAdminAuthState | null => {
    return $state.data.get()
  },
}
