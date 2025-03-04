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
import brightnessShader from "../constants/shaders/basic/brightness.frag"; // 导入亮度调整着色器
import contrastShader from "../constants/shaders/basic/contrast.frag"; // 导入对比度调整着色器
import grayscaleAdjustShader from "../constants/shaders/basic/grayscale-adjust.frag"; // 导入灰度
import invertAdjustShader from "../constants/shaders/basic/invert-adjust.frag"; // 导入反相调整着色器
import colorAdjust from "../constants/shaders/basic/colorAdjust.frag"; // 导入饱和度调整着色器
import sepiaCustomShader from "../constants/shaders/basic/sepia-custom.frag"; // 导入自定义褐色着色器
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
  const autoFilterParams = {
    uTileSize: {
      x: filterParams?.uTileSizeX ?? 10,
      y: filterParams?.uTileSizeY ?? 10,
    }, // 像素块大小
  };
  return new PIXI.Filter("", mosaicShader, {
    uResolution: { x: sprite.width, y: sprite.height }, // 应该是你的画布分辨率
    ...defaultParams,
    ...autoFilterParams,
  });
};

// 定义模糊滤镜
export const createBlurFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    blur: filterParams?.blur ?? 0, // 模糊程度
  };

  const startPoint = new PIXI.Point(0, 0);
  const endPoint = new PIXI.Point(sprite.width, sprite.height);
  return new TiltShiftFilter(defaultParams.blur, 0, startPoint, endPoint);
};

// 创建亮度调整滤镜
export const createBrightnessFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    brightness: 1.0, // 默认亮度值，1.0表示原始亮度
  };
  return new PIXI.Filter("", brightnessShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建对比度调整滤镜
export const createContrastFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    contrast: 1.0, // 默认对比度值，1.0表示原始对比度
  };
  return new PIXI.Filter("", contrastShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建灰度调整滤镜
export const createGrayscaleAdjustFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    grayIntensity: 1.0, // 默认灰度强度，1.0表示完全灰度
  };
  return new PIXI.Filter("", grayscaleAdjustShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建反相调整滤镜
export const createInvertAdjustFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    invertIntensity: 1.0, // 默认反相强度，1.0表示完全反相
  };
  return new PIXI.Filter("", invertAdjustShader, {
    ...defaultParams,
    ...filterParams,
  });
};

// 创建饱和度调整滤镜
export const createSaturationFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    saturation: 1.0, // 默认饱和度值，1.0表示原始饱和度
    ...filterParams,
  };
  // 创建颜色矩阵滤镜
  const colorMatrix = new PIXI.ColorMatrixFilter();
  // 应用饱和度调整并返回滤镜实例
  colorMatrix.saturate(defaultParams.saturation);
  return colorMatrix;
};

// 创建自定义褐色调整滤镜
export const createCustomSepiaFilter = (
  sprite: PIXI.Sprite,
  filterParams
): PIXI.Filter => {
  const defaultParams = {
    sepiaIntensity: 1.0, // 默认褐色强度，1.0表示完全褐色效果
  };
  return new PIXI.Filter("", sepiaCustomShader, {
    ...defaultParams,
    ...filterParams,
  });
};
// 创建褐色调整滤镜
// export const createSepiaFilter = (
//   sprite: PIXI.Sprite,
//   filterParams
// ): PIXI.Filter => {
//   const defaultParams = {
//     sepia: 1.0, // 默认褐色强度，1.0表示完全褐色效果
//     ...filterParams,
//   };
//   // 创建颜色矩阵滤镜
//   const colorMatrix = new PIXI.ColorMatrixFilter();
//   // 应用褐色调整并返回滤镜实例
//   colorMatrix.sepia(defaultParams.sepia);
//   return colorMatrix;
// };

// 定义滤镜参数的取值范围和步长
export const filterParamsRange = {
  natural: {
    brightness: { min: 0.5, max: 2.0, step: 0.05, label: "亮度" },
    saturation: { min: 0.0, max: 2.0, step: 0.05, label: "饱和度" },
    contrast: { min: 0.5, max: 2.0, step: 0.05, label: "对比度" },
    temperature: { min: -0.5, max: 0.5, step: 0.05, label: "色温" },
    gamma: { min: 0.5, max: 2.0, step: 0.05, label: "伽马值" },
  },
  defogging: {
    fogAmount: { min: 0.0, max: 1.0, step: 0.1, label: "去雾强度" },
  },
  sharpen: {
    strength: { min: 0.0, max: 1.0, step: 0.1, label: "锐化强度" },
  },
  vintage: {
    sepia: { min: 0.0, max: 1.0, step: 0.1, label: "复古程度" },
    noise: { min: 0.0, max: 1.0, step: 0.1, label: "噪点" },
    scratch: { min: 0.0, max: 1.0, step: 0.1, label: "划痕" },
  },
  colorSplit: {
    offset: {
      min: 0.0,
      max: 10.0,
      step: 1.0,
      label: "偏移量",
    },
    angle: { min: 0.0, max: 360.0, step: 15.0, label: "角度" },
  },
  mosaic: {
    uTileSizeX: { min: 1, max: 50, step: 1, label: "横向像素块大小" },
    uTileSizeY: { min: 1, max: 50, step: 1, label: "纵向像素块大小" },
  },
  blurFilter: {
    blur: { min: 0.0, max: 100.0, step: 0.1, label: "模糊程度" },
  },
  brightness: {
    brightness: { min: 0.0, max: 5.0, step: 0.1, label: "亮度" },
  },
  contrast: {
    contrast: { min: 0.0, max: 5.0, step: 0.1, label: "对比度" },
  },
  grayscaleAdjust: {
    grayIntensity: { min: 0.0, max: 1.0, step: 0.05, label: "灰度强度" },
  },
  invertAdjust: {
    invertIntensity: { min: 0.0, max: 1.0, step: 0.05, label: "反相强度" },
  },
  saturation: {
    saturation: { min: 0.0, max: 3.0, step: 0.1, label: "饱和度" },
  },
  customSepia: {
    sepiaIntensity: { min: 0.0, max: 1.2, step: 0.05, label: "自定义褐色强度" },
  },
};

/**
 * 将File对象转换为base64格式的字符串
 * @param {File} file - 要转换的文件对象
 * @returns {Promise<string>} 返回一个Promise，解析为base64格式的字符串
 *
 * @example
 * // 从文件输入元素获取文件并转换为base64
 * const fileInput = document.getElementById('fileInput') as HTMLInputElement;
 * const file = fileInput.files[0];
 * fileToBase64(file)
 *   .then(base64String => {
 *     console.log('转换后的base64字符串:', base64String);
 *     // 可以将base64字符串用于图片src或其他用途
 *     const imgElement = document.createElement('img');
 *     imgElement.src = base64String;
 *     document.body.appendChild(imgElement);
 *   })
 *   .catch(error => {
 *     console.error('转换失败:', error);
 *   });
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
