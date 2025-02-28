/*
 * @Author: yangchunpeng ruochengflag@163.com
 * @Date: 2025-02-27 18:29:51
 * @LastEditors: yangchunpeng ruochengflag@163.com
 * @LastEditTime: 2025-02-28 11:21:21
 * @FilePath: /pixiFilter/src/utils/shadersUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入着色器代码
import naturalShader from "@/constants/shaders/basic/natural.frag?raw"; //创建自然效果滤镜
import defoggingShader from "@/constants/shaders/basic/defogging.frag?raw"; // 创建去雾效果滤镜
import sharpenShader from "@/constants/shaders/basic/sharpen.frag?raw"; //创建锐化效果滤镜
import grayscaleShader from "@/constants/shaders/basic/grayscale.frag?raw"; // 创建黑白效果滤镜
import invertShader from "@/constants/shaders/basic/invert.frag?raw"; // 创建反色效果滤镜
import vintageShader from "@/constants/shaders/basic/vintage.frag?raw"; // 创建老照片效果滤镜
// import gaussianBlurShader from "@/constants/shaders/basic/gaussianblur.frag?raw"; // 创建高斯模糊滤镜
import colorSplitShader from "@/constants/shaders/basic/color-split.frag?raw"; //色调分离
import mosaicShader from "@/constants/shaders/basic/mosaic.frag?raw"; // 创建马赛克效果滤镜
import * as PIXI from "pixi.js";
import { TiltShiftFilter } from "pixi-filters";

// 创建自然效果滤镜
export const createNaturalFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', naturalShader, {
        brightness: 1.05, // 轻微提高亮度
        saturation: 1.1, // 适度增加饱和度
        contrast: 1.1, // 轻微提升对比度
        temperature: 0.15, // 添加暖色调
        gamma: 1.1, // gamma校正
    });
};

// 创建去雾效果滤镜
export const createDefoggingFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', defoggingShader, {
        fogAmount: 0.8, // 去雾强度
    });
};

// 创建锐化效果滤镜
export const createSharpenFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', sharpenShader, {
        dimensions: [800, 600], // 图像尺寸
        strength: 0.5, // 锐化强度
    });
};
// 创建黑白效果滤镜
export const createGrayscaleFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', grayscaleShader);
};

// 创建反色效果滤镜
export const createInvertFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', invertShader);
};

// 创建老照片效果滤镜
export const createVintageFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', vintageShader, {
        sepia: 0.8, // 80%的复古程度
        noise: 0.2, // 20%的噪点
        scratch: 0.1, // 10%的划痕
    });
};

/**
 * 创建高斯模糊滤镜
 * @param {PIXI.Sprite} sprite - 需要应用模糊效果的精灵对象
 * @param {Object} options - 模糊效果的配置选项
 * @returns {TiltShiftFilter} 返回倾斜位移滤镜实例
 */
export const createGaussianBlurFilter = (sprite: PIXI.Sprite): TiltShiftFilter => {
    const startPoint = new PIXI.Point(0, 0);
    const endPoint = new PIXI.Point(sprite.width, sprite.height);
    return new TiltShiftFilter(50, 0, startPoint, endPoint);
};

// 创建色调分离滤镜
export const createColorSplitFilter = (): PIXI.Filter => {
    return new PIXI.Filter('', colorSplitShader, {
        offset: [5.0, 0.0], // 水平偏移5个像素
        angle: 0.0, // 初始角度为0度
    });
};

// 创建马赛克效果滤镜
interface MosaicFilterOptions {
    width: number;
    height: number;
}

export const createMosaicFilter = ({ width, height }: MosaicFilterOptions): PIXI.Filter => {
    console.log("createMosaicFilter", width, height);

    return new PIXI.Filter('', mosaicShader, {
        uResolution: { x: width, y: height }, // 应该是你的画布分辨率
        uTileSize: { x: 20, y: 20 }, // 马赛克块的大小
    });
};
