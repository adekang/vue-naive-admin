import { NForm, NFormItemGi, NGrid } from 'naive-ui'
import type { ProTableColumn } from '../typing'
import { renderField } from '@/components/pro-table/query-form/render-field'
import useCols from '@/components/pro-table/query-form/compsables/cols'
import { queryFormProps } from '@/components/pro-table/query-form/typing'

const QueryForm = defineComponent({
  name: 'QueryForm',
  props: {
    ...queryFormProps
  },
  setup(props) {
    const prefixCls = 'pro-table-query-form'
    const { items, model } = useCols(props)
    return () => {
      const renderItems = () => {
        return items.value.map((item: ProTableColumn) => {
          return (
            <NFormItemGi key={item.key} label={item.title}>
              {renderField(item, model)}
            </NFormItemGi>
          )
        })
      }

      return (
        <div class={prefixCls}>
          <NForm showFeedback={false} labelPlacement={'left'}>
            <NGrid cols={4} xGap={12} yGap={12}>
              {renderItems()}
            </NGrid>
          </NForm>
        </div>
      )
    }
  }
})

export default QueryForm
