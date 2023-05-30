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
  const collapsed = ref(false)
  const model = reactive({})
  const itemCols = computed(() => {
    if (!collapsed.value) {
      if (cols.value <= 1) return items.value.slice(0, 1)

      return items.value.slice(0, cols.value - 1)
    }
    return items.value
  })

  const restCol = computed(() => {
    if (cols.value <= 1) {
      return 1
    }
    const rest = itemCols.value.length % cols.value
    if (rest === 0) {
      return cols.value
    }
    return cols.value - rest
  })

  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }
  return {
    items,
    model,
    cols,
    domRef,
    itemCols,
    restCol,
    collapsed,
    toggleCollapsed
  }
}

export default useCols
