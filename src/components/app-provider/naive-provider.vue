<script lang="ts" setup>
import { useGlobalConfigProvider } from '@/compsables/global-config'

const notification = useNotification()
const dialog = useDialog()
const message = useMessage()
const loadingBar = useLoadingBar()
useGlobalConfigProvider({
  notification,
  dialog,
  message,
  loadingBar
})
</script>

<template>
  <slot />
</template>
