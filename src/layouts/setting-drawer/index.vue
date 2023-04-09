<script lang="ts" setup>
import { CloseOutlined, SettingOutlined } from '@vicons/antd'
import type { LayoutType } from '@/config/layout-theme'
import CheckboxLayout from '@/layouts/setting-drawer/checkbox-layout.vue'
import Container from '@/layouts/setting-drawer/container.vue'

const props = withDefaults(defineProps<{
  floatTop?: number | string
  drawerWidth?: number | string
  layout?: 'mix' | 'side' | 'top'
  layoutStyle?: 'light' | 'inverted'
  layoutList: LayoutType[]
  layoutStyleList: LayoutType[]
}>(), {
  floatTop: 240,
  drawerWidth: 300,
})

const emit = defineEmits(['update:layout', 'update:layoutStyle'])

const onChange = (val: string) => {
  emit('update:layout', val)
}
const onChangeStyle = (val: string) => {
  emit('update:layoutStyle', val)
}
const show = ref(false)

const handClick = (val: boolean) => {
  show.value = val
}
const cssVar = computed(() => {
  return {
    '--pro-admin-float-top': `${props.floatTop}px`,
    '--pro-admin-drawer-width': `${props.drawerWidth}px`,
  }
})
</script>

<template>
  <teleport to="body">
    <div :style="cssVar" class="fixed top-[var(--pro-admin-float-top)] right-0">
      <!---->
      <n-button size="large" type="primary" class="b-rd-tr-0! b-rd-br-0!" @click="handClick(true)">
        <template #icon>
          <n-icon :size="24">
            <SettingOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </teleport>
  <n-drawer v-model:show="show" width="300">
    <n-drawer-content>
      <Container v-if="layoutList" title="导航模式">
        <n-space size="large">
          <template v-for="item in layoutList" :key="item.key">
            <CheckboxLayout
              :title="item.title"
              :layout="item.key"
              :checked="item.key === layout"
              @click="onChange(item.key)"
            />
          </template>
        </n-space>
      </Container>
      <Container v-if="layoutStyleList" title="布局风格配置">
        <n-space size="large">
          <template v-for="item in layoutStyleList" :key="item.id">
            <CheckboxLayout
              :title="item.title"
              :layout="item.key"
              :inverted="item.inverted"
              :checked="item.id === layoutStyle"
              @click="onChangeStyle(item.id)"
            />
          </template>
        </n-space>
      </Container>
    </n-drawer-content>
    <div
      :style="cssVar"
      class="absolute top-[var(--pro-admin-float-top)] right-[var(--pro-admin-drawer-width)]"
    >
      <n-button size="large" type="primary" class="b-rd-tr-0! b-rd-br-0!" @click="handClick(false)">
        <template #icon>
          <n-icon :size="24">
            <CloseOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </n-drawer>
</template>

<style scoped>

</style>
