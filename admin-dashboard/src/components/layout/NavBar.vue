<template>
  <div class="navbar">
    <div class="navbar-left">
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>

    <div class="navbar-center">
      <SearchBar
        v-model="searchQuery"
        placeholder="Search for anything"
        rounded
        dark
        size="md"
      />
    </div>

    <div class="navbar-right">
      <button class="notification-btn">
        <bell-icon size="20" />
        <span class="notification-badge">5</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Bell as BellIcon } from "lucide-vue-next";
import SearchBar from "@/components/ui/SearchBar.vue";

const route = useRoute();
const searchQuery = ref("");

// Map route names to page titles
const pageTitles = {
  Dashboard: "Dashboard Overview",
  "Revenue Analysis": "Revenue Analysis",
  Products: "Products Management",
  "Add Product": "Add New Product",
  // Add more mappings as needed
};

// Compute the page title based on the current route
const pageTitle = computed(() => {
  return pageTitles[route.name] || route.name || "Dashboard";
});
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: transparent;
  position: relative;
  z-index: 10;
}

.navbar-left {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.navbar-center {
  flex: 2;
  max-width: 500px;
}

.navbar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.notification-btn {
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.notification-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f87171;
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .navbar-left,
  .navbar-center,
  .navbar-right {
    width: 100%;
    flex: auto;
  }

  .navbar-center {
    order: 3;
  }

  .navbar-right {
    order: 2;
    justify-content: flex-start;
  }
}
</style>
