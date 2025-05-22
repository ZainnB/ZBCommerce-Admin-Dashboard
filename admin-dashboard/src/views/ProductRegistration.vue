<template>
  <div class="product-form-page">
    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-header">
        <h2>{{ isEditing ? "Edit Product" : "Add New Product" }}</h2>
        <p>
          {{
            isEditing
              ? "Update product details"
              : "Fill in the details to add a new product"
          }}
        </p>
      </div>

      <div class="form-grid">
        <div class="form-image-section">
          <label class="form-label">Product Image</label>
          <file-upload
            v-model="formData.imageFile"
            v-model:preview="formData.imagePreview"
            accept="image/*"
            placeholder="Upload Product Image"
            :error="errors.image"
            @error="errors.image = $event"
          />
          <p class="form-help-text">
            Recommended size: 800x800px. Max size: 5MB.
          </p>
        </div>

        <div class="form-details-section">
          <div class="form-group">
            <label for="name" class="form-label">Product Name*</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-input"
              :class="{ 'input-error': errors.name }"
              placeholder="Enter product name"
              required
            />
            <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="price" class="form-label">Price (Rs)*</label>
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
              <p v-if="errors.price" class="error-text">{{ errors.price }}</p>
            </div>

            <div class="form-group">
              <label for="stock" class="form-label">Initial Stock*</label>
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
              <p v-if="errors.stock" class="error-text">{{ errors.stock }}</p>
            </div>
          </div>

          <div class="form-group">
            <label for="category" class="form-label">Category*</label>
            <select
              id="category"
              v-model="formData.category"
              class="form-select"
              :class="{ 'input-error': errors.category }"
              required
            >
              <option value="" disabled>Select a category</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
            <p v-if="errors.category" class="error-text">
              {{ errors.category }}
            </p>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              :class="{ 'input-error': errors.description }"
              placeholder="Enter product description"
              rows="4"
            ></textarea>
            <p v-if="errors.description" class="error-text">
              {{ errors.description }}
            </p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="sku" class="form-label">SKU</label>
              <input
                id="sku"
                v-model="formData.sku"
                type="text"
                class="form-input"
                placeholder="Enter SKU"
              />
            </div>

            <div class="form-group">
              <label for="weight" class="form-label">Weight (g)</label>
              <input
                id="weight"
                v-model="formData.weight"
                type="number"
                min="0"
                step="0.01"
                class="form-input"
                placeholder="0.00"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Status</label>
            <div class="status-options">
              <label class="status-option">
                <input
                  type="radio"
                  v-model="formData.status"
                  value="In Stock"
                  name="status"
                />
                <span class="status-label in-stock">In Stock</span>
              </label>

              <label class="status-option">
                <input
                  type="radio"
                  v-model="formData.status"
                  value="Out of Stock"
                  name="status"
                />
                <span class="status-label out-of-stock">Out of Stock</span>
              </label>

              <label class="status-option">
                <input
                  type="radio"
                  v-model="formData.status"
                  value="Restock"
                  name="status"
                />
                <span class="status-label restock">Restock</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="cancel-btn"
          @click="$router.push('/inventory_management')"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <loader-icon v-if="isSubmitting" size="16" class="spinner" />
          {{ isEditing ? "Update Product" : "Add Product" }}
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
import { Loader as LoaderIcon } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const productsStore = useProductsStore();
const { showSuccessToast, showErrorToast } = useToast();

// Check if we're editing an existing product
const productId = route.params.id;
const isEditing = computed(() => !!productId);

// Form data
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

// Form errors
const errors = reactive({
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  image: "",
});

const isSubmitting = ref(false);

// Available categories
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

// Load product data if editing
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

// Validate form
const validateForm = () => {
  let isValid = true;

  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });

  // Validate name
  if (!formData.name.trim()) {
    errors.name = "Product name is required";
    isValid = false;
  } else if (formData.name.length > 100) {
    errors.name = "Product name must be less than 100 characters";
    isValid = false;
  }

  // Validate price
  if (!formData.price) {
    errors.price = "Price is required";
    isValid = false;
  } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
    errors.price = "Price must be a positive number";
    isValid = false;
  }

  // Validate stock
  if (!formData.stock) {
    errors.stock = "Stock is required";
    isValid = false;
  } else if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
    errors.stock = "Stock must be a positive number";
    isValid = false;
  }

  // Validate category
  if (!formData.category) {
    errors.category = "Category is required";
    isValid = false;
  }

  // Validate description (optional but with max length)
  if (formData.description && formData.description.length > 1000) {
    errors.description = "Description must be less than 1000 characters";
    isValid = false;
  }

  return isValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    showErrorToast("Please fix the errors in the form");
    return;
  }

  isSubmitting.value = true;

  try {
    // Upload image if provided
    let imageUrl = formData.imageUrl;

    if (formData.imageFile) {
      // In a real app, set this to true for production
      const useCloudinary = false;
      imageUrl = await uploadFile(formData.imageFile, useCloudinary);
    }

    // Prepare product data
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
      // Update existing product
      result = await productsStore.updateProduct(productId, productData);

      if (result.success) {
        showSuccessToast("Product updated successfully");
        router.push("/inventory_management");
      } else {
        showErrorToast(`Failed to update product: ${result.error}`);
      }
    } else {
      // Add new product
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
  padding: 20px;
}

.product-form {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-header {
  margin-bottom: 24px;
}

.form-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.form-header p {
  color: #a0a0a0;
  font-size: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  margin-bottom: 24px;
}

.form-image-section {
  display: flex;
  flex-direction: column;
}

.form-details-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #e0e0e0;
}

.form-input,
.form-select,
.form-textarea {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 10px 12px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #60a5fa;
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.input-error {
  border-color: #f87171;
}

.error-text {
  color: #f87171;
  font-size: 12px;
}

.form-help-text {
  color: #a0a0a0;
  font-size: 12px;
  margin-top: 8px;
}

.status-options {
  display: flex;
  gap: 16px;
}

.status-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.status-option input {
  display: none;
}

.status-label {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.status-label.in-stock {
  background-color: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.2);
}

.status-label.out-of-stock {
  background-color: rgba(248, 113, 113, 0.1);
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.2);
}

.status-label.restock {
  background-color: rgba(250, 204, 21, 0.1);
  color: #facc15;
  border-color: rgba(250, 204, 21, 0.2);
}

.status-option input:checked + .status-label {
  border-width: 2px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.cancel-btn {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.05);
}

.submit-btn {
  background-color: #60a5fa;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #3b82f6;
}

.submit-btn:disabled,
.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-image-section {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .status-options {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
