import { DownOutlined, UpOutlined } from '@vicons/antd'
import { NButton, NForm, NFormItemGi, NGrid, NIcon, NSpace } from 'naive-ui'
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
    const {
      itemCols,
      model,
      domRef,
      collapsed,
      toggleCollapsed,
      cols,
      restCol
    } = useCols(props)
    return () => {
      const renderItems = () => {
        return itemCols.value.map((item: ProTableColumn) => {
          return (
            <NFormItemGi key={item.key} label={item.title}>
              {renderField(item, model)}
            </NFormItemGi>
          )
        })
      }
      const renderAction = () => {
        let dom
        if (!collapsed.value) {
          dom = (
            <NSpace size={'small'}>
              展开
              <NIcon>
                <DownOutlined />
              </NIcon>
            </NSpace>
          )
        } else {
          dom = (
            <NSpace size={'small'}>
              收起
              <NIcon>
                <UpOutlined />
              </NIcon>
            </NSpace>
          )
        }
        return (
          <NFormItemGi span={restCol.value}>
            <NSpace align={'center'} justify={'end'} class={'w-100%'}>
              <NButton text type={'primary'} onClick={() => toggleCollapsed()}>
                {dom}
              </NButton>
            </NSpace>
          </NFormItemGi>
        )
      }

      return (
        <div ref={domRef} class={prefixCls}>
          <NForm showFeedback={false} labelPlacement={'left'}>
            <NGrid cols={cols.value} xGap={12} yGap={12}>
              {renderItems()}

              {renderAction()}
            </NGrid>
          </NForm>
        </div>
      )
    }
  }
})

export default QueryForm
