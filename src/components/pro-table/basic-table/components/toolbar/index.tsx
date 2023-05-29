import { NSpace } from 'naive-ui'
import Reload from './Reload'
import Setting from './Setting'

const Toolbar = defineComponent({
  name: 'Toolbar',
  setup() {
    return () => {
      return (
        <div class={'flex justify-between pb-16px'}>
          <div class={'font-500 text-16px'}>高级表格</div>
          <div class={'flex justify-center'}>
            <NSpace>
              <Reload />
              <Setting />
            </NSpace>
          </div>
        </div>
      )
    }
  }
})

export default Toolbar
