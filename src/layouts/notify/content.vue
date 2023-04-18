<script lang="ts" setup>
import NotifyItem from './notify-item.vue'
import MessageItem from '@/layouts/notify/message-item.vue'
import UpcomingItem from '@/layouts/notify/upcoming-item.vue'
import Container from '@/layouts/notify/container.vue'
</script>

<template>
  <n-tabs default-value="notify" justify-content="center" type="line">
    <n-tab-pane name="notify" tab="通知">
      <Container>
        <NotifyItem
          title="测试" desc="你好呀"
          avatar="https://biox.stanford.edu/files/styles/profile_thumbnail/public/carla_shatz.webp?orig=png"
        />
        <NotifyItem
          read title="测试" desc="你好呀"
          avatar="https://biox.stanford.edu/files/styles/profile_thumbnail/public/carla_shatz.webp?orig=png"
        />
      </Container>
    </n-tab-pane>
    <n-tab-pane name="message" tab="消息">
      <Container>
        <MessageItem />
      </Container>
    </n-tab-pane>
    <n-tab-pane name="upcoming" tab="待办">
      <Container>
        <UpcomingItem />
      </Container>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped>

</style>
