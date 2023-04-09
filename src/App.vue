<script setup lang="ts">
import { useAppstore } from '@/store/app'

const appStore = useAppstore()
const { layoutTheme } = storeToRefs(appStore)
</script>

<template>
  <n-config-provider :theme="layoutTheme">
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
