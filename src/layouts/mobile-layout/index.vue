<script setup lang="ts">
import { MenuFoldOutlined } from '@vicons/antd'
import { LayoutBase, LayoutContent, LayoutHeader, Logo, Title } from '@/layouts/common'

const props = withDefaults(defineProps<{
  headerHeight?: number
  logo?: string
  title?: string
  headerInverted?: boolean
  drawerInverted?: boolean
  visible?: boolean
  logoVisible?: boolean
}>(), {
  headerHeight: 48,
  visible: false,
  headerInverted: false,
  drawerInverted: false,
  logoVisible: true,
})

const emits = defineEmits(['update:visible'])
const onShow = () => {
  emits('update:visible', true)
}

const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <LayoutBase class="h-screen">
    <LayoutHeader
      :inverted="headerInverted"
      class="pro-admin-mix-layout-header flex items-center px-4 justify-between"
    >
      <div class="flex items-center">
        <Logo :src="logo" :size="24" />
        <n-icon size="24" class="ml-12px" @click="onShow">
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <slot name="headerRight">
        <div>
          右边
        </div>
      </slot>
    </LayoutHeader>
    <LayoutContent>
      <slot />
    </LayoutContent>
  </LayoutBase>
  <n-drawer
    :show="visible"
    :width="240"
    placement="left"
    @update:show="(val) => $emit('update:visible', val)"
  >
    <n-drawer-content body-content-style="padding: 0">
      <n-layout class="h-100%">
        <n-layout-header class="h-100%" inverted>
          <div v-if="logoVisible" class="flex items-center justify-center">
            <Logo :src="logo" :size="26" />
            <Title :size="20" :title="title" />
          </div>
          《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
        </n-layout-header>
      </n-layout>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}
</style>
