<template>
  <div class="product-form-page">
    <div class="page-header">
      <div class="header-content">
        <h2>{{ isEditing ? "Edit Product" : "Create New Product" }}</h2>
        <p class="subtitle">
          {{
            isEditing
              ? "Update product details and inventory information"
              : "Add a new product to your inventory with complete details"
          }}
        </p>
      </div>
      <div class="header-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-line"></div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-grid">
        <div class="form-section image-section">
          <div class="section-header">
            <div class="section-icon">
              <image-icon size="20" />
            </div>
            <div class="section-title">
              <h3>Product Media</h3>
              <p>Upload high-quality product images</p>
            </div>
          </div>

          <div class="image-upload-container">
            <file-upload
              v-model="formData.imageFile"
              v-model:preview="formData.imagePreview"
              accept="image/*"
              placeholder="Upload Product Image"
              :error="errors.image"
              @error="errors.image = $event"
            />
            <div class="upload-guidelines">
              <div class="guideline-item">
                <check-circle-icon size="14" />
                <span>Recommended: 800x800px</span>
              </div>
              <div class="guideline-item">
                <check-circle-icon size="14" />
                <span>Max size: 5MB</span>
              </div>
              <div class="guideline-item">
                <check-circle-icon size="14" />
                <span>Formats: JPG, PNG, WebP</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section details-section">
          <div class="section-header">
            <div class="section-icon">
              <package-icon size="20" />
            </div>
            <div class="section-title">
              <h3>Product Information</h3>
              <p>Essential product details and specifications</p>
            </div>
          </div>

          <div class="form-fields">
            <div class="form-group featured">
              <label for="name" class="form-label">
                <span>Product Name</span>
                <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  :class="{ 'input-error': errors.name }"
                  placeholder="Enter a compelling product name"
                  required
                />
                <div class="input-decoration"></div>
              </div>
              <transition name="error-slide">
                <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
              </transition>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="price" class="form-label">
                  <span>Price (PKR)</span>
                  <span class="required">*</span>
                </label>
                <div class="input-wrapper currency">
                  <span class="currency-symbol">₨</span>
                  <input
                    id="price"
                    v-model="formData.price"
                    type="number"
                    min="0"
                    step="0.01"
                    class="form-input"
                    :class="{ 'input-error': errors.price }"
                    placeholder="0.00"
                    required
                  />
                  <div class="input-decoration"></div>
                </div>
                <transition name="error-slide">
                  <p v-if="errors.price" class="error-text">
                    {{ errors.price }}
                  </p>
                </transition>
              </div>

              <div class="form-group">
                <label for="stock" class="form-label">
                  <span>Initial Stock</span>
                  <span class="required">*</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="stock"
                    v-model="formData.stock"
                    type="number"
                    min="0"
                    step="1"
                    class="form-input"
                    :class="{ 'input-error': errors.stock }"
                    placeholder="0"
                    required
                  />
                  <div class="input-decoration"></div>
                </div>
                <transition name="error-slide">
                  <p v-if="errors.stock" class="error-text">
                    {{ errors.stock }}
                  </p>
                </transition>
              </div>
            </div>

            <div class="form-group">
              <label for="category" class="form-label">
                <span>Category</span>
                <span class="required">*</span>
              </label>
              <div class="select-wrapper">
                <select
                  id="category"
                  v-model="formData.category"
                  class="form-select"
                  :class="{ 'input-error': errors.category }"
                  required
                >
                  <option value="" disabled>Choose a category</option>
                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
                <chevron-down-icon size="16" class="select-icon" />
                <div class="input-decoration"></div>
              </div>
              <transition name="error-slide">
                <p v-if="errors.category" class="error-text">
                  {{ errors.category }}
                </p>
              </transition>
            </div>

            <div class="form-group">
              <label for="description" class="form-label">
                <span>Description</span>
                <span class="optional">(Optional)</span>
              </label>
              <div class="textarea-wrapper">
                <textarea
                  id="description"
                  v-model="formData.description"
                  class="form-textarea"
                  :class="{ 'input-error': errors.description }"
                  placeholder="Describe your product features, benefits, and specifications..."
                  rows="4"
                ></textarea>
                <div class="character-count">
                  {{ formData.description?.length || 0 }}/1000
                </div>
                <div class="input-decoration"></div>
              </div>
              <transition name="error-slide">
                <p v-if="errors.description" class="error-text">
                  {{ errors.description }}
                </p>
              </transition>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="sku" class="form-label">
                  <span>SKU</span>
                  <span class="optional">(Optional)</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="sku"
                    v-model="formData.sku"
                    type="text"
                    class="form-input"
                    placeholder="e.g., PROD-001"
                  />
                  <div class="input-decoration"></div>
                </div>
              </div>

              <div class="form-group">
                <label for="weight" class="form-label">
                  <span>Weight (grams)</span>
                  <span class="optional">(Optional)</span>
                </label>
                <div class="input-wrapper">
                  <input
                    id="weight"
                    v-model="formData.weight"
                    type="number"
                    min="0"
                    step="0.01"
                    class="form-input"
                    placeholder="0.00"
                  />
                  <div class="input-decoration"></div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <span>Product Status</span>
              </label>
              <div class="status-grid">
                <label
                  class="status-card"
                  :class="{ active: formData.status === 'In Stock' }"
                >
                  <input
                    type="radio"
                    v-model="formData.status"
                    value="In Stock"
                    name="status"
                  />
                  <div class="status-icon in-stock">
                    <check-circle-icon size="18" />
                  </div>
                  <div class="status-content">
                    <span class="status-title">In Stock</span>
                    <span class="status-description">Product is available</span>
                  </div>
                </label>

                <label
                  class="status-card"
                  :class="{ active: formData.status === 'Out of Stock' }"
                >
                  <input
                    type="radio"
                    v-model="formData.status"
                    value="Out of Stock"
                    name="status"
                  />
                  <div class="status-icon out-of-stock">
                    <x-circle-icon size="18" />
                  </div>
                  <div class="status-content">
                    <span class="status-title">Out of Stock</span>
                    <span class="status-description"
                      >Currently unavailable</span
                    >
                  </div>
                </label>

                <label
                  class="status-card"
                  :class="{ active: formData.status === 'Restock' }"
                >
                  <input
                    type="radio"
                    v-model="formData.status"
                    value="Restock"
                    name="status"
                  />
                  <div class="status-icon restock">
                    <clock-icon size="18" />
                  </div>
                  <div class="status-content">
                    <span class="status-title">Restock</span>
                    <span class="status-description">Awaiting inventory</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          type="button"
          class="action-btn cancel-btn"
          @click="$router.push('/inventory_management')"
          :disabled="isSubmitting"
        >
          <x-icon size="16" />
          <span>Cancel</span>
        </button>

        <button
          type="submit"
          class="action-btn submit-btn"
          :disabled="isSubmitting"
        >
          <div class="btn-content">
            <loader-icon v-if="isSubmitting" size="16" class="spinner" />
            <save-icon v-else size="16" />
            <span>{{ isEditing ? "Update Product" : "Create Product" }}</span>
          </div>
          <div class="btn-glow"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "@/store";
import { uploadFile } from "@/services/upload";
import { useToast } from "@/services/toast";
import FileUpload from "@/components/ui/FileUpload.vue";
import {
  Loader as LoaderIcon,
  Image as ImageIcon,
  Package as PackageIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  Clock as ClockIcon,
  ChevronDown as ChevronDownIcon,
  X as XIcon,
  Save as SaveIcon,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();
const { showSuccessToast, showErrorToast } = useToast();

const productId = route.params.id;
const isEditing = computed(() => !!productId);

const formData = reactive({
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  sku: "",
  weight: "",
  status: "In Stock",
  imageFile: null,
  imagePreview: "",
  imageUrl: "",
});

const errors = reactive({
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  image: "",
});

const isSubmitting = ref(false);

const categories = [
  "Clothing",
  "Electronics",
  "Footwear",
  "Accessories",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
];

onMounted(async () => {
  if (isEditing.value) {
    await productsStore.fetchProducts();
    const product = productsStore.getProductById(productId);

    if (product) {
      formData.name = product.name;
      formData.price = product.price;
      formData.stock = product.stock;
      formData.category = product.category || "";
      formData.description = product.description || "";
      formData.sku = product.sku || "";
      formData.weight = product.weight || "";
      formData.status = product.status || "In Stock";
      formData.imageUrl = product.image;
      formData.imagePreview = product.image;
    } else {
      showErrorToast("Product not found");
      router.push("/inventory_management");
    }
  }
});

const validateForm = () => {
  let isValid = true;

  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  if (!formData.name.trim()) {
    errors.name = "Product name is required";
    isValid = false;
  } else if (formData.name.length > 100) {
    errors.name = "Product name must be less than 100 characters";
    isValid = false;
  }

  if (!formData.price) {
    errors.price = "Price is required";
    isValid = false;
  } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
    errors.price = "Price must be a positive number";
    isValid = false;
  }

  if (!formData.stock) {
    errors.stock = "Stock is required";
    isValid = false;
  } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
    errors.stock = "Stock must be a positive number";
    isValid = false;
  }

  if (!formData.category) {
    errors.category = "Category is required";
    isValid = false;
  }

  if (formData.description && formData.description.length > 1000) {
    errors.description = "Description must be less than 1000 characters";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    showErrorToast("Please fix the errors in the form");
    return;
  }

  isSubmitting.value = true;

  try {
    let imageUrl = formData.imageUrl;

    if (formData.imageFile) {
      const useCloudinary = false;
      imageUrl = await uploadFile(formData.imageFile, useCloudinary);
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      description: formData.description,
      sku: formData.sku,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      status: formData.status,
      image: imageUrl || "https://via.placeholder.com/200",
    };

    let result;

    if (isEditing.value) {
      result = await productsStore.updateProduct(productId, productData);

      if (result.success) {
        showSuccessToast("Product updated successfully");
        router.push("/inventory_management");
      } else {
        showErrorToast(`Failed to update product: ${result.error}`);
      }
    } else {
      result = await productsStore.addProduct(productData);

      if (result.success) {
        showSuccessToast("Product added successfully");
        router.push("/inventory_management");
      } else {
        showErrorToast(`Failed to add product: ${result.error}`);
      }
    }
  } catch (error) {
    console.error("Error submitting product:", error);
    showErrorToast(`An error occurred: ${error.message}`);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.product-form-page {
  padding: 24px;
  min-height: 100vh;
  position: relative;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.header-content h2 {
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.8px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin-top: 8px;
  font-weight: 400;
}

.header-decoration {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
}

.decoration-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #4ade80);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.decoration-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

.product-form {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 32px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.product-form::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #60a5fa, transparent);
  opacity: 0.5;
}

.form-grid {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  margin-bottom: 32px;
}

.form-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.form-section:hover {
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.section-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #60a5fa20, #60a5fa40);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
}

.section-title h3 {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.section-title p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 4px 0 0 0;
}

.image-upload-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.upload-guidelines {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.guideline-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.guideline-item svg {
  color: #4ade80;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.form-group.featured {
  background: rgba(96, 165, 250, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(96, 165, 250, 0.1);
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #e0e7ff;
  margin-bottom: 4px;
}

.required {
  color: #f87171;
  font-weight: 700;
}

.optional {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  font-weight: 400;
}

.input-wrapper,
.select-wrapper,
.textarea-wrapper {
  position: relative;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 14px 16px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #60a5fa;
  outline: none;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  transform: translateY(-1px);
}

.currency .form-input {
  padding-left: 40px;
}

.currency-symbol {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  z-index: 2;
}

.select-wrapper {
  position: relative;
}

.select-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  z-index: 2;
}

.form-select {
  appearance: none;
  cursor: pointer;
  padding-right: 48px;
}

.textarea-wrapper {
  position: relative;
}

.character-count {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  z-index: 2;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  padding-bottom: 40px;
}

.input-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, #60a5fa, #4ade80);
  transition: width 0.3s ease;
  border-radius: 0 0 10px 10px;
}

.form-input:focus + .input-decoration,
.form-select:focus + .input-decoration,
.form-textarea:focus + .input-decoration {
  width: 100%;
}

.input-error {
  border-color: #f87171 !important;
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1) !important;
}

.error-text {
  color: #f87171;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from,
.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.status-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.status-card:hover::before {
  opacity: 1;
}

.status-card.active {
  border-color: #60a5fa;
  background: rgba(96, 165, 250, 0.1);
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.2);
}

.status-card input {
  display: none;
}

.status-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon.in-stock {
  background: linear-gradient(135deg, #4ade8020, #4ade8040);
  color: #4ade80;
}

.status-icon.out-of-stock {
  background: linear-gradient(135deg, #f8717120, #f8717140);
  color: #f87171;
}

.status-icon.restock {
  background: linear-gradient(135deg, #facc1520, #facc1540);
  color: #facc15;
}

.status-content {
  display: flex;
  flex-direction: column;
}

.status-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.status-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.cancel-btn {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.cancel-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.submit-btn {
  background: linear-gradient(135deg, #4ade80, #60a5fa);
  border: none;
  color: #ffffff;
  position: relative;
  box-shadow: 0 4px 20px rgba(74, 222, 128, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(74, 222, 128, 0.4);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 2;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.submit-btn:hover .btn-glow {
  opacity: 1;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .image-section {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .product-form-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-decoration {
    display: none;
  }

  .product-form {
    padding: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .status-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .action-btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-content h2 {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
