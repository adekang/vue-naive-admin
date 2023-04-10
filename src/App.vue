<script setup lang="ts">
import { useAutoDark } from '@/compsables/auto-dark'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const {
  layoutTheme,
  overridesTheme,
} = storeToRefs(appStore)
useAutoDark()
</script>

<template>
  <n-config-provider :theme="layoutTheme" :theme-overrides="overridesTheme">
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
