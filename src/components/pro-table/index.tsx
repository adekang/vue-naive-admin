import { NEl } from 'naive-ui'
import BasicTable from './basic-table'
import QueryForm from './query-form'
import { ProTableProps } from './typing'
import './styles/index.less'

const ProTable = defineComponent({
  name: 'ProTable',
  props: {
    ...ProTableProps
  },
  setup(props, { slots }) {
    return () => {
      const basicTableSlots = {
        empty: slots.empty,
        loading: slots.loading
      }

      return (
        <NEl tag={'div'} class={'pro-table'}>
          <QueryForm />
          <BasicTable {...props} v-slots={basicTableSlots} />
        </NEl>
      )
    }
  }
})

export default ProTable
