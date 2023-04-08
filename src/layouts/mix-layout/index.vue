<script setup lang="ts">
const props = withDefaults(defineProps<{
  headerHeight?: number
}>(), {
  headerHeight: 48,
})
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <n-layout class="h-screen">
    <n-layout-header class="pro-admin-mix-layout-header">
      颐和园路
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

.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
