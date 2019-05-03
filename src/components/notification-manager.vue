<template>
  <div class="w-100">
    <div
      v-for="(n, i) in notifications"
      :key="n.id"
      class="alert"
      :class="notificationClasses[i]"
      role="alert"
    >
      <b v-if="n.title">{{n.title}}</b>
      {{n.message}}
    </div>
  </div>
</template>

<script src="./notification-manager.js"></script>
