<script lang="ts" setup>
import { useAppLocale } from '@/compsables/auto-lang'

const appLocale = useAppLocale()
const onSwitch = (lang: string) => {
  appLocale.value = lang
}

const { locale } = useI18n()
</script>

<template>
  <div>
    <n-space>
      {{ locale }}
      <n-input />
      <n-button @click="onSwitch('zh-CN')">
        中文
      </n-button>
      <n-button @click="onSwitch('en-US')">
        en
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>
