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
        uResolution: { x: number; y: number };
        uTileSize: { x: number; y: number };
    };
}

// 滤镜创建函数类型
export type FilterCreator = {
    natural: () => PIXI.Filter;
    defogging: () => PIXI.Filter;
    sharpen: () => PIXI.Filter;
    grayscale: () => PIXI.Filter;
    invert: () => PIXI.Filter;
    vintage: () => PIXI.Filter;
    mosaic: (options: MosaicFilterOptions) => PIXI.Filter;
    gaussian: (sprite: PIXI.Sprite) => TiltShiftFilter;
    colorSplit: () => PIXI.Filter;
};

// 滤镜类型字符串联合类型
export type FilterType = keyof FilterCreator;