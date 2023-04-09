<script lang="ts" setup>
import type { LayoutTheme } from '@/config/layout-theme'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const onSwitch = (theme: LayoutTheme['layoutStyle']) => {
  appStore.updateLayoutStyle(theme)
  if (theme === 'dark')
    document.documentElement.className = 'dark'
  else
    document.documentElement.removeAttribute('class')
}
</script>

<template>
  <div>
    <n-space>
      <n-button @click="onSwitch('light')">
        浅色
      </n-button>
      <n-button @click="onSwitch('dark')">
        深色
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>
