<script setup lang="ts">
import { useAutoDark } from '@/compsables/auto-dark'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const { layoutTheme } = storeToRefs(appStore)
useAutoDark()
</script>

<template>
  <n-config-provider :theme="layoutTheme">
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
