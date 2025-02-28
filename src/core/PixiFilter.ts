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
} from "../utils/shadersUtils";
import type { FilterOptions, FilterType, FilterCreator } from "@/utils/types";

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
   */
  public async loadImage(imageSource: string): Promise<void> {
    if (this.isDestroyed) {
      throw new Error("PixiFilter instance has been destroyed");
    }
    try {
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
   * @param filterType - 滤镜类型
   * @returns 处理后的图片Base64数据
   */
  public applyFilter(filterType: FilterType): string {
    if (!this.sprite) {
      throw new Error("No image loaded");
    }

    // 清除当前滤镜
    if (this.currentFilter) {
      this.sprite.filters = [];
    }

    // 创建新滤镜
    const filterCreator = this.getFilterCreator(filterType);
    if (!filterCreator) {
      throw new Error(`Unsupported filter type: ${filterType}`);
    }

    // 应用滤镜
    if (filterType === "mosaic") {
      // 类型断言确保 TypeScript 知道这是 mosaic 滤镜创建函数
      this.currentFilter = (
        filterCreator as (options: {
          width: number;
          height: number;
        }) => PIXI.Filter
      )({
        width: this.sprite.width,
        height: this.sprite.height,
      });
    } else if (filterType === "gaussian") {
      // 类型断言确保 TypeScript 知道这是 gaussian 滤镜创建函数
      this.currentFilter = (
        filterCreator as (sprite: PIXI.Sprite) => PIXI.Filter
      )(this.sprite);
    } else {
      // 类型断言确保 TypeScript 知道这是无参数滤镜创建函数
      this.currentFilter = (filterCreator as () => PIXI.Filter)();
    }

    // 只有当滤镜存在时才应用滤镜，否则保持原图
    if (this.currentFilter) {
      this.sprite.filters = [this.currentFilter];
    } else {
      this.sprite.filters = [];
    }

    // 渲染并返回结果
    return this.getProcessedImageData();
  }

  /**
   * 批量应用多个滤镜效果
   * @param filterTypes - 滤镜类型数组
   * @returns 处理后的图片Base64数据数组，每个元素包含滤镜类型和处理结果
   */
  public applyFilters(
    filterTypes: FilterType[]
  ): Array<{ type: FilterType; result: string }> {
    if (!this.sprite) {
      throw new Error("No image loaded");
    }

    return filterTypes.map((filterType) => ({
      type: filterType,
      result: this.applyFilter(filterType),
    }));
  }

  /**
   * 获取处理后的图片数据
   */
  private getProcessedImageData(): string {
    this.app.render();
    // 将 app.view 转换为 HTMLCanvasElement 以使用 toDataURL 方法
    const canvas = this.app.view as unknown as HTMLCanvasElement;
    return canvas.toDataURL("image/png");
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
