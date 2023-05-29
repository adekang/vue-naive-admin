import { SettingOutlined } from '@vicons/antd'
import { NButton, NIcon, NTooltip } from 'naive-ui'

const Setting = defineComponent({
  name: 'Setting',
  setup() {
    return () => {
      const tooltipSlots = {
        trigger: () => (
          <NButton text>
            <NIcon size={'18'} class={'cursor-pointer'}>
              <SettingOutlined />
            </NIcon>
          </NButton>
        )
      }

      return (
        <NTooltip v-slots={tooltipSlots}>
          <span>设置</span>
        </NTooltip>
      )
    }
  }
})

export default Setting
