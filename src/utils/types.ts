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
    // 像素块大小
    uTileSizeX: number;
    uTileSizeY: number;
  };
  blurFilter: {
    blur: number;
  };
  brightness: {
    brightness: number;
  };
  contrast: {
    contrast: number;
  };
  grayscaleAdjust: {
    grayIntensity: number;
  };
  invertAdjust: {
    invertIntensity: number;
  };
  saturation: {
    saturation: number;
  };
  customSepia: {
    sepiaIntensity: number;
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
  blurFilter: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["blurFilter"]
  ) => PIXI.Filter;
  brightness: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["brightness"]
  ) => PIXI.Filter;
  contrast: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["contrast"]
  ) => PIXI.Filter;
  grayscaleAdjust: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["grayscaleAdjust"]
  ) => PIXI.Filter;
  invertAdjust: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["invertAdjust"]
  ) => PIXI.Filter;
  saturation: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["saturation"]
  ) => PIXI.Filter;
  customSepia: (
    sprite: PIXI.Sprite,
    filterParams?: FilterParams["customSepia"]
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
 *  @active - 是否激活 <当前的保留参数>
 */
export type BatchFilterData = {
  filterType: FilterType;
  label?: string;
  result: string;
  filterParams?: Partial<FilterParams[keyof FilterParams]>;
  active?: boolean;
  [key: string]: // 添加索引签名，允许任意额外的字符串属性
  | FilterType
    | string
    | boolean
    | Partial<FilterParams[keyof FilterParams]>
    | undefined
    | any;
};
