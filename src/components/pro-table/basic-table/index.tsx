import { NDataTable, dataTableProps } from 'naive-ui'
import Toolbar from './components/toolbar'
import { useProTableState } from '@/components/pro-table/context'

const BasicTable = defineComponent({
  name: 'BasicTable',
  props: {
    ...dataTableProps
  },
  setup(props, { slots }) {
    const prefixCls = 'pro-table-basic-table'
    const state = useProTableState()
    return () => {
      const tableSlots = {
        empty: slots.empty,
        loading: slots.loading
      }
      return (
        <div class={prefixCls}>
          <Toolbar />
          <NDataTable
            {...props}
            columns={state.settingColumn?.cols?.value}
            v-slots={tableSlots}
          ></NDataTable>
        </div>
      )
    }
  }
})

export default BasicTable
