import { defineStore } from "pinia";
import { products as initialProducts } from "@/data/products";
import { categories as categories } from "@/data/products";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [...initialProducts],
    isLoading: false,
    lastId: Math.max(
      ...initialProducts.map((p) => parseInt(p.id.replace("#", ""))),
      0
    ),
    searchQuery: "",
    filterCategory: "",
    categories: [...categories],
    stockFilter: "",
  }),

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },

    lowStockProducts: (state) => {
      return state.products.filter((product) => product.stock < 10);
    },

    outOfStockProducts: (state) => {
      return state.products.filter((product) => product.stock === 0);
    },

    totalProducts: (state) => {
      return state.products.length;
    },

    totalStock: (state) => {
      return state.products.reduce(
        (total, product) => total + product.stock,
        0
      );
    },

    totalValue: (state) => {
      return state.products.reduce(
        (total, product) => total + product.price * product.stock,
        0
      );
    },
    filteredProducts: (state) => {
      return state.products.filter((product) => {
        const matchesQuery = product.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
      
        const matchesCategory = state.filterCategory
          ? product.category === state.filterCategory
          : true;
      
        let matchesStock = true;
        if (state.stockFilter === "low") {
          matchesStock = product.stock < 10 && product.stock > 0;
        } else if (state.stockFilter === "out") {
          matchesStock = product.stock === 0;
        } else if (state.stockFilter === "in") {
          matchesStock = product.stock > 0;
        }
      
        return matchesQuery && matchesCategory && matchesStock;
      });
    }

  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    setFilterCategory(category) {
      this.filterCategory = category;
    },

    setStockFilter(stock) {
      this.stockFilter = stock;
    },

    async fetchProducts() {
      this.isLoading = true;

      try {
        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        return true;
      } catch (error) {
        console.error("Error fetching products:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async addProduct(product) {
      this.isLoading = true;

      try {
        // Generate a new ID
        this.lastId++;
        const newId = `#${this.lastId.toString().padStart(5, "0")}`;

        // Create the new product with the generated ID
        const newProduct = {
          id: newId,
          ...product,
          createdAt: new Date().toISOString(),
        };

        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

        // Add the product to the state
        this.products.unshift(newProduct);

        return { success: true, product: newProduct };
      } catch (error) {
        console.error("Error adding product:", error);
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    async updateProduct(id, updates) {
      this.isLoading = true;

      try {
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
          throw new Error("Product not found");
        }

        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

        // Update the product
        this.products[index] = {
          ...this.products[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };

        return { success: true, product: this.products[index] };
      } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(id) {
      this.isLoading = true;

      try {
        const index = this.products.findIndex((product) => product.id === id);

        if (index === -1) {
          throw new Error("Product not found");
        }

        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

        // Remove the product
        this.products.splice(index, 1);

        return { success: true };
      } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },

    updateStock(id, quantity) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.stock = Math.max(0, product.stock + quantity);
        return true;
      }
      return false;
    },
  },
});
