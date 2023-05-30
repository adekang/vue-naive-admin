import type { PropType } from '@vue/runtime-core'
import type { SelectOption } from 'naive-ui'
import { NBadge, NSelect, NSpace, selectProps } from 'naive-ui'
import { proFormField } from './types'
import type { ProTableValueEnum } from '@/components/pro-table/typing'

const ProFormSelect = defineComponent({
  name: 'ProFormSelect',
  props: {
    ...selectProps,
    ...proFormField,
    valueEnum: {
      type: Object as PropType<Record<string | number, ProTableValueEnum>>,
      default: undefined
    }
  },
  setup(props) {
    const options = computed(() => {
      const opt: SelectOption[] = []
      for (const valueItem in props.valueEnum) {
        const val = props.valueEnum[valueItem]
        opt.push({
          label: val.label,
          value: valueItem,
          key: valueItem
        })
      }
      return opt
    })

    return () => {
      const { value, mode } = props
      if (mode === 'read') {
        const val = props.valueEnum?.[value]
        if (val) {
          const status = val?.status
          if (!status) {
            return <>{val.label}</>
          }
          // 处理有值的情况
          return (
            <NSpace>
              <NBadge type={status} dot={true} />
              {val.label}
            </NSpace>
          )
        }
        return <>{value}</>
      }
      return (
        <NSelect {...props} value={value} options={options.value}></NSelect>
      )
    }
  }
})

export default ProFormSelect
