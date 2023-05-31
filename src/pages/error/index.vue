<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onBack = () => {
  // 返回上一页
  router.go(-1)
}
</script>

<template>
  <n-result
    class="mt-48px"
    status="404"
    title="404 资源不存在"
    description="抱歉，访问的页面不存在"
  >
    <template #footer>
      <n-button @click="onBack">返回上一页</n-button>
    </template>
  </n-result>
</template>
