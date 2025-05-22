<template>
  <div
    class="sidebar"
    :class="{
      'sidebar-collapsed': isCollapsed,
      'sidebar-mobile-open': isMobileOpen,
    }"
  >
    <div class="logo-container">
      <div class="logo">
        <span class="icon">📊</span>
        <span class="text" v-if="!isCollapsed">ZB Mart</span>
      </div>
      <button class="collapse-btn" @click="toggleSidebar">
        <chevron-left-icon v-if="!isCollapsed" />
        <chevron-right-icon v-else />
      </button>
    </div>

    <div class="menu-label" v-if="!isCollapsed">MENU</div>

    <nav class="menu">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="menu-item"
        :class="{ active: currentRoute === item.path }"
      >
        <component :is="item.icon" class="menu-icon" />
        <span class="menu-text" v-if="!isCollapsed">{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="user-profile">
      <div class="avatar">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4iovJ6dN4TdAqThVlcf_LbVz7nAacaldUrA&s"
          alt="User Avatar"
        />
      </div>
      <div class="user-info" v-if="!isCollapsed">
        <div class="user-name">Zain Baig</div>
        <div class="view-profile">View Profile</div>
      </div>
    </div>

    <div
      class="mobile-overlay"
      v-if="isMobileOpen"
      @click="closeMobileSidebar"
    ></div>
    <button class="mobile-toggle" @click="toggleMobileSidebar">
      <menu-icon v-if="!isMobileOpen" />
      <x-icon v-else />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-vue-next";

const isCollapsed = ref(false);
const isMobileOpen = ref(false);
const route = useRoute();

const currentRoute = computed(() => route.path);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem("sidebarCollapsed", isCollapsed.value);
};

const toggleMobileSidebar = () => {
  isMobileOpen.value = !isMobileOpen.value;
  if (isMobileOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMobileSidebar = () => {
  isMobileOpen.value = false;
  document.body.style.overflow = "";
};

const handleResize = () => {
  if (window.innerWidth > 768) {
    isMobileOpen.value = false;
    document.body.style.overflow = "";
  }
};

onMounted(() => {
  const savedState = localStorage.getItem("sidebarCollapsed");
  if (savedState !== null) {
    isCollapsed.value = savedState === "true";
  }

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const menuItems = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Revenue Analysis", path: "/revenue_analysis", icon: DollarSign },
  {
    name: "Inventory Management",
    path: "/inventory_management",
    icon: ShoppingBag,
  },
  {
    name: "Product Registration",
    path: "/product_registration",
    icon: ShoppingCart,
  },
  { name: "Settings", path: "/settings", icon: LayoutDashboard },
];
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 100;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-collapsed {
  width: 80px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo .icon {
  font-size: 24px;
}

.logo .text {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.collapse-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.collapse-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.menu-label {
  font-size: 12px;
  font-weight: 500;
  color: #a0a0a0;
  margin-bottom: 10px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #e0e0e0;
  transition: all 0.2s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(74, 222, 128, 0.1);
  color: #4ade80;
}

.menu-icon {
  width: 20px;
  height: 20px;
}

.menu-text {
  font-size: 14px;
  white-space: nowrap;
}

.badge {
  background-color: #f87171;
  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: auto;
}

.user-profile {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}

.view-profile {
  font-size: 12px;
  color: #a0a0a0;
  cursor: pointer;
}

.view-profile:hover {
  color: #4ade80;
}

.mobile-toggle {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  z-index: 101;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 240px;
  }

  .sidebar-mobile-open {
    transform: translateX(0);
  }

  .mobile-toggle {
    display: flex;
  }

  .sidebar-mobile-open .mobile-overlay {
    display: block;
  }

  .collapse-btn {
    display: none;
  }
}
</style>
