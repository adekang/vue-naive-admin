import { omit } from 'lodash-es'
import { useGlobalConfig } from '@/compsables/global-config'
import type { TabItem } from '@/layouts/multi-tab/type'
import { MULTI_TAB_STATE_KEY } from '@/layouts/multi-tab/type'

export const useMultiTabProvider = () => {
  const state = reactive({
    tabList: [],
    current: '',
  })

  provide(MULTI_TAB_STATE_KEY, state)
  return state
}

export const useMultiTabInject = () => {
  return inject(MULTI_TAB_STATE_KEY)!
}

export const useMultiTab = () => {
  const state = useMultiTabInject()
  const tabList = computed(() => state.tabList)
  const current = computed(() => state.current)
  const { message } = useGlobalConfig()
  const route = useRoute()
  const router = useRouter()
  watch(() => route.fullPath, () => {
    if (current.value !== route.path)
      state.current = route.path

    const tabIndex = tabList.value.findIndex(item => item.path === route.path)
    if (tabIndex !== -1) { state.tabList[tabIndex].route = omit(route, ['matched']) }
    else {
      const item: TabItem = {
        path: route.path,
        tabTitle: route.meta.title,
        route: omit(route, ['matched']),
      }
      state.tabList.push(item)
    }
  }, {
    immediate: true,
  })
  const closeTab = (path?: string) => {
    // 判断path是否存在，如果不存在就关闭当前页
    if (!path)
      path = current.value
    // 如果当前页面是最后一个页面，就不能进行关闭
    if (tabList.value?.length === 1) {
      // 这里是可以支持多语言的，可以自己去实现
      message?.info('这是最后一个标签，无法被关闭')
      return
    }
    // 获取当前页面的索引地址
    const currentIndex = tabList.value.findIndex(item => item.path === path)
    // 判断当前页面是否不是当前选中的页面，如果不是就直接删除
    if (path !== current.value) {
      state.tabList.splice(currentIndex, 1)
      return
    }
    // 如果删除的是当前页面，那么我们就需要处理一下，
    // 如果删除的是当前页面的话，我们需要跳转到指定的目标页面
    // 我们需要判断当前是不是在第一页，如果不是正常跳转到上一个页签。
    const targetIndex = currentIndex === 0 ? currentIndex + 1 : currentIndex - 1
    router.replace(state.tabList[targetIndex].route!).then(() => {
      // 完成跳转后再删除跳转前的页签
      state.tabList.splice(currentIndex, 1)
    }).catch()
  }

  const refresh = (path?: string) => {
    path = path ?? current.value
    router.replace({
      path: `/redirect/${path}`,
    }).then(() => {}).catch(() => {})
  }

  return {
    tabList,
    current,
    closeTab,
    refresh,
  }
}
