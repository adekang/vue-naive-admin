<script lang="ts" setup>
withDefaults(defineProps<{ src?: string; size?: number }>(), {
  size: 24
})
</script>

<template>
  <n-image
    v-if="src"
    alt="logo"
    :height="size"
    :width="size"
    :src="src"
    :preview-disabled="true"
  />
</template>

<style scoped></style>
