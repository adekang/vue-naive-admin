<script lang="ts" setup>
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{ size?: number; title?: string }>(), {
  size: 20
})
const titleStyle = computed<CSSProperties>(() => {
  return {
    fontSize: `${props.size}px`
  }
})
</script>

<template>
  <span v-if="title" class="ml-2 truncate" :style="titleStyle">
    {{ title }}
  </span>
</template>
