<!--
 * @Author: yangchunpeng ruochengflag@163.com
 * @Date: 2025-02-27 18:10:47
 * @LastEditors: yangchunpeng ruochengflag@163.com
 * @LastEditTime: 2025-02-28 14:56:18
 * @FilePath: /pixiFilter/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import ImageFilter from "@/components/ImageFilter.vue";
// import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div class="app-container">
    <ImageFilter />
    <!-- <HelloWorld /> -->
  </div>
</template>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
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
