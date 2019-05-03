<template>
  <div id="app" @click="onGlobalEvent($event, 'home')" @keydown="onGlobalEvent($event, 'home')">
    <div class="notification-manager">
      <notification-manager/>
    </div>
    <router-view/>
  </div>
</template>

<script src="./app.js"></script>
<style lang="scss" src="./app_global.scss"></style>
<style lang="scss" scoped src="./app.scss"></style>
