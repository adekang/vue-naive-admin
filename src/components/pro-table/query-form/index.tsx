import useCols from '@/components/pro-table/query-form/compsables/cols'
import { queryFormProps } from '@/components/pro-table/query-form/typing'

const QueryForm = defineComponent({
  name: 'QueryForm',
  props: {
    ...queryFormProps
  },
  setup(props) {
    const prefixCls = 'pro-table-query-form'
    const { items } = useCols(props)
    return () => {
      return (
        <div class={prefixCls}>
          <h1>{items}</h1>
        </div>
      )
    }
  }
})

export default QueryForm
