<template>
  <el-tabs
    v-model="activeName"
    type="card"
    stretch
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="单图" name="single"></el-tab-pane>
    <el-tab-pane label="多图" name="batch"></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
const activeName = ref("single");
const emits = defineEmits(["tabNameChange"]);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  emits("tabNameChange", activeName.value);
};
</script>
