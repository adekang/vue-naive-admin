<script setup lang="ts">
import { LayoutContent, LayoutSider, Logo, Title } from '@/layouts/common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  siderWidth?: number
  siderCollapsedWidth?: number
  showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
  inverted?: boolean
  collapsed?: boolean
}>(), {
  headerHeight: 48,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  inverted: false,
  collapsed: false,
})
defineEmits(['update:collapsed'])
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <n-layout has-sider class="h-screen">
    <LayoutSider
      :inverted="inverted"
      :collapsed="collapsed"
      :collapsed-width="siderCollapsedWidth"
      :width="siderWidth"
      :show-trigger="showSiderTrigger"
      @update:collapsed="($event) => $emit('update:collapsed', $event)"
    >
      <div class="flex items-center justify-center mt-24px">
        <Logo :src="logo" :size="30" />
        <Title v-if="!collapsed" :size="22" :title="title" />
      </div>
    </LayoutSider>
    <n-layout style="--n-color :var(--pro-admin-layout-content-bg)">
      <n-layout-header class="pro-admin-mix-layout-header flex items-center px-4 justify-between">
        <slot name="headerLeft">
          <div />
        </slot>
        <slot name="headerRight">
          <div />
        </slot>
      </n-layout-header>
      <LayoutContent content-style="padding: 24px;">
        <slot />
      </LayoutContent>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}
</style>
