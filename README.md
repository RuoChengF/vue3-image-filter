# vue3-image-filter

一个基于PixiJS的图片滤镜处理插件，支持Vue3和Vue2，提供多种图片滤镜效果处理功能。

## 项目案例预览
 [vue3-image-filter](https://https://vue3-image-filter.vercel.app)
## 滤镜参数表

以下是本项目支持的所有滤镜效果及其参数配置：

### 基础滤镜

| 滤镜名称 | 参数 | 默认值 | 取值范围 | 步长 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 自然效果 (natural) | brightness | 1.05 | 0.5-2.0 | 0.05 | 亮度 |
|  | saturation | 1.05 | 0.0-2.0 | 0.05 | 饱和度 |
|  | contrast | 1.05 | 0.5-2.0 | 0.05 | 对比度 |
|  | temperature | 0.05 | -0.5-0.5 | 0.05 | 色温 |
|  | gamma | 1.05 | 0.5-2.0 | 0.05 | 伽马值 |
| 去雾效果 (defogging) | fogAmount | 0.8 | 0.0-1.0 | 0.1 | 去雾强度 |
| 锐化效果 (sharpen) | strength | 0.5 | 0.0-1.0 | 0.1 | 锐化强度 |
| 黑白效果 (grayscale) | - | - | - | - | 无参数 |
| 反色效果 (invert) | - | - | - | - | 无参数 |
| 老照片效果 (vintage) | sepia | 0.8 | 0.0-1.0 | 0.1 | 复古程度 |
|  | noise | 0.2 | 0.0-1.0 | 0.1 | 噪点 |
|  | scratch | 0.1 | 0.0-1.0 | 0.1 | 划痕 |

### 高级滤镜

| 滤镜名称 | 参数 | 默认值 | 取值范围 | 步长 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 色调分离 (colorSplit) | offset | [5.0, 0.0] | 0.0-10.0 | 1.0 | 偏移量 |
|  | angle | 0.0 | 0.0-360.0 | 15.0 | 角度 |
| 马赛克效果 (mosaic) | uTileSizeX | 10 | 1-50 | 1 | 横向像素块大小 |
|  | uTileSizeY | 10 | 1-50 | 1 | 纵向像素块大小 |
| 模糊效果 (blurFilter) | blur | 0 | 0.0-100.0 | 0.1 | 模糊程度 |
| 亮度调整 (brightness) | brightness | 1.0 | 0.0-5.0 | 0.1 | 亮度 |
| 对比度调整 (contrast) | contrast | 1.0 | 0.0-5.0 | 0.1 | 对比度 |
| 灰度调整 (grayscaleAdjust) | grayIntensity | 1.0 | 0.0-1.0 | 0.05 | 灰度强度 |
| 反相调整 (invertAdjust) | invertIntensity | 1.0 | 0.0-1.0 | 0.05 | 反相强度 |
| 饱和度调整 (saturation) | saturation | 1.0 | 0.0-3.0 | 0.1 | 饱和度 |
| 自定义褐色 (customSepia) | sepiaIntensity | 1.0 | 0.0-1.2 | 0.05 | 自定义褐色强度 |

## 特性

- 支持多种滤镜效果：自然效果、黑白效果、老照片效果、反色效果等
- 支持单个滤镜应用和批量滤镜处理
- 基于PixiJS高性能渲染
- 使用TypeScript开发，提供完整类型定义
- 支持Vue3和Vue2项目

## 安装

```bash
npm install vue3-image-filter
# 或
yarn add vue3-image-filter
```

## 基本使用

### 在Vue3中使用

#### 单个滤镜处理

```vue
<template>
  <div>
    <input type="file" @change="handleImageUpload" accept="image/*" />
    <div v-if="processedImage">
      <img :src="processedImage.result" alt="处理后的图片" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { PixiFilter } from 'vue3-image-filter';

const processedImage = ref(null);
let filter = null;

onMounted(() => {
  // 初始化滤镜实例
  filter = new PixiFilter({
    width: 600,
    height: 600
  });
});

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file && filter) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      await filter.loadImage(base64);
      // 应用单个滤镜
      processedImage.value = filter.applyFilter('grayscale');
    };
    reader.readAsDataURL(file);
  }
};

onBeforeUnmount(() => {
  // 组件销毁时清理资源
  if (filter) {
    filter.destroy();
    filter = null;
  }
});
</script>
```

#### 批量滤镜处理

```vue
<template>
  <div>
    <input type="file" @change="handleImageUpload" accept="image/*" />
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

const processedImages = ref([]);
let filter = null;

onMounted(() => {
  // 初始化滤镜实例
  filter = new PixiFilter({
    width: 600,
    height: 600
  });
});

// 定义滤镜列表
const filterList = [
  { filterType: "natural", label: "自然效果", result: "" },
  { filterType: "grayscale", label: "黑白效果", result: "" },
  { filterType: "vintage", label: "老照片效果", result: "" },
  { filterType: "invert", label: "反色效果", result: "" },
  { filterType: "defogging", label: "去雾效果", result: "" },
  { filterType: "sharpen", label: "锐化效果", result: "" },
  { filterType: "mosaic", label: "马赛克效果", result: "" },
  { filterType: "gaussian", label: "高斯模糊效果", result: "" },
  { filterType: "colorSplit", label: "颜色分离效果", result: "" },
  // 使用applyFilter参数返回原图（不应用滤镜）
  { filterType: "natural", label: "原图", result: "", applyFilter: false }
];

// 使用带参数的滤镜处理
const filterParamsList = [
  {
    filterType: "blurFilter",
    label: "模糊滤镜",
    result: "",
    active: false,
    filterParams: { blur: 3.0 },
    filterRange: { min: 0.0, max: 100.0, step: 0.1, label: "模糊程度" },
    filterParamsValueKey: "blur",
    overlay: false
  },
  {
    filterType: "brightness",
    label: "亮度",
    result: "",
    active: false,
    filterParams: { brightness: 0.5 },
    filterRange: { min: 0.0, max: 5.0, step: 0.1, label: "亮度" },
    filterParamsValueKey: "brightness",
    overlay: false
  }
];

// 使用applyFilterWithParams方法应用带参数的滤镜
const processedWithParams = filter.applyFilterWithParams(filterParamsList);

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file && filter) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target.result;
      await filter.loadImage(base64);
      // 批量应用所有滤镜
      processedImages.value = filter.applyFilters(filterList);
    };
    reader.readAsDataURL(file);
  }
};

onBeforeUnmount(() => {
  // 组件销毁时清理资源
  if (filter) {
    filter.destroy();
    filter = null;
  }
});
</script>

<style scoped>
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

## API 参数说明

### PixiFilter 类

#### 构造函数

```typescript
new PixiFilter(options?: FilterOptions)
```

**参数说明：**

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| options | FilterOptions | 否 | {} | 滤镜配置选项 |

**FilterOptions 类型：**

```typescript
interface FilterOptions {
  width?: number;      // 画布宽度，默认800
  height?: number;     // 画布高度，默认800
}
```

#### 方法

##### loadImage

加载图片并创建精灵。

```typescript
async loadImage(imageSource: string): Promise<void>
```

**参数说明：**

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| imageSource | string | 是 | 图片源（URL或Base64） |

##### applyFilter

应用单个滤镜效果。

```typescript
applyFilter(filterData: BatchFilterData | FilterType): BatchFilterData
```

**参数说明：**

| filterType | FilterType | 是 | 滤镜类型 |
| label | string | 否 | 滤镜标签 |
| filterParams | FilterParams | 否 | 滤镜参数 |
| applyFilter | boolean | 否 | 是否应用滤镜，默认为true |

##### applyFilters

批量应用多个滤镜效果。

```typescript
applyFilters(filterDataArray: BatchFilterData[]): BatchFilterData[]
```

**参数说明：**

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| filterDataArray | BatchFilterData[] | 是 | 滤镜数据数组 |

##### applyFilterWithParams

应用带参数的滤镜效果，支持滤镜参数动态调整和效果叠加。

```typescript
applyFilterWithParams(filterDataArray: BatchFilterData[]): BatchFilterData
```

**参数说明：**

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| filterDataArray | BatchFilterData[] | 是 | 滤镜数据数组，包含滤镜参数和范围配置 |

**BatchFilterData 扩展参数：**

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| filterParams | object | 是 | 滤镜参数对象，如 { blur: 3.0 } |
| filterRange | object | 是 | 参数范围配置，包含 min、max、step 和 label |
| filterParamsValueKey | string | 是 | filterParams 中参数的键名 |
| overlay | boolean | 否 | 是否叠加滤镜效果，默认 false |
| active | boolean | 否 | 是否启用该滤镜，默认 false |

##### applyFilterWithParams

应用带参数的滤镜效果，支持滤镜叠加。

```typescript
applyFilterWithParams(filterDataArray: BatchFilterData[]): BatchFilterData[]
```

**参数说明：**

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| filterDataArray | BatchFilterData[] | 是 | 滤镜数据数组，每个元素包含滤镜类型、参数和叠加设置 |

**使用示例：**

```typescript
// 创建滤镜实例
const filter = new PixiFilter();

// 加载图片
await filter.loadImage('image.jpg');

// 定义滤镜配置数组
const filterConfigs = [
  {
    filterType: 'brightness',
    label: '增加亮度',
    filterParams: { brightness: 1.2 },
    overlay: true  // 启用滤镜叠加
  },
  {
    filterType: 'saturation',
    label: '增加饱和度',
    filterParams: { saturation: 1.3 },
    overlay: true  // 在亮度滤镜基础上叠加饱和度滤镜
  }
];

// 应用滤镜并获取结果
const results = filter.applyFilterWithParams(filterConfigs);
```

**说明：**
- `overlay`: 设置为true时，新的滤镜效果会叠加在现有滤镜效果上；设置为false时，会替换现有的滤镜效果
- `filterParams`: 可以根据不同滤镜类型设置对应的参数值，参数范围参考滤镜参数表

##### destroy

销毁实例，释放资源。

```typescript
destroy(): void
```

### 类型定义

#### BatchFilterData

```typescript
interface BatchFilterData {
  filterType: FilterType;  // 滤镜类型
  label: string;           // 滤镜标签
  result: string;          // 处理结果（Base64图片数据）
  filterParams?: any;      // 可选的滤镜参数
  applyFilter?: boolean;   // 是否应用滤镜，默认为true，设置为false时返回原图
  overlay?: boolean;       // 是否叠加滤镜效果，默认为false，设置为true时会在原有效果上叠加新的滤镜
}
```

#### FilterType

```typescript
type FilterType = 
  | "natural"         // 自然效果
  | "defogging"       // 去雾效果
  | "sharpen"         // 锐化效果
  | "grayscale"       // 黑白效果
  | "invert"          // 反色效果
  | "vintage"         // 老照片效果
  | "mosaic"          // 马赛克效果
  | "gaussian"        // 高斯模糊效果
  | "colorSplit"      // 颜色分离效果
  | "blurFilter"      // 模糊滤镜
  | "brightness"      // 亮度调整
  | "contrast"        // 对比度调整
  | "grayscaleAdjust" // 灰度调整
  | "invertAdjust"    // 反相调整
  | "saturation"      // 饱和度调整
  | "customSepia";    // 自定义褐色
```

## 导出内容说明

`vue3-image-filter` 主要导出以下内容：

```typescript
// 主要类
export { PixiFilter } from "./core/PixiFilter";
// 类型定义
export { FilterOptions, BatchFilterData } from "./utils/types";
// 滤镜参数范围配置
export { filterParamsRange } from "./utils/shadersUtils";
```

### filterParamsRange

`filterParamsRange` 是一个用于定义各种滤镜效果参数取值范围的配置对象，可用于构建滤镜参数调节界面。每个滤镜参数都定义了其最小值、最大值、步进值和默认值。

```typescript
const filterParamsRange = {
  natural: {
    brightness: { min: 0.5, max: 2.0, step: 0.05, default: 1.05 },
    saturation: { min: 0.0, max: 2.0, step: 0.05, default: 1.05 },
    contrast: { min: 0.5, max: 2.0, step: 0.05, default: 1.05 },
    temperature: { min: -0.5, max: 0.5, step: 0.05, default: 0.05 },
    gamma: { min: 0.5, max: 2.0, step: 0.05, default: 1.05 }
  },
  // ... 其他滤镜参数范围配置
};
```

## 滤镜效果参数说明

每种滤镜效果可以通过 `filterParams` 参数进行自定义配置。以下是各滤镜支持的参数：

### 自然效果 (natural)

```typescript
{
  filterType: "natural",
  label: "自然效果",
  result: "",
  filterParams: {
    brightness: 1.0,  // 亮度，范围：0.0-2.0，默认：1.0
    contrast: 1.0,    // 对比度，范围：0.0-2.0，默认：1.0
    saturation: 1.0   // 饱和度，范围：0.0-2.0，默认：1.0
  }
}
```

### 去雾效果 (defogging)

```typescript
{
  filterType: "defogging",
  label: "去雾效果",
  result: "",
  filterParams: {
    intensity: 0.5  // 去雾强度，范围：0.0-1.0，默认：0.5
  }
}
```

### 锐化效果 (sharpen)

```typescript
{
  filterType: "sharpen",
  label: "锐化效果",
  result: "",
  filterParams: {
    strength: 0.5  // 锐化强度，范围：0.0-1.0，默认：0.5
  }
}
```

### 黑白效果 (grayscale)

```typescript
{
  filterType: "grayscale",
  label: "黑白效果",
  result: "",
  filterParams: {
    // intensity: 1.0  // 灰度强度，范围：0.0-1.0，默认：1.0 暂未开放
  }
}
```

### 反色效果 (invert)

```typescript
{
  filterType: "invert",
  label: "反色效果",
  result: "",
  filterParams: {
   //  intensity: 1.0  // 反色强度，范围：0.0-1.0，默认：1.0 暂未开放
  }
}
```

### 老照片效果 (vintage)

```typescript
{
  filterType: "vintage",
  label: "老照片效果",
  result: "",
  filterParams: {
    sepia: 0.8,     // 复古程度，范围：0.0-1.0，默认：0.8
    noise: 0.2,     // 噪点，范围：0.0-1.0，默认：0.2
    scratch: 0.1    // 划痕，范围：0.0-1.0，默认：0.1
  }
}
```

### 马赛克效果 (mosaic)

```typescript
{
  filterType: "mosaic",
  label: "马赛克效果",
  result: "",
  filterParams: {
    pixelSize: 10  // 像素大小，范围：1-50，默认：10
  }
}
```

### 高斯模糊效果 (gaussian)

```typescript
{
  filterType: "gaussian",
  label: "高斯模糊效果",
  result: "",
  filterParams: {
    blur: 8,       // 模糊半径，范围：1-20，默认：8
    quality: 4     // 质量，范围：1-10，默认：4，值越高质量越好但性能越低
  }
}
```

### 颜色分离效果 (colorSplit)

```typescript
{
  filterType: "colorSplit",
  label: "颜色分离效果",
  result: "",
  filterParams: {
    redOffset: 10,   // 红色偏移量，默认：10
    greenOffset: -10, // 绿色偏移量，默认：-10
    blueOffset: 5    // 蓝色偏移量，默认：5
  }
}
```

## 注意事项

1. **性能考虑**：处理大尺寸图片时，建议适当调整 `width` 和 `height` 参数，以避免性能问题。

2. **内存管理**：使用完毕后，务必调用 `destroy()` 方法释放资源，特别是在单页应用中频繁创建和销毁组件的场景。

3. **兼容性**：该插件依赖于 WebGL，请确保目标浏览器支持 WebGL 渲染。

4. **图片加载**：支持 URL 和 Base64 格式的图片源，但需注意跨域问题。

5. **滤镜参数**：自定义滤镜参数时，建议在合理范围内调整，过大或过小的值可能导致效果不佳。

6. **滤镜叠加**：使用overlay参数可以实现滤镜效果的叠加，但建议合理搭配滤镜效果，避免过度叠加导致图片失真。

## 许可证

MIT
