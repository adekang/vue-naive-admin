<script setup lang="ts">
import { log } from 'console'
import type { MenuOption } from 'naive-ui'
import {
  LayoutBase,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
  Logo,
  Title
} from '@/layouts/common'
import SideMenu from '@/layouts/side-menu/index.vue'

const props = withDefaults(
  defineProps<{
    headerHeight?: number
    logo?: string
    title?: string
    siderWidth?: number
    siderCollapsedWidth?: number
    showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
    collapsed?: boolean
    active?: string
    options?: MenuOption[]
    collapsedIconSize?: number
    expandedKeys?: string[]
    layout?: 'mix' | 'side' | 'top'
    inverted?: boolean
  }>(),
  {
    headerHeight: 48,
    siderWidth: 240,
    siderCollapsedWidth: 48,
    collapsed: false,
    collapsedIconSize: 22,
    layout: 'mix',
    inverted: false
  }
)
defineEmits(['update:collapsed', 'update:active', 'update:expandedKeys'])
const contentHeightVar = computed(() => `calc(100vh - ${props.headerHeight}px)`)
const headerHeightVar = computed(() => `${props.headerHeight}px`)
const baseSider = computed(() => props.layout === 'side')
const innerSider = computed(() => props.layout === 'mix')
// const headerInverted = computed(() => {
//   props.layout === 'mix' ? true : props.inverted
// })
</script>

<template>
  <LayoutBase :has-sider="baseSider" class="h-screen">
    <LayoutHeader
      v-if="layout !== 'side'"
      :inverted="inverted"
      class="pro-admin-mix-layout-header flex items-center px-4 justify-between"
    >
      <div class="flex items-center">
        <Logo :src="logo" />
        <Title :title="title" />
        <SideMenu
          v-if="layout === 'top'"
          mode="horizontal"
          :collapsed="collapsed"
          :collapsed-width="siderCollapsedWidth"
          :value="active"
          :options="options"
          :collapsed-icon-size="collapsedIconSize"
          :expanded-keys="expandedKeys"
          @update:expanded-keys="$emit('update:expandedKeys', $event)"
          @update:value="$emit('update:active', $event)"
        />
      </div>
      <slot name="headerRight">
        <div>右边</div>
      </slot>
    </LayoutHeader>
    <LayoutSider
      v-if="layout === 'side'"
      :inverted="inverted"
      :collapsed="collapsed"
      :collapsed-width="siderCollapsedWidth"
      :width="siderWidth"
      :show-trigger="showSiderTrigger"
      @update:collapsed="$emit('update:collapsed', $event)"
    >
      <div class="flex items-center justify-center mt-24px">
        <Logo :src="logo" :size="30" />
        <Title v-if="!collapsed" :size="22" :title="title" />
      </div>
      <SideMenu
        :collapsed="collapsed"
        :collapsed-width="siderCollapsedWidth"
        :value="active"
        :options="options"
        :collapsed-icon-size="collapsedIconSize"
        :expanded-keys="expandedKeys"
        @update:expanded-keys="$emit('update:expandedKeys', $event)"
        @update:value="$emit('update:active', $event)"
      />
    </LayoutSider>

    <LayoutBase :has-sider="innerSider" class="pro-admin-mix-layout-content">
      <!--      混合布局 -->
      <LayoutSider
        v-if="layout === 'mix'"
        :collapsed="collapsed"
        :collapsed-width="siderCollapsedWidth"
        :width="siderWidth"
        :show-trigger="showSiderTrigger"
        @update:collapsed="$emit('update:collapsed', $event)"
      >
        <SideMenu
          :collapsed="collapsed"
          :collapsed-width="siderCollapsedWidth"
          :value="active"
          :options="options"
          :collapsed-icon-size="collapsedIconSize"
          :expanded-keys="expandedKeys"
          @update:expanded-keys="$emit('update:expandedKeys', $event)"
          @update:value="$emit('update:active', $event)"
        />
      </LayoutSider>
      <LayoutHeader
        v-if="layout === 'side'"
        class="pro-admin-mix-layout-header flex items-center px-4 justify-between"
      >
        <slot name="headerLeft">
          <div />
        </slot>
        <slot name="headerRight">
          <div />
        </slot>
      </LayoutHeader>

      <LayoutContent>
        <slot />
      </LayoutContent>
    </LayoutBase>
  </LayoutBase>
</template>

<style scoped>
.pro-admin-mix-layout-header {
  height: v-bind(headerHeightVar);
}

.pro-admin-mix-layout-content {
  height: v-bind(contentHeightVar);
}
</style>
