<script lang="ts" setup>
import { MoreOutlined } from '@vicons/antd'
import type { DropdownOption } from 'naive-ui'
import TabItemCom from './tab-item.vue'
import type { TabItem } from '@/layouts/multi-tab/type'
import { useMultiTab, useMultiTabInject } from '@/compsables/multi-tab-state'

const router = useRouter()
const contextParams = reactive({
  x: 0,
  y: 0,
  showDropdown: false,
})
const state = useMultiTabInject()
const {
  tabList,
  current,
  closeTab,
  refresh,
} = useMultiTab()

const handleClose = (path: string) => {
  closeTab(path)
  contextParams.showDropdown = false
}

const handleContextMenu = (e: MouseEvent) => {
  // 阻止默认事件
  e.preventDefault()
  e.stopPropagation()
  contextParams.showDropdown = false
  nextTick().then(() => {
    contextParams.showDropdown = true
    contextParams.x = e.clientX
    contextParams.y = e.clientY
  })
}

const renderTab = (item: TabItem) => {
  return h(TabItemCom, {
    item,
    onContextMenu: handleContextMenu,
  })
}

const dropdownOpt = computed<DropdownOption[]>(() => [
  {
    label: '关闭当前页',
    key: 'closeCurrent',
    // 如果当前只剩下一页的话，我们是不允许关闭的，所以我们就通过计算属性的方式
    disabled: tabList.value?.length === 1,
  },
  {
    label: '刷新当前页',
    key: 'refreshCurrent',
  },
])
const handleActionSelect = (key: string) => {
  if (key === 'closeCurrent')
    closeTab()
  else if (key === 'refreshCurrent')
    refresh()

  contextParams.showDropdown = false
}
const handleChange = (val: string) => {
  router.push(val)
  contextParams.showDropdown = false
}

const onClickOutside = () => {
  contextParams.showDropdown = false
}
// TODO BUG -> Added non-passive event listener to a scroll-blocking 'wheel' event. Consider marking event handler as 'passive' to make the page more responsive.
</script>

<template>
  <n-tabs
    :value="current"
    type="card"
    tab-style="min-width: 80px;"
    class="pt-6px bg-white dark:bg-transparent"
    @update:value="handleChange"
    @close="handleClose"
  >
    <template #prefix>
      <div class="ml-12px" />
    </template>

    <n-tab-pane
      v-for="tab in tabList"
      :key="tab.path"
      closable
      :tab="renderTab(tab)"
      :name="tab.path"
    />
    <template #suffix>
      <div class="mr-12px">
        <n-dropdown trigger="click" :options="dropdownOpt" @select="handleActionSelect">
          <n-icon size="16" class="cursor-pointer">
            <MoreOutlined />
          </n-icon>
        </n-dropdown>
      </div>
    </template>
  </n-tabs>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="contextParams.x"
    :y="contextParams.y"
    :options="dropdownOpt"
    :show="contextParams.showDropdown"
    :on-clickoutside="onClickOutside"
    @select="handleActionSelect"
  />
</template>
