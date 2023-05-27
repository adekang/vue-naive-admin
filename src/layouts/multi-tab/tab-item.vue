<script setup lang="ts">
import type { TabItem } from '@/layouts/multi-tab/type'

const props = defineProps<{
  item: TabItem
}>()
</script>

<template>
  <span>
    {{ $t(props.item.tabTitle) }}
  </span>
</template>

<style scoped>

</style>
