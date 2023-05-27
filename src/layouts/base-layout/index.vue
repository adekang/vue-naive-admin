<script lang="ts" setup>
import MixLayout from '../mix-layout/index.vue'
import SideLayout from '../side-layout/index.vue'
import TopLayout from '../top-layout/index.vue'
import MobileLayout from '../mobile-layout/index.vue'
import SettingDrawer from '../setting-drawer/index.vue'
import { useMenuState } from '@/compsables/menu-state'
// import { menuOptions } from '@/layouts/side-menu/menu-data'
import { useUserStore } from '@/store/user'
import RightContent from '@/layouts/base-layout/right-content.vue'
import { useQueryBreakpoints } from '@/compsables/query-breakpoints'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const userStore = useUserStore()
const menuOptions = computed(() => userStore.menusData)

const {
  layout,
  visible,
  layoutList,
  layoutStyleList,
  themeList,
} = storeToRefs(appStore)

const {
  isMobile,
  isDesktop,
  isPad,
} = useQueryBreakpoints()

const { active } = useMenuState()

watchEffect(() => {
  if (isDesktop.value)
    appStore.toggleCollapsed(false)
  else if (isPad.value)
    appStore.toggleCollapsed(true)

  if (isMobile.value)
    appStore.toggleCollapsed(false)
})
</script>

<template>
  <MobileLayout
    v-if="isMobile"
    v-model:visible="visible"
    :logo="layout.logo"
    :title="layout.title"
  >
    <template #headerRight>
      <RightContent />
    </template>
    <router-view />
  </MobileLayout>
  <template v-else>
    <MixLayout
      v-if="layout.layout === 'mix'"
      v-model:collapsed="layout.collapsed"
      :options="menuOptions"
      :logo="layout.logo"
      :active="active"
      :title="layout.title"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-width="layout.siderWidth"
      :sider-collapsed-width="layout.siderCollapsedWidth"
    >
      <template #headerRight>
        <RightContent />
      </template>
      <router-view />
    </MixLayout>
    <SideLayout
      v-if="layout.layout === 'side'"
      v-model:collapsed="layout.collapsed"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
      :show-sider-trigger="layout.showSiderTrigger"
      :sider-width="layout.siderWidth"
      :sider-collapsed-width="layout.siderCollapsedWidth"
    >
      <template #headerRight>
        <RightContent />
      </template>
      <template #headerLeft>
        <div>
          测试左侧插槽
        </div>
      </template>
      <router-view />
    </SideLayout>
    <TopLayout
      v-if="layout.layout === 'top'"
      :logo="layout.logo"
      :title="layout.title"
      :inverted="layout.layoutStyle === 'inverted'"
    >
      <template #headerRight>
        <RightContent />
      </template>
      <template #headerLeft>
        <div>
          测试左侧插槽
        </div>
      </template>
      <router-view />
    </TopLayout>
  </template>
  <SettingDrawer
    v-model:layout="layout.layout"
    v-model:theme="layout.theme"
    v-model:layout-style="layout.layoutStyle"
    :theme-list="themeList"
    :layout-list="layoutList"
    :layout-style-list="layoutStyleList"
  />
</template>

<style scoped>

</style>
