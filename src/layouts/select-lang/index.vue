<script lang="ts" setup>
import LangIcon from './lang-icon.vue'
import { useAppstore } from '@/store/app'
defineProps<{
  value: string
}>()

const emit = defineEmits(['update:value'])
const appStore = useAppstore()
const handleSelect = (value: string) => {
  emit('update:value', value)
}
</script>

<template>
  <n-dropdown
    trigger="hover"
    :value="value"
    :options="appStore.localeOptions"
    @select="handleSelect"
  >
    <div class="text-18px cursor-pointer">
      <LangIcon />
    </div>
  </n-dropdown>
</template>
