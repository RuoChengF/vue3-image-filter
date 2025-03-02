<template>
  <div class="filter-com">
    <div class="filter-preview">
      <p>当前选中效果:{{ filterDataCopy[0]?.label }}</p>
      <el-image
        style="width: 500px; height: 500px"
        :src="filterDataCopy[0]?.result"
        fit="fill"
      />
    </div>
    <div class="filter-options">
      <p>控制器</p>
      <div v-if="Object.keys(currentParams).length">
        <div v-for="(value, key) in paramsRange" class="filter-option">
          <el-tag type="primary">{{ paramsRange[key].label }}</el-tag>
          <el-slider
            :min="paramsRange[key].min"
            :max="paramsRange[key].max"
            :step="paramsRange[key].step"
            v-model="currentParams[key]"
            show-input
            @change="handleParamsChange"
          >
          </el-slider>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { filterParamsRange } from "@/utils/shadersUtils";
import { PixiFilter } from "@/core/PixiFilter";
import { BatchFilterData, FilterType } from "@/utils/types";
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect,
} from "vue";
const props = defineProps(["filterData"]);
let filter: PixiFilter | null = null;

// 创建响应式副本数据
const filterDataCopy = reactive({
  ...JSON.parse(JSON.stringify(props.filterData)),
});
const currentParams = computed(() => filterDataCopy[0]?.filterParams || {});
const paramsRange = computed(() => {
  if (filterDataCopy[0]?.filterType) {
    return filterParamsRange[filterDataCopy[0].filterType];
  }
  return {};
});
const handleParamsChange = async () => {
  if (!filter || !filterDataCopy[0]?.originalImage) {
    console.error("滤镜或原始图片不存在");
    return;
  }

  try {
    await filter.loadImage(filterDataCopy[0].originalImage);
    const params: BatchFilterData = {
      filterType: filterDataCopy[0]?.filterType,
      label: filterDataCopy[0]?.label,
      result: "",
      filterParams: {
        ...currentParams.value,
      },
    };
    filterDataCopy[0].result = filter.applyFilter(params).result;
  } catch (error) {
    console.error("应用滤镜参数失败:", error);
  }
};
onMounted(() => {
  filter = new PixiFilter({
    width: 500,
    height: 500,
  });

  setTimeout(() => {
    handleParamsChange();
  }, 100);
});

watch(
  () => props.filterData,
  (newVal) => {
    Object.assign(filterDataCopy, newVal);
  }
);
</script>
<style lang="scss" scoped>
.filter-com {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .filter-preview {
    width: 50%;
  }
  .filter-options {
    width: 50%;
    .filter-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 50%;
      height: 50px;
      gap: 20px;
    }
    // background: #ccc;
  }
}
</style>
