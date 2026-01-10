import { useEffect } from 'react'
import { $qc } from '@/query-client'
import { stateSystemSetting } from '@/states'

export function useSystemSetting() {
  const { data, refetch } = $qc.system.setting.$get.useQuery()
  const _data = data?.body.data

  useEffect(() => {
    if (_data) {
      stateSystemSetting.setData(_data)
    }
  }, [_data])

  return { refetch }
}

export function SystemSetting() {
  useSystemSetting()

  return null
}
