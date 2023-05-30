import { NEl } from 'naive-ui'
import BasicTable from './basic-table'
import QueryForm from './query-form'
import { proTableProps } from './typing'
import { useProTableProvider } from '@/components/pro-table/context'
import './styles/index.less'

const ProTable = defineComponent({
  name: 'ProTable',
  props: {
    ...proTableProps
  },
  setup(props, { slots }) {
    const state = useProTableProvider(props)

    return () => {
      const basicTableSlots = {
        empty: slots.empty,
        loading: slots.loading
      }

      const pagination =
        state?.requestState?.formatPagination() ?? props?.pagination

      return (
        <NEl tag={'div'} class={'pro-table'}>
          <QueryForm columns={props.columns} />
          <BasicTable
            {...props}
            {...state?.requestState?.requestProps}
            v-slots={basicTableSlots}
            pagination={pagination}
          />
        </NEl>
      )
    }
  }
})

export default ProTable
