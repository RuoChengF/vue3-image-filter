<script setup lang="ts">
import ShaderFilter from "@/components/ShaderFilter.vue";
</script>

<template>
    <div class="app-container">
        <ShaderFilter />
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
