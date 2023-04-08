<script setup lang="ts">
import MixLayout from '../mix-layout/index.vue'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const { layout } = storeToRefs(appStore)
</script>

<template>
  <MixLayout
    v-if="layout.layout === 'mix'"
    :logo="layout.logo"
    :title="layout.title"
  >
    <template #headerRight>
      <div>
        测试右侧插槽
      </div>
    </template>
    <router-view />
  </mixlayout>
</template>

<style scoped />
