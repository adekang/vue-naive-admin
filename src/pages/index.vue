<script lang="ts" setup>
const message = useMessage()
const dialog = useDialog()
const notification = useNotification()
const loadingBar = useLoadingBar()
const onMessage = () => {
  message.success('Hello, world!')
}

const onDialog = () => {
  dialog.success({
    title: 'Hello, world!',
    content: 'This is a success dialog.',
    onPositiveClick: onMessage,
  })
}

const onNotification = () => {
  notification.success({
    title: 'Hello, world!',
    content: 'This is a success notification.',
  })
}

const onLoading = () => {
  loadingBar.start()
  setTimeout(() => {
    loadingBar.finish()
  }, 3000)
}
</script>

<template>
  <div>
    <n-space>
      <n-button @click="onMessage">
        Message
      </n-button>

      <n-button @click="onDialog">
        Dialog
      </n-button>

      <n-button @click="onNotification">
        Notification
      </n-button>

      <n-button @click="onLoading">
        Loading
      </n-button>
    </n-space>
  </div>
</template>

<style scoped>

</style>
