<template>
  <div
    class="search-bar"
    :class="{
      'search-bar-focused': isFocused,
      'search-bar-with-button': showButton,
      'search-bar-rounded': rounded,
      'search-bar-dark': dark,
      'search-bar-sm': size === 'sm',
      'search-bar-lg': size === 'lg',
    }"
  >
    <div class="search-icon">
      <search-icon :size="iconSize" />
    </div>

    <input
      ref="inputRef"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keyup.enter="handleSearch"
    />

    <div v-if="modelValue && clearable" class="clear-icon" @click="clearSearch">
      <x-icon :size="iconSize" />
    </div>

    <button v-if="showButton" class="search-button" @click="handleSearch">
      <span v-if="buttonText">{{ buttonText }}</span>
      <search-icon v-else :size="iconSize" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search as SearchIcon, X as XIcon } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
  showButton: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    default: "",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "search", "clear"]);

const isFocused = ref(false);
const inputRef = ref(null);

const iconSize = computed(() => {
  switch (props.size) {
    case "sm":
      return 14;
    case "lg":
      return 20;
    default:
      return 16;
  }
});

const handleSearch = () => {
  emit("search", props.modelValue);
};

const clearSearch = () => {
  emit("update:modelValue", "");
  emit("clear");
  inputRef.value?.focus();
};

// Autofocus the input if the autofocus prop is true
if (props.autofocus) {
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 0 12px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  width: 100%;
  position: relative;
}

.search-bar-dark {
  background-color: rgba(0, 0, 0, 0.5);
}

.search-bar-dark.search-bar-focused {
  border-color: rgba(255, 255, 255, 0.2);
  background-color: rgba(0, 0, 0, 0.7);
}

.search-bar:not(.search-bar-dark) {
  background-color: rgba(255, 255, 255, 0.1);
}

.search-bar:not(.search-bar-dark).search-bar-focused {
  border-color: rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.15);
}

.search-bar-rounded {
  border-radius: 9999px;
}

.search-icon {
  color: #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  padding: 10px 8px;
  font-size: 14px;
  width: 100%;
}

.search-bar input::placeholder {
  color: #a0a0a0;
}

.clear-icon {
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-icon:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
}

.search-button {
  background-color: #60a5fa;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.search-button:hover {
  background-color: #3b82f6;
}

.search-bar-with-button {
  padding-right: 8px;
}

/* Size variants */
.search-bar-sm {
  height: 32px;
}

.search-bar-sm input {
  font-size: 12px;
  padding: 8px 6px;
}

.search-bar-sm .search-button {
  padding: 4px 10px;
  font-size: 12px;
}

.search-bar:not(.search-bar-sm):not(.search-bar-lg) {
  height: 40px;
}

.search-bar-lg {
  height: 48px;
}

.search-bar-lg input {
  font-size: 16px;
  padding: 12px 10px;
}

.search-bar-lg .search-button {
  padding: 8px 16px;
  font-size: 16px;
}
</style>
