import { useSettingColumn } from '@/components/pro-table/basic-table/compsables/seeting-column'
import type { ProTableProps } from '@/components/pro-table/typing'

const tableState = (props: ProTableProps) => {
  const columns = computed(() => props.columns)
  const options = computed(() => props.options)
  const settingColumn = useSettingColumn(props)
  return {
    columns,
    options,
    settingColumn
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
      settingColumn: {} as any
    }
  )
}
export { useProTableProvider }
