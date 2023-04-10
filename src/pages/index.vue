<script lang="ts" setup>
import { useDelete, useGet, usePost, usePut } from '@/compsables/axios-fetch'

const onRequest1 = async () => {
  await useGet('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/200')
}
const onRequest2 = async () => {
  await usePost('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/post')
}
const onRequest3 = async () => {
  await usePut('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/put')
}

const onRequest4 = async () => {
  await useDelete('https://mock.28yanyu.cn/mock/637af0d4080d2f1284a9e77b/test/delete')
}
</script>

<template>
  <div>
    <n-space>
      <n-button @click="onRequest1">
        get
      </n-button>
      <n-button @click="onRequest2">
        post
      </n-button>
      <n-button @click="onRequest3">
        put
      </n-button>
      <n-button @click="onRequest4">
        delete
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>
