import type { ProTableProps } from '@/components/pro-table/typing'

const tableState = (props: ProTableProps) => {
  const columns = computed(() => props.columns)
  const options = computed(() => props.options)
  return {
    columns,
    options
  }
}

const [useProTableProvider, useProTableInject] =
  createInjectionState(tableState)
export const useProTableState = () => {
  return (
    useProTableInject() ?? {
      columns: computed(() => []),
      options: computed(() => ({
        reload: true,
        setting: true
      }))
    }
  )
}
export { useProTableProvider }
