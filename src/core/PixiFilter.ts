import * as PIXI from "pixi.js";
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
  createBlurFilter,
  createBrightnessFilter,
  createContrastFilter,
  createGrayscaleAdjustFilter,
  createInvertAdjustFilter,
  createSaturationFilter,
  createCustomSepiaFilter,
} from "../utils/shadersUtils";
import type {
  FilterOptions,
  FilterType,
  FilterCreator,
  BatchFilterData,
} from "../utils/types";

export class PixiFilter {
  private app: PIXI.Application;
  private sprite: PIXI.Sprite | null = null;
  private currentFilter: PIXI.Filter | null = null;
  private isDestroyed: boolean = false;

  constructor(options: FilterOptions = {}) {
    this.app = new PIXI.Application({
      width: options.width || 800,
      height: options.height || 800,
      backgroundColor: "#ffffffff",
    });
  }

  /**
   * 加载图片并创建精灵
   * @param imageSource - 图片源（URL或Base64）
   * @param forceUpdate - 是否强制更新图片，默认为true。设置为false时，如果已有图片则不会重新加载
   */
  public async loadImage(
    imageSource: string,
    forceUpdate: boolean = true
  ): Promise<void> {
    if (this.isDestroyed) {
      throw new Error("PixiFilter instance has been destroyed");
    }
    try {
      // 如果forceUpdate为false且已有sprite，则不重新加载图片
      if (!forceUpdate && this.sprite) {
        return;
      }

      if (this.sprite) {
        this.app.stage.removeChild(this.sprite);
        this.sprite.destroy();
      }
      const texture = await PIXI.Assets.load(imageSource);
      this.sprite = new PIXI.Sprite(texture);
      this.sprite.width = this.app.screen.width;
      this.sprite.height = this.app.screen.height;
      this.app.stage.addChild(this.sprite);
    } catch (error) {
      throw new Error(`Failed to load image: ${error}`);
    }
  }

  /**
   * 应用滤镜效果
   * @param filterData - 包含滤镜类型和标签的数据，或直接传入滤镜类型
   * @returns 处理后的数据，包含滤镜类型、标签和处理结果
   */
  public applyFilter(filterData: BatchFilterData): BatchFilterData {
    if (!this.sprite) {
      throw new Error("No image loaded");
    }

    // 清除当前滤镜
    if (this.currentFilter) {
      this.sprite.filters = [];
    }

    // 处理直接传入FilterType的情况
    const filterType = filterData.filterType;
    const normalizedFilterData = filterData;

    // 创建新滤镜
    const filterCreator = this.getFilterCreator(filterType);
    if (!filterCreator) {
      throw new Error(`Unsupported filter type: ${filterType}`);
    }

    // 检查是否应用滤镜，默认为true
    const shouldApplyFilter = normalizedFilterData?.applyFilter ?? true;

    if (shouldApplyFilter) {
      // 应用滤镜
      // 创建基础滤镜并应用自定义参数
      this.currentFilter = (
        filterCreator as (sprite: PIXI.Sprite, filterParams) => PIXI.Filter
      )(this.sprite, normalizedFilterData?.filterParams ?? null);
      // 只有当滤镜存在时才应用滤镜，否则保持原图
      if (this.currentFilter) {
        this.sprite.filters = [this.currentFilter];
      } else {
        this.sprite.filters = [];
      }
    } else {
      // 不应用滤镜，保持原图
      this.sprite.filters = [];
      this.currentFilter = null;
    }

    // 渲染并返回结果
    return this.getProcessedImageData(normalizedFilterData);
  }

  /**
   * 批量应用多个滤镜效果
   * @param filterDataArray - 滤镜数据数组，每个元素包含滤镜类型和标签
   * @returns 处理后的数据数组，每个元素包含滤镜类型和处理结果
   */
  public applyFilters(filterDataArray: BatchFilterData[]): BatchFilterData[] {
    if (!this.sprite) {
      throw new Error("No image loaded");
    }

    return filterDataArray.map((filterData) => this.applyFilter(filterData));
  }

  /**
   * 获取处理后的图片数据
   * @param data - 包含滤镜类型和标签的数据
   * @returns 处理后的数据，包含滤镜类型、标签和处理结果
   */
  private getProcessedImageData(data: BatchFilterData): BatchFilterData {
    this.app.render();
    // 将 app.view 转换为 HTMLCanvasElement 以使用 toDataURL 方法
    const canvas = this.app.view as unknown as HTMLCanvasElement;
    const params = {
      filterType: data.filterType,
      label: data.label,
      result: canvas.toDataURL("image/png"),
      active: false,
      filterParams: data?.filterParams ?? null,
      applyFilter: data?.applyFilter ?? true,
    };
    return params;
  }

  /**
   * 获取滤镜创建函数
   */
  private getFilterCreator(
    filterType: FilterType
  ): FilterCreator[FilterType] | undefined {
    const filterMap: FilterCreator = {
      natural: createNaturalFilter,
      defogging: createDefoggingFilter,
      sharpen: createSharpenFilter,
      grayscale: createGrayscaleFilter,
      invert: createInvertFilter,
      vintage: createVintageFilter,
      mosaic: createMosaicFilter,
      gaussian: createGaussianBlurFilter,
      colorSplit: createColorSplitFilter,
      blurFilter: createBlurFilter,
      brightness: createBrightnessFilter, // 添加亮度滤镜
      contrast: createContrastFilter, // 添加对比度滤镜
      grayscaleAdjust: createGrayscaleAdjustFilter, // 添加灰度调整滤镜
      invertAdjust: createInvertAdjustFilter, // 添加反相调整滤镜
      saturation: createSaturationFilter, // 添加饱和度调整滤镜
      customSepia: createCustomSepiaFilter, // 添加棕褐色滤镜
    };

    return filterMap[filterType];
  }

  /**
   * 销毁实例
   */
  public destroy(): void {
    if (this.isDestroyed) {
      return;
    }
    if (this.sprite) {
      this.sprite.destroy();
      this.sprite = null;
    }
    if (this.currentFilter) {
      this.currentFilter = null;
    }
    if (this.app) {
      this.app.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true,
      });
    }
    this.isDestroyed = true;
  }
}
