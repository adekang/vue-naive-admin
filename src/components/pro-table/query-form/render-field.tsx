import {
  ProFormInput,
  ProFormSelect
} from '@/components/pro-table/query-form/components'
import type { ProTableColumn } from '@/components/pro-table/typing'

export const renderField = (item: ProTableColumn, model: Record<any, any>) => {
  const commonProps = {
    value: model[item.key!],
    'onUpdate:value': (val: any) => {
      model[item.key!] = val
    },
    ...item.fieldProps
  }
  if (item.valueType === 'select') {
    return <ProFormSelect valueEnum={item.valueEnum} {...commonProps} />
  }
  return <ProFormInput {...commonProps} />
}
