<script lang="ts" setup>
import { useAppstore } from '@/store/app'
import { colors } from '@/config/theme'
const appStore = useAppstore()
const onSwitch = (theme: string) => {
  appStore.updateTheme(theme)
}
</script>

<template>
  <div>
    <n-space>
      <n-button v-for="(color, key) in colors" :key="key" type="primary" @click="onSwitch(key)">
        {{ key }}
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>
