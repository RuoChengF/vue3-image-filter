<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ElMenu, ElMenuItem } from "element-plus";
import Logo from "@/assets/logo.png";
import { useRoute } from "vue-router";

const route = useRoute();

// 根据路由路径设置菜单索引
const getActiveIndex = (path: string): string => {
  switch (path) {
    case "/index":
      return "1";
    case "/single":
      return "2";
    case "/batch":
      return "3";
    default:
      return "1";
  }
};

// 初始化activeIndex为当前路由对应的菜单索引
const activeIndex = ref(getActiveIndex(route.path));

// 监听路由变化，更新菜单选中状态
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = getActiveIndex(newPath);
  }
);

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
        <router-link to="/index" class="nav-item">
          <el-image style="width: 150px; height: 60px" :src="Logo" fit="fill" />
        </router-link>
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
  overflow: hidden;
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
