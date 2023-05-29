<script setup lang="ts">
import { ReloadOutlined } from '@vicons/antd'
import { useMultiTab } from '@/compsables/multi-tab-state'
import type { TabItem } from '@/layouts/multi-tab/type'

const props = defineProps<{
  item: TabItem
  onContextMenu: (e: MouseEvent) => void
}>()
const { refresh, current } = useMultiTab()
const handleRefresh = () => {
  refresh()
}
const handleContextMenu = (e: MouseEvent) => {
  props.onContextMenu(e)
}
</script>

<template>
  <span @contextmenu="handleContextMenu">
    {{ $t(props.item.tabTitle) }}
  </span>
  <n-icon
    v-if="current === item.path"
    class="ml-2 n-base-close n-tabs-tab__close"
    @click="handleRefresh"
  >
    <ReloadOutlined />
  </n-icon>
</template>

<style scoped></style>
