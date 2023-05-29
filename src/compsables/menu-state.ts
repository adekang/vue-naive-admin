const menuStateFn = () => {
  const route = useRoute()
  const state = reactive({
    active: ''
  })

  const updateActive = (active: string) => {
    state.active = active
  }

  watch(
    () => route.fullPath,
    () => {
      updateActive(route.path)
    }
  )

  return {
    ...toRefs(state),
    updateActive
  }
}

const [useMenuStateProvider, useMenuStateInject] =
  createInjectionState(menuStateFn)

export const useMenuState = () => {
  return (
    useMenuStateInject() ?? {
      active: ref(''),
      updateActive: (_path: string) => {}
    }
  )
}

// 抛出注入
export { useMenuStateProvider }
