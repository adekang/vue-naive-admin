<script setup lang="ts">
import { LayoutBase, LayoutContent, LayoutHeader, LayoutSider, Logo, Title } from '@/layouts/common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  inverted?: boolean
}>(), {
  headerHeight: 48,
  inverted: false,
})
const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <LayoutBase class="h-screen">
    <LayoutHeader :inverted="inverted" class="pro-admin-mix-layout-header flex items-center px-4 justify-between">
      <div class="flex items-center">
        <Logo :src="logo" />
        <Title :title="title" />
      </div>
      <slot name="headerRight">
        <div>
          右边
        </div>
      </slot>
    </LayoutHeader>
    <LayoutConten>
      <slot />
    </LayoutConten>
  </LayoutBase>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}
</style>
