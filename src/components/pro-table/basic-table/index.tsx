import { NDataTable, dataTableProps } from 'naive-ui'
import Toolbar from './components/toolbar'

const BasicTable = defineComponent({
  name: 'BasicTable',
  props: {
    ...dataTableProps
  },
  setup(props, { slots }) {
    const prefixCls = 'pro-table-basic-table'
    return () => {
      const tableSlots = {
        empty: slots.empty,
        loading: slots.loading
      }
      return (
        <div class={prefixCls}>
          <Toolbar />
          <NDataTable {...props} v-slots={tableSlots}></NDataTable>
        </div>
      )
    }
  }
})

export default BasicTable
