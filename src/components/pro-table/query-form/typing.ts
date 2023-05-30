import type { ExtractPropTypes, PropType } from '@vue/runtime-core'
import type { ProTableColumn } from '@/components/pro-table/typing'

export const queryFormProps: any = {
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => []
  },
  onSearch: {
    type: Function as PropType<(params?: string) => void>,
    default: undefined
  },
  onReset: {
    type: Function as PropType<(params?: string) => void>,
    default: undefined
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

export type QueryFormProps = ExtractPropTypes<typeof queryFormProps>
