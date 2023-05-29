<template>
  <div class="w-330px">
    <n-scrollbar class="max-h-300px">
      <n-list
        hoverable
        clickable
        style="background: transparent"
        :show-divider="false"
      >
        <slot />
      </n-list>
    </n-scrollbar>
  </div>
</template>
