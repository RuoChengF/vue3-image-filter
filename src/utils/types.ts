import * as PIXI from "pixi.js";
import { TiltShiftFilter } from "pixi-filters";

// 滤镜选项接口
export interface FilterOptions {
  width?: number;
  height?: number;
}

// 马赛克滤镜选项接口
export interface MosaicFilterOptions {
  width: number;
  height: number;
}

// 滤镜参数接口
export interface FilterParams {
  natural: {
    brightness: number;
    saturation: number;
    contrast: number;
    temperature: number;
    gamma: number;
  };
  defogging: {
    fogAmount: number;
  };
  sharpen: {
    dimensions: [number, number];
    strength: number;
  };
  vintage: {
    sepia: number;
    noise: number;
    scratch: number;
  };
  colorSplit: {
    offset: [number, number];
    angle: number;
  };
  mosaic: {
    uTileSize: { x: number; y: number }; // 像素块大小
  };
}

// 滤镜创建函数类型
export type FilterCreator = {
  natural: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["natural"]
  ) => PIXI.Filter;
  defogging: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["defogging"]
  ) => PIXI.Filter;
  sharpen: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["sharpen"]
  ) => PIXI.Filter;
  grayscale: (sprite: PIXI.Sprite, filterParams?: null) => PIXI.Filter;
  invert: (sprite: PIXI.Sprite, filterParams?: null) => PIXI.Filter;
  vintage: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["vintage"]
  ) => PIXI.Filter;
  mosaic: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["mosaic"]
  ) => PIXI.Filter;
  gaussian: (sprite: PIXI.Sprite, filterParams?) => TiltShiftFilter;
  colorSplit: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["colorSplit"]
  ) => PIXI.Filter;
};

// 滤镜类型字符串联合类型
export type FilterType = keyof FilterCreator;

// 批量处理滤镜时传入的数据类型
/**
 * 批量处理滤镜时传入的数据类型
 *  @filterType - 滤镜类型
 *  @label - 滤镜名称
 *  @result - 处理后的图片Base64数据
 */
export type BatchFilterData = {
  filterType: FilterType;
  label?: string;
  result: string;
  filterParams?: Partial<FilterParams[keyof FilterParams]>;
};
