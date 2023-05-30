import type { QueryFormProps } from '@/components/pro-table/query-form/typing'

const useCols = (props: QueryFormProps) => {
  // TODO
  const items = computed(() => {
    return props?.columns?.filter((item: { hideInSearch: boolean }) => {
      return !item.hideInSearch
    })
  })

  const model = reactive({})

  return {
    items,
    model
  }
}

export default useCols
