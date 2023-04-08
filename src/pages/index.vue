<script setup lang="ts">
import { useCounters } from '@/store/counter'

const counterStore = useCounters()

const {
  counter,
  double,
} = storeToRefs(counterStore)
</script>

<template>
  <div>
    index
    <h1>{{ counter }}</h1>
    <h1>{{ double }}</h1>
    <n-button @click="counterStore.increment">
      增加
    </n-button>
    <n-button @click="counterStore.decrement">
      减少
    </n-button>
  </div>
</template>

<style scoped>

</style>
