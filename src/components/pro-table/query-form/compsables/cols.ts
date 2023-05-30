import type { QueryFormProps } from '@/components/pro-table/query-form/typing'

const useCols = (props: QueryFormProps) => {
  const items = computed(() => {
    return props?.columns?.filter((item: { hideInSearch: boolean }) => {
      return !item.hideInSearch
    })
  })
  const domRef = ref<HTMLElement>()

  const { width } = useElementSize(domRef)
  const cols = computed(() => {
    if (width.value < 531) {
      return 1
    } else if (width.value < 1062) {
      return 2
    } else if (width.value < 1352) {
      return 3
    } else {
      return 4
    }
  })
  const model = reactive({})
  const itemCols = computed(() => {
    return items.value.slice(0, cols.value)
  })
  return {
    items,
    model,
    cols,
    domRef,
    itemCols
  }
}

export default useCols
