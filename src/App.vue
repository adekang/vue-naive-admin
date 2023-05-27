<script setup lang="ts">
import { useAutoDark } from '@/compsables/auto-dark'
import { useAutoLang } from '@/compsables/auto-lang'
import { useMenuStateProvider } from '@/compsables/menu-state'
import { useAppstore } from '@/store/app'

const appStore = useAppstore()

const {
  layoutTheme,
  overridesTheme,
} = storeToRefs(appStore)
useAutoDark()
useMenuStateProvider()
const { naiveLocale } = useAutoLang()
</script>

<template>
  <n-config-provider
    :date-locale="naiveLocale.dataLocale"
    :locale="naiveLocale.locale"
    :theme="layoutTheme"
    :theme-overrides="overridesTheme"
  >
    <n-global-style />
    <app-provider>
      <router-view />
    </app-provider>
  </n-config-provider>
</template>
