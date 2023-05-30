import type { ExtractPropTypes, PropType } from '@vue/runtime-core'
import type { ProTableColumn } from '@/components/pro-table/typing'

export const queryFormProps: any = {
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => []
  }
}

export type QueryFormProps = ExtractPropTypes<typeof queryFormProps>
