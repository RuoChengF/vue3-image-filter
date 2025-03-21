<template>
  <div class="batch-filter">
    <div class="upload-area">
      <singleUploadImg @handleGetEmits="handleGetEmits" />
    </div>
    <div class="filter-controls">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item
          v-for="filter in filterList"
          :key="filter.filterType"
          :title="filter.label"
          :name="filter.filterType"
        >
          <div class="filter-params">
            <el-switch
              v-model="filter.active"
              :active-text="filter.active ? '启用' : '禁用'"
              @change="handleFilterChange"
            />
            <div class="slider-container" v-if="filter.active">
              <span class="param-label">{{ filter.filterRange.label }}</span>
              <el-slider
                v-model="filter.filterParams[filter.filterParamsValueKey]"
                :min="filter.filterRange.min"
                :max="filter.filterRange.max"
                :step="filter.filterRange.step"
                @change="handleFilterChange"
              />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="filter-gallery">
      <div class="filter-item" v-if="processedImages?.result">
        <img :src="processedImages.result" :alt="'叠加效果'" />
        <p>叠加效果预览</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import singleUploadImg from "@/components/Upload/singleUploadImg.vue";
import { ElCollapse, ElCollapseItem, ElSlider, ElSwitch } from "element-plus";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { PixiFilter } from "@/core/PixiFilter";
import { BatchFilterData } from "@/utils/types";

const processedImages = ref<BatchFilterData>();
const activeCollapse = ref<string[]>([]);
let filter: PixiFilter | null = null;
let currentImage = ref<string>("");

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

// 处理滤镜参数变化
const handleFilterChange = async () => {
  if (filter && currentImage.value) {
    const activeFilters = filterList.filter((f) => f.active);
    if (activeFilters.length > 0) {
      processedImages.value = filter.applyFilterWithParams(activeFilters);
    } else {
      // 如果没有激活的滤镜，重置为原图
      await filter.loadImage(currentImage.value);
      processedImages.value = {
        filterType: "original",
        label: "原图",
        result: filter.app.view.toDataURL("image/png"),
        active: false,
      };
    }
  }
};

// 处理图片上传
const handleGetEmits = async (data: any) => {
  if (filter) {
    const base64 = data as string;
    currentImage.value = base64;
    await filter.loadImage(base64);
    handleFilterChange();
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

.filter-controls {
  margin: 20px 0;
  max-width: 800px;
}

.filter-params {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.param-label {
  min-width: 80px;
  font-size: 14px;
}

:deep(.el-slider) {
  flex: 1;
}
</style>
