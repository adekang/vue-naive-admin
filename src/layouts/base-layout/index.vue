<script setup lang="ts">
import SideLayout from '../side-layout/index.vue'
import MixLayout from '../mix-layout/index.vue'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const { layout } = storeToRefs(appStore)
</script>

<template>
  <SideLayout
    v-if="layout.layout === 'side'"
    :logo="layout.logo"
    :title="layout.title"
    :show-sider-trigger="layout.showSiderTrigger"
    :sider-width="layout.siderWidth"
    :sider-collapsed-width="layout.siderCollapsedWidth"
  >
    <template #headerRight>
      <div>
        测试右侧插槽
      </div>
    </template>
    <router-view />
  </sidelayout>
</template>

<style scoped />
