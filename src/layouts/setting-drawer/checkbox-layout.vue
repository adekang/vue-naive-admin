<script lang="ts" setup>
import { CheckOutlined } from '@vicons/antd'
import type { VNodeChild } from '@vue/runtime-core'

const props = withDefaults(defineProps<{
  layout?: 'mix' | 'side' | 'top'
  inverted?: boolean
  checked?: boolean
  title?: string | (() => VNodeChild)
}>(), {
  layout: 'mix',
  inverted: false,
  checked: false,
})

defineEmits(['click'])

const headerClass = computed(() => {
  if (props.layout === 'mix' || props.layout === 'top') {
    return [
      'bg-[var(--inverted-color)]',
    ]
  }
  if (props.layout === 'side') {
    return [
      'bg-[var(--base-color)]',
    ]
  }
  return []
})
const siderClasss = computed(() => {
  if (props.layout === 'mix') {
    return [
      'h-75%',
      'bg-white',
      'bottom-0',
    ]
  }
  if (props.layout === 'side') {
    return [
      'h-100%',
      `bg-[var(${props.inverted ? '--inverted-color' : '--base-color'})]`,
    ]
  }
  return []
})
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-el
        tag="div"
        class="cursor-pointer  inline-block relative w-44px h-36px b-rd-2px overflow-hidden bg-[var(--pro-admin-layout-content-bg)] shadow-[var(--pro-admin-layout-box-shadow)]"
        @click="$emit('click', $event)"
      >
        <div :class="headerClass" class="h-25%  absolute top-0 w-100%" />
        <div v-if="layout !== 'top'" :class="siderClasss" class="absolute w-30%  left-0 " />

        <div v-if="checked" class="absolute bottom--3px right-3px">
          <n-icon size="16">
            <CheckOutlined />
          </n-icon>
        </div>
      </n-el>
    </template>
    {{ typeof title === 'function' ? title?.() : title }}
  </n-tooltip>
</template>

<style scoped>

</style>
