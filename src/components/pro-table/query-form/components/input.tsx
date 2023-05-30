import { NInput, inputProps } from 'naive-ui'
import { proFormField } from './types'

const ProFormInput = defineComponent({
  name: 'ProFormInput',
  props: {
    ...inputProps,
    ...proFormField
  },
  setup(props) {
    return () => {
      const { value, mode, ...restProps } = props
      if (mode === 'read') {
        return value
      }
      return <NInput {...restProps} value={value}></NInput>
    }
  }
})

export default ProFormInput
