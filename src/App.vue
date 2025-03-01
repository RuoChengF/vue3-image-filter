<script setup lang="ts">
import ImageFilter from "@/components/ImageFilter.vue";
// import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div class="app-container">
    <nav class="nav-menu">
      <router-link to="/" class="nav-item">批量滤镜</router-link>
      <router-link to="/single" class="nav-item">单个滤镜</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
}

.nav-menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.nav-item {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #42b883;
  color: #fff;
}

.router-link-active {
  background-color: #42b883;
  color: #fff;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
