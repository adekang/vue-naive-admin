import type { ProTableProps } from '../typing'

const useRequestState = (props: ProTableProps) => {
  const remote = computed(() => {
    if (props.request) return true
    return props.remote
  })

  const data = ref<Record<string, any>[]>([])
  const loading = ref(false)

  const handleRequest = async (params?: Record<string, any>) => {
    if (!props.request) return
    try {
      loading.value = true
      const { data: dataSource } = await props.request({
        ...props.params,
        ...params
      })
      data.value = dataSource
    } finally {
      loading.value = false
    }
  }
  if (props.manualRequest) {
    handleRequest().then(() => {})
  }

  const requestProps = reactive({
    remote,
    data: computed(() => {
      if (props.request) return data.value
      return props.data
    }),
    loading: computed(() => {
      if (props.request) return loading.value
      return props.loading
    })
  })
  return {
    requestProps,
    handleRequest
  }
}

export { useRequestState }
