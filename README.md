# vue3-image-filter

一个基于PixiJS的强大图像滤镜处理库，支持多种滤镜效果，包括自然效果、去雾、锐化、黑白、反色、老照片、马赛克、高斯模糊和颜色分离等。

## 安装

```bash
npm install vue3-image-filter
```

或者使用yarn：

```bash
yarn add vue3-image-filter
```

### 依赖要求

- pixi.js: ^7.4.2
- pixi-filters: ^5.0.0

## 基本使用方法

### 简单使用

```typescript
import { PixiFilter } from 'vue3-image-filter';

// 创建滤镜实例
const filter = new PixiFilter({
  width: 800,  // 可选，默认800
  height: 800  // 可选，默认800
});

// 加载图片
await filter.loadImage('path/to/your/image.jpg');

// 应用滤镜
const processedImageBase64 = filter.applyFilter({
  filterType: 'natural',
  label: '自然效果',
  result: ''
}).result;

// 使用完毕后销毁实例
filter.destroy();
```

### 批量应用多个滤镜

```typescript
import { PixiFilter, BatchFilterData } from 'vue3-image-filter';

// 创建滤镜实例
const filter = new PixiFilter();

// 加载图片
await filter.loadImage('path/to/your/image.jpg');

// 定义要应用的滤镜列表
const filterList: BatchFilterData[] = [
  { filterType: 'natural', label: '自然效果', result: '' },
  { filterType: 'grayscale', label: '黑白效果', result: '' },
  { filterType: 'vintage', label: '老照片效果', result: '' },
  { filterType: 'invert', label: '反色效果', result: '' }
];

// 批量应用滤镜
const results = filter.applyFilters(filterList);

// 处理结果
results.forEach(item => {
  console.log(`${item.label}: ${item.result.substring(0, 30)}...`);
});

// 使用完毕后销毁实例
filter.destroy();
```

## 在Vue项目中使用

### 1. 创建图片滤镜组件

```vue
<!-- ImageFilter.vue -->
<template>
  <div class="image-filter">
    <img v-if="processedImage" :src="processedImage" alt="处理后的图片" />
    <div class="filter-controls">
      <select v-model="currentFilter">
        <option value="natural">自然效果</option>
        <option value="defogging">去雾效果</option>
        <option value="sharpen">锐化效果</option>
        <option value="grayscale">黑白效果</option>
        <option value="invert">反色效果</option>
        <option value="vintage">老照片效果</option>
        <option value="mosaic">马赛克效果</option>
        <option value="gaussian">高斯模糊效果</option>
        <option value="colorSplit">颜色分离效果</option>
      </select>
      <input type="file" @change="handleImageUpload" accept="image/*" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { PixiFilter } from 'vue3-image-filter';
import type { FilterType, BatchFilterData } from 'vue3-image-filter';

const processedImage = ref<string>('');
const currentFilter = ref<FilterType>('natural');
let filter: PixiFilter | null = null;

// 初始化滤镜实例
onMounted(() => {
  filter = new PixiFilter({
    width: 800,
    height: 800
  });
});

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file && filter) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await filter.loadImage(base64);
      const result = filter.applyFilter({
        filterType: currentFilter.value,
        label: '当前效果',
        result: ''
      });
      processedImage.value = result.result;
    };
    reader.readAsDataURL(file);
  }
};

// 监听滤镜类型变化
watch(currentFilter, () => {
  if (filter && processedImage.value) {
    const result = filter.applyFilter({
      filterType: currentFilter.value,
      label: '当前效果',
      result: ''
    });
    processedImage.value = result.result;
  }
});

// 组件销毁时清理资源
onBeforeUnmount(() => {
  if (filter) {
    filter.destroy();
    filter = null;
  }
});
</script>

<style scoped>
.image-filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.filter-controls {
  display: flex;
  gap: 10px;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
```

### 2. 在页面中使用组件

```vue
<!-- App.vue 或其他页面组件 -->
<template>
  <div class="app">
    <h1>图片滤镜示例</h1>
    <ImageFilter />
  </div>
</template>

<script setup lang="ts">
import ImageFilter from './components/ImageFilter.vue';
</script>
```

### 3. 批量处理多种滤镜效果示例

```vue
<!-- BatchFilterDemo.vue -->
<template>
  <div class="batch-filter">
    <div class="upload-area">
      <input type="file" @change="handleImageUpload" accept="image/*" />
    </div>
    <div class="filter-gallery" v-if="processedImages.length > 0">
      <div v-for="(img, index) in processedImages" :key="index" class="filter-item">
        <img :src="img.result" :alt="img.label" />
        <p>{{ img.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PixiFilter, BatchFilterData } from 'vue3-image-filter';

const processedImages = ref<BatchFilterData[]>([]);
let filter: PixiFilter | null = null;

// 初始化滤镜实例
onMounted(() => {
  filter = new PixiFilter({
    width: 600,
    height: 600
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
  { filterType: 'colorSplit', label: '颜色分离效果', result: '' }
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
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
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
```

## 支持的滤镜类型及参数

### 自然效果滤镜 (natural)
- brightness: 亮度调节，默认值 1.05
- saturation: 饱和度调节，默认值 1.1
- contrast: 对比度调节，默认值 1.1
- temperature: 色温调节，默认值 0.15
- gamma: 伽马值调节，默认值 1.1

### 去雾效果 (defogging)
- fogAmount: 去雾程度，默认值 0.8

### 锐化效果 (sharpen)
- dimensions: 锐化维度 [width, height]，默认值 [800, 600]
- strength: 锐化强度，默认值 0.5

### 黑白效果 (grayscale)
无参数，直接转换为黑白图像

### 反色效果 (invert)
无参数，直接反转图像颜色

### 老照片效果 (vintage)
- sepia: 褐色程度
- noise: 噪点程度
- scratch: 划痕程度

### 马赛克效果 (mosaic)
- uResolution: 分辨率 {x, y}
- uTileSize: 马赛克块大小 {x, y}

### 高斯模糊效果 (gaussian)
使用PIXI的TiltShiftFilter实现，自动根据图片尺寸调整模糊程度

### 颜色分离效果 (colorSplit)
- offset: 颜色偏移量 [x, y]
- angle: 分离角度

## API文档

### PixiFilter

#### 构造函数

```typescript
new PixiFilter(options?: FilterOptions)
```

##### 参数

- `options.width`: 画布宽度（可选，默认800）
- `options.height`: 画布高度（可选，默认800）

#### 方法

##### loadImage

```typescript
async loadImage(imageSource: string): Promise<void>
```

加载图片，支持URL或Base64格式。

##### applyFilter

```typescript
applyFilter(filterData: BatchFilterData): BatchFilterData
```

应用指定类型的滤镜，返回处理后的图片数据，包含滤镜类型、标签和Base64格式的处理结果。

##### applyFilters

```typescript
applyFilters(filterDataArray: BatchFilterData[]): BatchFilterData[]
```

批量应用多个滤镜，返回包含滤镜类型、标签和处理结果的数组。

##### destroy

```typescript
destroy(): void
```

销毁实例，释放资源。

### 类型定义

#### FilterType

```typescript
type FilterType = 
  | 'natural'
  | 'defogging'
  | 'sharpen'
  | 'grayscale'
  | 'invert'
  | 'vintage'
  | 'mosaic'
  | 'gaussian'
  | 'colorSplit';
```

#### FilterOptions

```typescript
interface FilterOptions {
  width?: number;
  height?: number;
}
```

#### BatchFilterData

```typescript
type BatchFilterData = {
  filterType: FilterType;
  label?: string;
  result: string;
};
```

 
## 注意事项

1. 该库依赖于PixiJS，请确保您的项目中已安装正确版本的依赖：
   - pixi.js@^7.4.2
   - pixi-filters@^5.0.0
2. 在Vue组件中使用时，请确保在组件卸载前调用`destroy()`方法释放资源。
3. 所有滤镜操作都是同步的，但加载图片是异步操作。
4. 在处理大尺寸图片时，建议适当调整`width`和`height`参数以获得更好的性能。
5. 返回的Base64图片数据可以直接用于`<img>`标签的`src`属性。
6. 每个滤镜类型都有其特定的参数设置，请参考滤镜类型及参数部分进行调整。

## 许可证

MIT
