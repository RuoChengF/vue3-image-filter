<!-- src/components/ImageProcessor.vue -->
<template>
  <div class="image-processor">
    <div class="controls">
      <button @click="applyEffect('natural')">自然</button>
      <button @click="applyEffect('defogging')">去雾</button>
      <button @click="applyEffect('sharpen')">锐化</button>
      <button @click="applyEffect('grayscale')">黑白</button>
      <button @click="applyEffect('invert')">反色</button>
      <button @click="applyEffect('vintage')">老照片效果</button>
      <button @click="applyEffect('mosaic')">马赛克</button>
      <button @click="applyEffect('gaussian')">高斯模糊</button>
      <button @click="applyEffect('colorSplit')">颜色分离</button>
    </div>
    <div class="processed-images">
      <div
        v-for="(img, index) in processedImages"
        :key="index"
        class="processed-image"
      >
        <img :src="img.dataUrl" :alt="img.filterName" />
        <p>{{ img.filterName }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as PIXI from "pixi.js";
import img1 from "@/assets/02.jpg";
import {
  createNaturalFilter,
  createDefoggingFilter,
  createSharpenFilter,
  createGrayscaleFilter,
  createInvertFilter,
  createMosaicFilter,
  createVintageFilter,
  createGaussianBlurFilter,
  createColorSplitFilter,
} from "@/utils/shadersUtils";
// import {TiltShift} form "pixi-filters"
// 组件状态
const canvas = ref(null);
let app = null;
let sprite = null;
let currentFilter = null;

// 存储处理后的图片
const processedImages = ref([]);

// 定义滤镜数组
const filters = [
  { name: "natural", create: createNaturalFilter, label: "自然" },
  { name: "defogging", create: createDefoggingFilter, label: "去雾" },
  { name: "sharpen", create: createSharpenFilter, label: "锐化" },
  { name: "grayscale", create: createGrayscaleFilter, label: "黑白" },
  { name: "invert", create: createInvertFilter, label: "反色" },
  { name: "vintage", create: createVintageFilter, label: "老照片效果" },
  { name: "mosaic", create: createMosaicFilter, label: "马赛克" },
  { name: "gaussian", create: createGaussianBlurFilter, label: "高斯模糊" },
  { name: "colorSplit", create: createColorSplitFilter, label: "颜色分离" },
];

// 初始化PIXI应用
const initPixi = () => {
  app = new PIXI.Application({
    view: canvas.value,
    width: 800,
    height: 800,
    backgroundColor: "#ffffffff",
  });

  // 加载图片
  PIXI.Assets.load(img1).then((texture) => {
    sprite = new PIXI.Sprite(texture);
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
    app.stage.addChild(sprite);

    // 自动应用所有滤镜效果
    filters.forEach((filter) => {
      applyEffect(filter.name);
    });
  });
};

// 获取处理后的图片数据URL
const getProcessedImageDataUrl = () => {
  app.render(); // 确保在获取数据前进行一次渲染更新
  return app.view.toDataURL("image/png");
};

// 应用滤镜效果
const applyEffect = (effectName) => {
  const filterConfig = filters.find((f) => f.name === effectName);
  if (!filterConfig) return;

  if (currentFilter) {
    sprite.filters = [];
  }

  // 创建并应用滤镜
  if (effectName === "mosaic") {
    currentFilter = filterConfig.create({
      width: sprite.width,
      height: sprite.height,
    });
  } else if (effectName === "gaussian") {
    currentFilter = filterConfig.create(sprite);
  } else {
    currentFilter = filterConfig.create();
  }

  if (currentFilter) {
    sprite.filters = [currentFilter];
    // 获取处理后的图片并保存
    const dataUrl = getProcessedImageDataUrl();
    processedImages.value.push({
      filterName: filterConfig.label,
      dataUrl: dataUrl,
    });
  }
};

onMounted(() => {
  initPixi();
});

onUnmounted(() => {
  if (app) {
    app.destroy(true);
  }
});
</script>
<style scoped>
.image-processor {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

.processed-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 20px;
}

.processed-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.processed-image img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.processed-image p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
