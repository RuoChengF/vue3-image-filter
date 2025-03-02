<template>
  <el-upload
    ref="upload"
    class="upImg"
    action="#"
    :limit="1"
    :show-file-list="false"
    :http-request="handleUpload"
    :on-error="handleError"
    :accept="accept"
    :before-upload="handleBeforeUpload"
  >
    <template #trigger>
      <el-button class="editBox" plain>
        <svg-icon icon-class="uploadimgIcon" />
        <span class="btnword">上传图片</span>
      </el-button>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { UploadInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { fileToBase64 } from "@/utils/shadersUtils";
const upload = ref<UploadInstance>();
const accept = ref("image/jpg,image/jpeg,image/png,image/webp");
const fileUrl = ref("");
const emit = defineEmits(["handleGetEmits"]);
// 文件上传
const handleUpload = async (data) => {
  await fileToBase64(data.file)
    .then((base64String) => {
      fileUrl.value = base64String;
      emit("handleGetEmits", base64String);
    })
    .catch((error) => {
      console.error("转换失败:", error);
    });
  upload.value?.clearFiles();
};

const handleError = () => {
  console.log("eeee");
};
// 文件上传前触发
const handleBeforeUpload = (file) => {
  // 拿到文件后缀名
  const fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
  //console.log('文件上传类型', fileType)
  // 当然拉我的需求是只需要图片和pdf，大家有需要可以在此处扩展
  const isJpg = fileType.toLowerCase() === "jpg";
  const isPng = fileType.toLowerCase() === "png";
  const isJpeg = fileType.toLowerCase() === "jpeg";
  const isWebp = fileType.toLowerCase() === "webp";
  // const isavif = fileType === 'avif';

  // 根据后缀名判断文件类型 && !isavif
  if (!isJpg && !isPng && !isJpeg && !isWebp) {
    ElMessage({
      message: "请上传图片类型文件",
      type: "warning",
    });
    // $baseMessage('只能上传图片和pdf格式的文件！', 'error', 'vab-hey-message-error')
    return false;
  }

  return isJpg || isPng || isJpeg || isWebp; //|| isavif
};
</script>
<style lang="scss" scoped>
.update {
  width: 222px;
  height: 32px;
  margin-top: 12px;
  // margin-bottom: 15px;
  // background: #FD2845;
  // border-radius: 4px 4px 4px 4px;

  .editBox {
    width: 222px;
    height: 32px;
    background: #fceff0;
    border-radius: 6px 6px 6px 6px;
    border: 1px solid #fd2845;
    .btnword {
      font-weight: 400;
      font-size: 12px;
      color: #fd2845;
      margin-left: 2px;
    }
  }
}

.upImg {
  .editBox {
    height: 30px;
    background: #fceff0;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #fd2845;
    opacity: 0.85;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #fd2845;
    line-height: 16px;
    margin-right: 0 !important;
  }
}
</style>
