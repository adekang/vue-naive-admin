<script setup lang="ts">
import Logo from '@/layouts/common/logo.vue'
import Title from '@/layouts/common/title.vue'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
}>(), {
  headerHeight: 48,
})
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <n-layout class="h-screen">
    <n-layout-header inverted class="pro-admin-mix-layout-header flex items-center px-4 justify-between">
      <div flex items-center>
        <Logo :src="logo" />
        <Title :title="title" />
      </div>
      <slot name="headerRight">
        <div>
          右边
        </div>
      </slot>
    </n-layout-header>
    <n-layout has-sider class="pro-admin-mix-layout-content">
      <n-layout-sider content-style="padding: 24px;">
        海淀桥
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}

.pro-admin-mix-layout-content {
  height: v-bind(contentHeightVar);
}
</style>
