import { useSettingColumn } from '@/components/pro-table/basic-table/compsables/seeting-column'
import { useRequestState } from '@/components/pro-table/compsables/request-state'
import type { ProTableProps } from '@/components/pro-table/typing'

const tableState = (props: ProTableProps) => {
  const columns = computed(() => props.columns)
  const options = computed(() => props.options)
  const settingColumn = useSettingColumn(props)
  const requestState = useRequestState(props)
  return {
    columns,
    options,
    settingColumn,
    requestState
  }
}

const [useProTableProvider, useProTableInject] =
  createInjectionState(tableState)
export const useProTableState = (): ReturnType<typeof tableState> => {
  return (
    useProTableInject() ?? {
      columns: computed(() => []),
      options: computed(() => ({
        reload: true,
        setting: true
      })),
      settingColumn: {} as any,
      requestState: {} as any
    }
  )
}
export { useProTableProvider }
