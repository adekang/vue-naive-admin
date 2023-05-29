import { ReloadOutlined } from '@vicons/antd'
import { NButton, NIcon, NTooltip } from 'naive-ui'

const Reload = defineComponent({
  name: 'Reload',
  setup() {
    return () => {
      const tooltipSlots = {
        trigger: () => (
          <NButton text>
            <NIcon size={'18'} class={'cursor-pointer'}>
              <ReloadOutlined />
            </NIcon>
          </NButton>
        )
      }

      return (
        <NTooltip v-slots={tooltipSlots}>
          <span>刷新</span>
        </NTooltip>
      )
    }
  }
})

export default Reload
