<script setup lang="ts">
import * as icons from '@vicons/antd'
// import icons from './icons'

defineProps<{
  icon: string
}>()
</script>

<template>
  <n-icon :component="icons[icon]" />
</template>

<style scoped></style>
