import { NEl } from 'naive-ui'
import BasicTable from './basic-table'
import QueryForm from './query-form'
import './styles/index.less'

const ProTable = defineComponent({
  name: 'ProTable',
  setup() {
    return () => {
      return (
        <NEl tag={'div'} class={'pro-table'}>
          <QueryForm />
          <BasicTable />
        </NEl>
      )
    }
  }
})

export default ProTable
