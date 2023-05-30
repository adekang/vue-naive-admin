import { NTree } from 'naive-ui'
import { useProTableState } from '@/components/pro-table/context'

const SettingBody = defineComponent({
  name: 'SettingBody',
  setup() {
    return () => {
      const state = useProTableState()
      const treeProps = {
        'onUpdate:checkedKeys': state.settingColumn?.handleCheckedKeys
      }
      return (
        <div class={'py-6px'}>
          <NTree
            {...treeProps}
            checkable
            selectable={false}
            checkedKeys={state.settingColumn?.checkedKeys?.value}
            data={state.settingColumn?.treeData?.value}
          ></NTree>
        </div>
      )
    }
  }
})

export default SettingBody
