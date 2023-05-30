import type { ExtractPropTypes, PropType, VNodeChild } from '@vue/runtime-core'
import type { DataTableColumn } from 'naive-ui'
import { dataTableProps } from 'naive-ui'

export interface ProTableValueEnum {
  label: string | (() => VNodeChild)
  value: string | number
}

export type ProTableColumn = DataTableColumn & {
  valueType?: 'input' | 'select'
  valueEnum?: Record<string, ProTableValueEnum>
  key?: string
  title?: string
}

export interface ProTableOptions {
  reload?: boolean
  setting?: boolean
}

export const proTableProps = {
  ...dataTableProps,
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => []
  },
  options: {
    type: [Object, Boolean] as PropType<false | ProTableOptions>,
    default: () => ({
      reload: true,
      setting: true
    })
  }
}

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
