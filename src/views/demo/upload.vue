<!-- 文件上传组件示例 -->
<template>
  <div class="app-container">
    <el-link
      href="https://github.com/ambitiouschild/aioveu-vue3-element-admin/blob/master/src/views/demo/upload.vue"
      type="primary"
      target="_blank"
      class="mb-10"
    >
      示例源码 请点击>>>>
    </el-link>

    <el-form>
      <el-form-item label="单图上传">
        <SingleImageUpload v-model="picUrl" />
      </el-form-item>

      <el-form-item label="多图上传">
        <MultiImageUpload v-model="picUrls" :limit="2" />
      </el-form-item>

      <el-form-item label="文件上传">
        <FileUpload v-model="fileUrls" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import MultiImageUpload from "@/components/Upload/MultiImageUpload.vue";

// 单图
const picUrl = ref("https://minio.aioveu.com/aioveu/20250810/352485413d814dee87d9b7160dfe916e.png");
const picUrls = ref(["https://minio.aioveu.com/aioveu/20250810/352485413d814dee87d9b7160dfe916e.png",
  "https://minio.aioveu.com/aioveu/20250810/352485413d814dee87d9b7160dfe916e.png"]);

const fileUrls = ref([
  { name: "照片1.jpg", url: "https://minio.aioveu.com/aioveu/20250810/352485413d814dee87d9b7160dfe916e.png" },
  { name: "照片2.jpg", url: "https://minio.aioveu.com/aioveu/20250810/352485413d814dee87d9b7160dfe916e.png" },
]);
</script>
