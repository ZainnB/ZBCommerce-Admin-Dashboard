<template>
  <div
    class="file-upload"
    :class="{
      'file-upload-dragover': isDragOver,
      'file-upload-has-file': !!preview,
      'file-upload-disabled': disabled,
    }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <input
      ref="fileInput"
      type="file"
      class="file-input"
      :accept="accept"
      :disabled="disabled"
      @change="handleFileChange"
    />

    <div v-if="preview" class="file-preview">
      <img :src="preview" alt="Preview" class="preview-image" />
      <button
        v-if="!disabled"
        class="remove-file-btn"
        @click.stop="removeFile"
        type="button"
      >
        <x-icon size="16" />
      </button>
    </div>

    <div v-else class="upload-placeholder" @click="triggerFileInput">
      <div class="upload-icon">
        <image-icon v-if="fileType === 'image'" size="24" />
        <file-icon v-else size="24" />
      </div>
      <div class="upload-text">
        <span class="upload-title">{{ placeholder }}</span>
        <span class="upload-subtitle">Drag & drop or click to browse</span>
      </div>
    </div>

    <div v-if="error" class="file-error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Image as ImageIcon,
  File as FileIcon,
  X as XIcon,
} from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: [File, null],
    default: null,
  },
  preview: {
    type: String,
    default: "",
  },
  accept: {
    type: String,
    default: "imageg, ".*"))) {
    emit("error", `Invalid file type. Please upload a ${props.accept} file.`);
    return;
  }

  
  if (file.size > props.maxSize) {
    const maxSizeMB = props.maxSize / (1024 * 1024);
    emit("error", `File is too large. Maximum size is ${maxSizeMB}MB.`);
    return;
  }

  emit("update:modelValue", file);

  
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      emit("update:preview", e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeFile = () => {
  emit("update:modelValue", null);
  emit("update:preview", "");
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};
</script>

<style scoped>
.file-upload {
  position: relative;
  width: 100%;
  min-height: 200px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.2s ease;
}

.file-upload-dragover {
  border-color: #60a5fa;
  background-color: rgba(96, 165, 250, 0.05);
}

.file-upload-has-file {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.3);
}

.file-upload-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.upload-icon {
  margin-bottom: 16px;
  color: #a0a0a0;
}

.upload-text {
  text-align: center;
}

.upload-title {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.upload-subtitle {
  display: block;
  font-size: 14px;
  color: #a0a0a0;
}

.file-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.remove-file-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ffffff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-file-btn:hover {
  background-color: rgba(248, 113, 113, 0.8);
}

.file-error {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(248, 113, 113, 0.9);
  color: #ffffff;
  padding: 8px 12px;
  font-size: 12px;
  text-align: center;
}
</style>
