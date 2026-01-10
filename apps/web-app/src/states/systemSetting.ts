import { observable } from '@legendapp/state'

interface SystemSettingState {
  data: any | null
}

const $state = observable<SystemSettingState>({
  data: null,
})

export const stateSystemSetting = {
  $state,

  setData: (data: any) => {
    $state.data.set(data)
  },

  getData: (): any | null => {
    return $state.data.get()
  },
}
