<script lang="ts" setup>
defineProps<{
  read?: boolean
  avatar?: string
  title?: string
  desc?: string
}>()
</script>

<template>
  <n-list-item :class="read ? 'op-40' : 'op-100'">
    <n-thing>
      <template v-if="avatar" #avatar>
        <n-avatar round :src="avatar" />
      </template>
      <template v-if="title" #header>
        <span class="text-16px">
          {{ title }}
        </span>
      </template>
      <template v-if="desc" #description>
        <span class="text-14px">
          {{ desc }}
        </span>
      </template>
    </n-thing>
  </n-list-item>
</template>

<style scoped></style>
