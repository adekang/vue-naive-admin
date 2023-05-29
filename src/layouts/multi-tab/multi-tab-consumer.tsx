import { KeepAlive } from '@vue/runtime-core'
import { omit } from 'lodash-es'
import { useMultiTabInject } from '@/compsables/multi-tab-state'

// eslint-disable-next-line vue/one-component-per-file
export const MultiTabConsumer = defineComponent({
  name: 'MultiTabConsumer',
  setup(props, { slots }) {
    const state = useMultiTabInject()
    const route = useRoute()

    const getCurrentItem = () => {
      const path = route.path
      return state.tabList.find((item) => item.path === path)
    }

    return () => {
      const component = slots?.default?.()
      if (!component) return null

      let currentItem = getCurrentItem()
      const componentCache = toRaw(state.componentCache)
      if (!currentItem) {
        currentItem = {
          path: route.path,
          tabTitle: route.meta.title,
          route: omit(route, ['matched']),
          key: state.guid()
        }
        state.tabList?.push(currentItem)
      }

      const exclude: string[] = []
      if (route.meta.keepAlive === false && isReactive(currentItem))
        exclude.push(currentItem.key!)

      // eslint-disable-next-line vue/one-component-per-file
      const NewComp =
        componentCache[currentItem.key!] ||
        defineComponent({
          name: currentItem.key,
          setup() {
            return () => <> {component} </>
          }
        })
      if (exclude.find((item) => item === currentItem?.key))
        delete componentCache[currentItem.key!]
      else componentCache[currentItem.key!] = NewComp

      return (
        <KeepAlive exclude={exclude}>
          <NewComp key={currentItem.key + route.fullPath} />
        </KeepAlive>
      )
    }
  }
})
