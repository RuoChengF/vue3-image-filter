<template>
  <div class="batch-filter">
    <div class="upload-area">
      <input type="file" @change="handleImageUpload" accept="image/*" />
    </div>
    <div class="filter-gallery" v-if="processedImages.length > 0">
      <div
        v-for="(img, index) in processedImages"
        :key="index"
        class="filter-item"
      >
        <img :src="img.result" :alt="img.label" />
        <p>{{ img.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PixiFilter } from '@/core/PixiFilter';
import { BatchFilterData } from '@/utils/types';

const processedImages = ref<BatchFilterData[]>([]);
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
  { filterType: 'natural', label: '自然效果', result: '' },
  { filterType: 'grayscale', label: '黑白效果', result: '' },
  { filterType: 'vintage', label: '老照片效果', result: '' },
  { filterType: 'invert', label: '反色效果', result: '' },
  { filterType: 'defogging', label: '去雾效果', result: '' },
  { filterType: 'sharpen', label: '锐化效果', result: '' },
  { filterType: 'mosaic', label: '马赛克效果', result: '' },
  { filterType: 'gaussian', label: '高斯模糊效果', result: '' },
  { filterType: 'colorSplit', label: '颜色分离效果', result: '' },
];

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file && filter) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await filter.loadImage(base64);
      // 批量应用所有滤镜
      processedImages.value = filter.applyFilters(filterList);
    };
    reader.readAsDataURL(file);
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