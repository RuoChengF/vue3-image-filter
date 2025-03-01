// 导入着色器代码
import naturalShader from "../constants/shaders/basic/natural.frag"; //"../constants/shaders/basic/natural.frag?raw"; //创建自然效果滤镜
import defoggingShader from "../constants/shaders/basic/defogging.frag"; // 创建去雾效果滤镜
import sharpenShader from "../constants/shaders/basic/sharpen.frag"; //创建锐化效果滤镜
import grayscaleShader from "../constants/shaders/basic/grayscale.frag"; // 创建黑白效果滤镜
import invertShader from "../constants/shaders/basic/invert.frag"; // 创建反色效果滤镜
import vintageShader from "../constants/shaders/basic/vintage.frag"; // 创建老照片效果滤镜
// import gaussianBlurShader from "../constants/shaders/basic/gaussianblur.frag"; // 创建高斯模糊滤镜
import colorSplitShader from "../constants/shaders/basic/color-split.frag"; //色调分离
import mosaicShader from "../constants/shaders/basic/mosaic.frag"; // 创建马赛克效果滤镜
import * as PIXI from "pixi.js";
import { TiltShiftFilter } from "pixi-filters";

// 创建自然效果滤镜
export const createNaturalFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    brightness: 1.05, // 亮度
    saturation: 1.05, // 饱和度
    contrast: 1.05, // 对比度
    temperature: 0.05, // 色温
    gamma: 1.05, // 伽马值
  };
  return new PIXI.Filter("", naturalShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建去雾效果滤镜
export const createDefoggingFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    fogAmount: 0.8, // 去雾强度
  };
  return new PIXI.Filter("", defoggingShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建锐化效果滤镜
export const createSharpenFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    strength: 0.5, // 锐化强度
  };
  return new PIXI.Filter("", sharpenShader, {
    dimensions: [sprite.width, sprite.height], // 图像尺寸
    ...defaultParams,
    ...filterParams,
  });
};
// 创建黑白效果滤镜
export const createGrayscaleFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  return new PIXI.Filter("", grayscaleShader);
};

// 创建反色效果滤镜
export const createInvertFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  return new PIXI.Filter("", invertShader);
};

// 创建老照片效果滤镜
export const createVintageFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    sepia: 0.8, // 80%的复古程度
    noise: 0.2, // 20%的噪点
    scratch: 0.1, // 10%的划痕
  };
  return new PIXI.Filter("", vintageShader, {
    ...defaultParams,
    ...filterParams,
  });
};

/**
 * 创建高斯模糊滤镜
 * @param {PIXI.Sprite} sprite - 需要应用模糊效果的精灵对象
 * @param {Object} options - 模糊效果的配置选项
 * @returns {TiltShiftFilter} 返回倾斜位移滤镜实例
 */
export const createGaussianBlurFilter = (
  sprite: PIXI.Sprite,
  filterParams
): TiltShiftFilter => {
  const startPoint = new PIXI.Point(0, 0);
  const endPoint = new PIXI.Point(sprite.width, sprite.height);
  return new TiltShiftFilter(50, 0, startPoint, endPoint);
};

// 创建色调分离滤镜
export const createColorSplitFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    offset: [5.0, 0.0], // 水平偏移5个像素
    angle: 0.0, // 初始角度为0度
  };
  return new PIXI.Filter("", colorSplitShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建马赛克效果滤镜

export const createMosaicFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  console.log("createMosaicFilter", sprite.width, sprite.height);
  const defaultParams = {
    uTileSize: { x: 10, y: 10 }, // 像素块大小
  };
  return new PIXI.Filter("", mosaicShader, {
    uResolution: { x: sprite.width, y: sprite.height }, // 应该是你的画布分辨率
    ...defaultParams,
    ...filterParams,
  });
};
