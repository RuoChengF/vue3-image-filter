# pixi-image-filter

一个基于PixiJS的强大图像滤镜处理库，支持多种滤镜效果，包括自然效果、去雾、锐化、黑白、反色、老照片、马赛克、高斯模糊和颜色分离等。

## 安装

```bash
npm install pixi-image-filter
```

## 使用方法

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

##### destroy

```typescript
destroy(): void
```

销毁实例，释放资源。

## 注意事项

1. 该库依赖于PixiJS，请确保您的项目中已安装`pixi.js@^7.0.0`。
2. 在使用完毕后，请务必调用`destroy()`方法释放资源。
3. 所有滤镜操作都是同步的，但加载图片是异步操作。

## 许可证

MIT
