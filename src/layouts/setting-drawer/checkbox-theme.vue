<script lang="ts" setup>
import { CheckOutlined } from '@vicons/antd'
defineProps<{
  color: string
  checked?: boolean
}>()
</script>

<template>
  <div :style="{ background: color }" class="cursor-pointer flex w-20px h-20px items-center justify-center">
    <n-icon v-if="checked" size="16">
      <CheckOutlined />
    </n-icon>
  </div>
</template>
