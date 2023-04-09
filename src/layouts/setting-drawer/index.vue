<script lang="ts" setup>
import { CloseOutlined, SettingOutlined } from '@vicons/antd'

const props = withDefaults(defineProps<{
  floatTop?: number | string
  drawerWidth?: number | string
}>(), {
  floatTop: 240,
  drawerWidth: 300,
})
const show = ref(false)
const handCick = (val: boolean) => {
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
      <n-button size="large" type="primary" class="b-rd-tr-0! b-rd-br-0!" @click="handCick(true)">
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
      <div
        :style="cssVar"
        class="absolute top-[var(--pro-admin-float-top)] right-[var(--pro-admin-drawer-width)]"
      >
        <n-button size="large" type="primary" class="b-rd-tr-0! b-rd-br-0!" @click="handCick(false)">
          <template #icon>
            <n-icon :size="24">
              <CloseOutlined />
            </n-icon>
          </template>
        </n-button>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>
