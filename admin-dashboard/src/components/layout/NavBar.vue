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
        <span class="btn-glow"></span>
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

const pageTitles = {
  Dashboard: "Dashboard Overview",
  "Revenue Analysis": "Revenue Analysis",
  Products: "Products Management",
  "Add Product": "Add New Product",
};

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
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar-center {
  flex: 2;
  max-width: 500px;
  transition: all 0.3s ease;
}

.navbar-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.notification-btn {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.notification-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.notification-btn:hover .btn-glow {
  opacity: 1;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #f87171, #ef4444);
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.5);
  border: 2px solid rgba(0, 0, 0, 0.8);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
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
