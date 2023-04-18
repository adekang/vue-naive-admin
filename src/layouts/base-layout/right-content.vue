<script lang="ts" setup>
import SelectLang from '../select-lang/index.vue'
import { useAppLocale } from '@/compsables/auto-lang'
const appLocale = useAppLocale()
</script>

<template>
  <div>
    <SelectLang v-model:value="appLocale" />
  </div>
</template>
