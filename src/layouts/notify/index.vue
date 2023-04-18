<script lang="ts" setup>
import { BellOutlined } from '@vicons/antd'
import type { DropdownOption } from 'naive-ui'
import Content from './content.vue'
import Footer from './footer.vue'
withDefaults(defineProps<{
  count?: number
  maxCount?: number
}>(), {
  maxCount: 99,
})

const options = ref<DropdownOption[]>([
  {
    key: 'content',
    type: 'render',
    render: () => h(Content),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    key: 'footer',
    type: 'render',
    render: () => h(Footer),
  },
])

const handleSelect = () => {

}
</script>

<template>
  <n-dropdown trigger="click" :options="options" @select="handleSelect">
    <n-badge :value="count" :max="maxCount">
      <n-icon class="text-[var(--n-text-color)]" size="18">
        <BellOutlined />
      </n-icon>
      <n-badge />
    </n-badge>
  </n-dropdown>
  <div class="flex cursor-pointer" />
</template>

<style scoped>

</style>
