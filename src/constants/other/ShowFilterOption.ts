import { BatchFilterData } from "@/utils/types";

// 定义滤镜列表
export const filterList: BatchFilterData[] = [
  {
    filterType: "blurFilter",
    label: "无滤镜",
    result: "",
    filterParams: {
      blur: 0.5,
    },
    applyFilter: false,
  },
  {
    filterType: "blurFilter",
    label: "模糊滤镜",
    result: "",
    filterParams: {
      blur: 0.5,
    },
    applyFilter: true,
  },

  {
    filterType: "natural",
    label: "自然效果",
    result: "",
    filterParams: {
      brightness: 1.05, // 亮度
      saturation: 1.05, // 饱和度
      contrast: 1.05, // 对比度
      temperature: 0.05, // 色温
      gamma: 1.05, // 伽马值
    },
  },
  { filterType: "grayscale", label: "黑白效果", result: "", filterParams: {} },
  {
    filterType: "vintage",
    label: "老照片效果",
    result: "",
    filterParams: {
      sepia: 0.8, // 80%的复古程度
      noise: 0.2, // 20%的噪点
      scratch: 0.1, // 10%的划痕
    },
  },
  { filterType: "invert", label: "反色效果", result: "", filterParams: {} },
  {
    filterType: "defogging",
    label: "去雾效果",
    result: "",
    filterParams: {
      fogAmount: 0.8, // 去雾强度
    },
  },
  {
    filterType: "sharpen",
    label: "锐化效果",
    result: "",
    filterParams: {
      strength: 0.5, // 锐化强度
    },
  },
  {
    filterType: "mosaic",
    label: "马赛克效果",
    result: "",
    filterParams: {
      uTileSizeX: 10,
      uTileSizeY: 10,
    },
  },
  {
    filterType: "gaussian",
    label: "高斯模糊效果",
    result: "",
    filterParams: {},
  },
  {
    filterType: "colorSplit",
    label: "颜色分离效果",
    result: "",
    filterParams: {
      offset: [5.0, 0.0], // 水平偏移5个像素
      angle: 0.0, // 初始角度为0度
    },
  },
  {
    filterType: "blurFilter",
    label: "模糊滤镜",
    result: "",
    filterParams: {
      blur: 0.5,
    },
  },
  {
    filterType: "brightness",
    label: "亮度调整",
    result: "",
    filterParams: {
      brightness: 1.05, // 亮度
    },
  },
  {
    filterType: "contrast",
    label: "对比度调整",
    result: "",
    filterParams: {
      contrast: 1.0, // 对比度
    },
  },
  {
    filterType: "grayscaleAdjust",
    label: "灰度调整",
    result: "",
    filterParams: {
      grayIntensity: 0.0, // 对比度
    },
  },
  {
    filterType: "invertAdjust",
    label: "反相调整",
    result: "",
    filterParams: {
      invertIntensity: 0.0, // 对比度
    },
  },
  {
    filterType: "saturation",
    label: "饱和度调整",
    result: "",
    filterParams: {
      saturation: 0.0, // 饱和度
    },
  },
  {
    filterType: "customSepia",
    label: "褐色效果",
    result: "",
    filterParams: {
      sepiaIntensity: 0.0, // 褐色效果
    },
  },
];
