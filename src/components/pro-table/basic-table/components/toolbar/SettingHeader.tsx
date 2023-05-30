import { NButton, NCheckbox } from 'naive-ui'
import { useProTableState } from '@/components/pro-table/context'

const SettingHeader = defineComponent({
  name: 'SettingHeader',
  setup() {
    return () => {
      const state = useProTableState()
      const checkboxProps = {
        'onUpdate:checked': state.settingColumn?.handleCheckedAll
      }
      return (
        <div class={'flex justify-between w-240px py-6px px-24px'}>
          <div>
            <NCheckbox
              {...checkboxProps}
              checked={state.settingColumn?.isAllChecked?.value}
              indeterminate={state.settingColumn?.indeterminate?.value}
            ></NCheckbox>
            <span class={'ml-6px'}>列展示</span>
          </div>
          <NButton text type={'primary'} onClick={state?.settingColumn?.init}>
            重置
          </NButton>
        </div>
      )
    }
  }
})

export default SettingHeader
