<script setup lang="ts">
import { ref } from "vue";
import { ElMenu, ElMenuItem } from "element-plus";
import Logo from "@/assets/02.jpg";
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <div class="app-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <el-image style="width: 100px; height: 50px" :src="Logo" fit="auto" />
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/index" class="nav-item">总体演示</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/single" class="nav-item">单个滤镜</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/batch" class="nav-item">批量滤镜</router-link>
      </el-menu-item>
    </el-menu>

    <router-view> </router-view>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;

  .el-menu {
    &--horizontal {
      > .el-menu-item:nth-child(1) {
        margin-right: auto;
      }
    }
  }

  .nav-item {
    border-radius: 4px;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
  }
}
</style>
