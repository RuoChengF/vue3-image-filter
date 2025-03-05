<template>
  <div class="batch-filter">
    <div class="upload-area">
      <singleUploadImg @handleGetEmits="handleGetEmits" />
    </div>
    <div class="filter-gallery">
      <div class="filter-item" v-if="processedImages?.result">
        <img :src="processedImages.result" :alt="processedImages.label" />
        <p>{{ processedImages.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import singleUploadImg from "@/components/Upload/singleUploadImg.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { PixiFilter } from "@/core/PixiFilter";
import { BatchFilterData } from "@/utils/types";

const processedImages = ref<BatchFilterData>();
let filter: PixiFilter | null = null;

// 初始化滤镜实例
onMounted(() => {
  filter = new PixiFilter({
    width: 600,
    height: 600,
  });
});

// 定义滤镜列表
const filterList: BatchFilterData[] = [
  {
    filterType: "blurFilter",
    label: "模糊滤镜",
    result: "",
    active: false,
    filterParams: { blur: 50.0 },
    filterRange: { min: 0.0, max: 100.0, step: 0.1, label: "模糊程度" },
    filterParamsValueKey: "blur",
    overlay: false,
  },
  {
    filterType: "brightness",
    label: "亮度",
    result: "",
    active: false,
    filterParams: { brightness: 4 },
    filterRange: { min: 0.0, max: 5.0, step: 0.1, label: "亮度" },
    filterParamsValueKey: "brightness",
    overlay: false,
  },
];

// 处理图片上传
const handleGetEmits = async (data: any) => {
  if (filter) {
    const base64 = data as string;
    await filter.loadImage(base64);
    // 批量应用所有滤镜
    processedImages.value = filter.applyFilterWithParams(filterList);
    // 应用滤镜并获取结果
  }
};

// 组件销毁时清理资源
onBeforeUnmount(() => {
  if (filter) {
    filter.destroy();
    filter = null;
  }
});
</script>

<style scoped>
.batch-filter {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-item img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
