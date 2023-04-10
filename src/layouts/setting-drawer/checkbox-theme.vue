<script lang="ts" setup>
import { CheckOutlined } from '@vicons/antd'

defineProps<{
  color: string
  checked?: boolean
  title?: string
}>()

defineEmits(['click'])
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <div
        :style="{ background: color }"
        class="cursor-pointer flex w-20px h-20px items-center justify-center"
        @click="$emit('click', $event)"
      >
        <n-icon v-if="checked" size="16">
          <CheckOutlined />
        </n-icon>
      </div>
    </template>
    {{ title }}
  </n-tooltip>
</template>
