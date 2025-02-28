# pixi-image-filter

一个基于PixiJS的强大图像滤镜处理库，支持多种滤镜效果，包括自然效果、去雾、锐化、黑白、反色、老照片、马赛克、高斯模糊和颜色分离等。

## 安装

```bash
npm install pixi-image-filter
```

## 基本使用方法

```typescript
import { PixiFilter } from 'pixi-image-filter';

// 创建滤镜实例
const filter = new PixiFilter({
  width: 800,  // 可选，默认800
  height: 800  // 可选，默认800
});

// 加载图片
await filter.loadImage('path/to/your/image.jpg');

// 应用滤镜
const processedImageBase64 = filter.applyFilter('natural'); // 返回处理后的图片Base64数据

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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PixiFilter } from 'pixi-image-filter';
import type { FilterType } from 'pixi-image-filter';

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
      processedImage.value = filter.applyFilter(currentFilter.value);
    };
    reader.readAsDataURL(file);
  }
};

// 监听滤镜类型变化
watch(currentFilter, () => {
  if (filter && processedImage.value) {
    processedImage.value = filter.applyFilter(currentFilter.value);
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

### 3. 批量应用多个滤镜

```vue
<!-- BatchFilter.vue -->
<template>
  <div class="batch-filter">
    <div v-if="processedImages.length > 0" class="filter-results">
      <div v-for="(image, index) in processedImages" :key="index" class="filter-result">
        <h3>{{ image.type }}</h3>
        <img :src="image.result" :alt="image.type" />
      </div>
    </div>
    <input type="file" @change="handleImageUpload" accept="image/*" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PixiFilter } from 'pixi-image-filter';
import type { FilterType } from 'pixi-image-filter';

const processedImages = ref<Array<{ type: FilterType; result: string }>>([]);
let filter: PixiFilter | null = null;

// 要应用的滤镜列表
const filterTypes: FilterType[] = [
  'natural',
  'vintage',
  'grayscale',
  'colorSplit'
];

onMounted(() => {
  filter = new PixiFilter({
    width: 800,
    height: 800
  });
});

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file && filter) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await filter.loadImage(base64);
      processedImages.value = filter.applyFilters(filterTypes);
    };
    reader.readAsDataURL(file);
  }
};

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
}

.filter-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.filter-result {
  text-align: center;
}

.filter-result img {
  max-width: 100%;
  height: auto;
}
</style>
```

## 支持的滤镜类型

- `natural`: 自然效果滤镜
- `defogging`: 去雾效果
- `sharpen`: 锐化效果
- `grayscale`: 黑白效果
- `invert`: 反色效果
- `vintage`: 老照片效果
- `mosaic`: 马赛克效果
- `gaussian`: 高斯模糊效果
- `colorSplit`: 颜色分离效果

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
applyFilter(filterType: FilterType): string
```

应用指定类型的滤镜，返回处理后的图片Base64数据。

##### applyFilters

```typescript
applyFilters(filterTypes: FilterType[]): Array<{ type: FilterType; result: string }>
```

批量应用多个滤镜，返回包含滤镜类型和处理结果的数组。

##### destroy

```typescript
destroy(): void
```

销毁实例，释放资源。

## 注意事项

1. 该库依赖于PixiJS，请确保您的项目中已安装`pixi.js@^7.0.0`。
2. 在Vue组件中使用时，请确保在组件卸载前调用`destroy()`方法释放资源。
3. 所有滤镜操作都是同步的，但加载图片是异步操作。
4. 在处理大尺寸图片时，建议适当调整`width`和`height`参数以获得更好的性能。
5. 返回的Base64图片数据可以直接用于`<img>`标签的`src`属性。

## 许可证

MIT
