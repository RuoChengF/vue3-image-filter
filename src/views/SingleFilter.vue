<template>
  <div class="single-filter">
    <div class="upload-area">
      <!-- <input type="file" @change="handleImageUpload" accept="image/*" /> -->
      <singleUploadImg @handleGetEmits="handleGetEmits" />
      <el-button type="primary" @click="handleUseDefault"
        >使用默认图片</el-button
      >
    </div>
    <div class="filter-controls" v-if="currentImage">
      <el-select v-model="currentFilter" placeholder="选择滤镜效果">
        <el-option
          v-for="filter in filterOptions"
          :key="filter.value"
          :label="filter.label"
          :value="filter.value"
        />
      </el-select>
      <el-button type="primary" @click="applyFilter">应用滤镜</el-button>
    </div>
    <div class="preview-area" v-if="processedImage">
      <img :src="processedImage.result" :alt="currentFilter" />
      <p>{{ getFilterLabel(currentFilter) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import singleUploadImg from "@/components/Upload/singleUploadImg.vue";

import { ref, onMounted, onBeforeUnmount, toRefs } from "vue";
import { PixiFilter } from "@/core/PixiFilter";
import { BatchFilterData, FilterType } from "@/utils/types";
import { ElSelect, ElOption, ElButton } from "element-plus";
import defaultImage from "@/assets/default.webp";
const currentImage = ref<string>("");
const currentFilter = ref<FilterType>("natural");
const processedImage = ref<any>(null);
let filter: PixiFilter | null = null;

const filterOptions = [
  { value: "natural", label: "自然效果" },
  { value: "grayscale", label: "黑白效果" },
  { value: "vintage", label: "老照片效果" },
  { value: "invert", label: "反色效果" },
  { value: "defogging", label: "去雾效果" },
  { value: "sharpen", label: "锐化效果" },
  { value: "mosaic", label: "马赛克效果" },
  { value: "gaussian", label: "高斯模糊效果" },
  { value: "colorSplit", label: "颜色分离效果" },
];

onMounted(() => {
  filter = new PixiFilter({
    width: 600,
    height: 600,
  });
});

const handleGetEmits = async (data: any) => {
  if (filter) {
    currentImage.value = data as string;
    await filter?.loadImage(currentImage.value);
    applyFilter();
  }
};
const handleUseDefault = async () => {
  currentImage.value = defaultImage as string;
  await filter?.loadImage(currentImage.value);
  applyFilter();
};
const applyFilter = () => {
  if (filter && currentImage.value) {
    // 直接传入滤镜类型字符串
    const params: BatchFilterData = {
      filterType: currentFilter.value,
      label: getFilterLabel(currentFilter.value),
      result: "",
      filterParams: {},
    };
    processedImage.value = filter.applyFilter(params);
  }
};

const getFilterLabel = (value: string) => {
  return filterOptions.find((option) => option.value === value)?.label || "";
};

onBeforeUnmount(() => {
  if (filter) {
    filter.destroy();
    filter = null;
  }
});
</script>

<style scoped>
.single-filter {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.filter-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.preview-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-area img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
