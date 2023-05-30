<script lang="ts" setup>
import SettingDrawer from '../setting-drawer/index.vue'
import WrapContent from './wrap-content.vue'
import BasicLayout from './basic-layout.vue'
import { useMenuState } from '@/compsables/menu-state'
import { useUserStore } from '@/store/user'
import RightContent from '@/layouts/base-layout/right-content.vue'
import { useQueryBreakpoints } from '@/compsables/query-breakpoints'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const userStore = useUserStore()
const menuOptions = computed(() => userStore.menusData)

const { layout, visible, layoutList, layoutStyleList, themeList } =
  storeToRefs(appStore)

const { isMobile, isDesktop, isPad } = useQueryBreakpoints()

const { active } = useMenuState()

watchEffect(() => {
  if (isDesktop.value) appStore.toggleCollapsed(false)
  else if (isPad.value) appStore.toggleCollapsed(true)

  if (isMobile.value) appStore.toggleCollapsed(false)
})
</script>

<template>
  <BasicLayout
    v-model:collapsed="layout.collapsed"
    :options="menuOptions"
    :logo="layout.logo"
    :active="active"
    :layout="layout.layout"
    :title="layout.title"
    :show-sider-trigger="layout.showSiderTrigger"
    :sider-width="layout.siderWidth"
    :sider-collapsed-width="layout.siderCollapsedWidth"
    :inverted="layout.layoutStyle === 'inverted'"
  >
    <template #headerRight>
      <RightContent />
    </template>
    <WrapContent />
  </BasicLayout>
  <SettingDrawer
    v-model:layout="layout.layout"
    v-model:theme="layout.theme"
    v-model:layout-style="layout.layoutStyle"
    :theme-list="themeList"
    :layout-list="layoutList"
    :layout-style-list="layoutStyleList"
  />
</template>

<style scoped></style>
