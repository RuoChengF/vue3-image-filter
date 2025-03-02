<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <SlideBar @selectFilter="selectFilter" />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderTab @tabNameChange="tabNameChange" />
        </el-header>
        <el-main>
          <SingleFilter v-if="tabName == 'single'" :filterData="filterData" />
          <BatchFilter v-else />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
// import { PixiFilter } from "@/core/PixiFilter";
import { BatchFilterData } from "@/utils/types";
import HeaderTab from "@/components/HeaderTab.vue";
import SlideBar from "@/components/SlideBar.vue";
import { ref } from "vue";
import SingleFilter from "@/components/TabContent/SingleFilterCom.vue";
import BatchFilter from "@/components/TabContent/BatchFilterCom.vue";
const tabName = ref("single");
const filterData = ref<BatchFilterData[]>([]);
const tabNameChange = (name: string) => {
  tabName.value = name;
};
// 选择滤镜
const selectFilter = (item: BatchFilterData | BatchFilterData[]) => {
  if (Array.isArray(item)) {
    filterData.value = item;
  } else {
    filterData.value = [item];
  }
};
</script>
<style lang="scss">
aside {
  background: #fff;
}
.el-container {
  background: #fff;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
