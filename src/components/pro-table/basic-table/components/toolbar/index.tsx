import { NSpace } from 'naive-ui'
import Reload from './Reload'
import Setting from './Setting'
import { useProTableState } from '@/components/pro-table/context'

const Toolbar = defineComponent({
  name: 'Toolbar',
  setup() {
    const { options } = useProTableState()
    const renderToolbar = () => {
      if (options.value === false) return null
      return (
        <NSpace>
          {options.value?.reload && <Reload />}
          {options.value?.setting && <Setting />}
        </NSpace>
      )
    }
    return () => {
      return (
        <div class={'flex justify-between pb-16px'}>
          <div class={'font-500 text-16px'}>高级表格</div>
          <div class={'flex justify-center'}>{renderToolbar()}</div>
        </div>
      )
    }
  }
})

export default Toolbar
