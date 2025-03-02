<template>
  <div class="container">
    <singleUploadImg @handleGetEmits="handleGetEmits" />
  </div>

  <div class="sidebar">
    <el-card
      v-for="(item, index) in processedImages"
      :style="{ width: '70px' }"
      shadow="hover"
      :key="index"
      :class="item.active ? 'active' : ''"
      @click="handleSelect(item)"
    >
      <el-image
        :style="{ width: '50px', height: '50px' }"
        :src="item.result"
        fit="fill"
      />
      <p class="footer">{{ item.label }}</p>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { PixiFilter } from "@/core/PixiFilter";
import { BatchFilterData } from "@/utils/types";
import { filterList } from "@/constants/other/ShowFilterOption";
import singleUploadImg from "./Upload/singleUploadImg.vue";
import img1 from "@/assets/02.jpg";
import { onMounted, ref } from "vue";
const setPrivewImg = ref<string>(img1);
const processedImages = ref<BatchFilterData[]>([]);
let filter: PixiFilter | null = null;
// 当前选中的滤镜参数
const currentFilterParams = ref({});
const emits = defineEmits(["selectFilter"]);
// 选择滤镜
const handleSelect = (item: BatchFilterData) => {
  currentFilterParams.value = item.filterParams;
  //    判断当前点击的滤镜是哪个, 为其添加一个active 标识, 并将其他的滤镜的active 标识都设置为false
  processedImages.value.forEach((item) => {
    item["active"] = false;
  });
  item["active"] = true;
  const params = {
    ...item,
    originalImage: setPrivewImg.value,
  };
  emits("selectFilter", params);
};
const handleGetEmits = (data: string) => {
  setPrivewImg.value = data;

  setTimeout(async () => {
    await filter.loadImage(setPrivewImg.value);
    // 批量应用所有滤镜
    processedImages.value = filter.applyFilters(filterList);
    processedImages.value[0].active = true;
    const params = {
      ...processedImages.value[0],
      originalImage: setPrivewImg.value,
    };
    emits("selectFilter", params);
  }, 100);
};
// 初始化滤镜实例
onMounted(async () => {
  filter = new PixiFilter({
    width: 50,
    height: 50,
  });

  await filter.loadImage(img1);
  // 批量应用所有滤镜
  processedImages.value = filter.applyFilters(filterList);
  processedImages.value[0].active = true;
  const params = {
    ...processedImages.value[0],
    originalImage: setPrivewImg.value,
  };
  emits("selectFilter", params);
});
</script>
<style lang="scss" scoped>
.container {
  padding: 10px 0;
}
.sidebar {
  display: flex;
  //   justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  :deep(.el-card__body) {
    padding: 0;
  }
  .footer {
    padding: 0;
    font-size: 12px;
  }
  .active {
    border: 1px solid #409eff;
  }
}
</style>
