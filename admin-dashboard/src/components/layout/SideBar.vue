<template>
  <div
    class="sidebar"
    :class="{
      'sidebar-collapsed': !isOpen,
      'sidebar-mobile-open': isMobileOpen,
    }"
  >
    <div class="sidebar-glow"></div>

    <div class="logo-container">
      <div class="logo">
        <button class="logo-icon" @click="toggleSidebar">
          <chart-bar-icon size="20" v-if="isOpen" />
          <chart-bar-icon size="18" v-else />
        </button>
        <transition name="fade">
          <span class="logo-text" v-if="isOpen">ZB Mart</span>
        </transition>
      </div>
    </div>

    <div class="menu-label" v-show="isOpen">
      <layers-icon size="14" />
      <span>NAVIGATION</span>
    </div>

    <nav class="menu">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="menu-item"
        :class="{ active: currentRoute === item.path }"
        :title="!isOpen ? item.name : ''"
      >
        <component :is="item.icon" class="menu-icon" />
        <transition name="slide-fade">
          <span class="menu-text" v-if="isOpen">{{ item.name }}</span>
        </transition>
        <div class="menu-indicator"></div>
      </router-link>
    </nav>

    <div class="user-profile" :class="{ 'user-profile-collapsed': !isOpen }">
      <div class="avatar">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQH4y1uWf5C1zQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696099285591?e=1753315200&v=beta&t=1i8RQutnmLPfLNXTKcmvBI7tM6WaugmUpBqEsdg4iYQ"
          alt="User Avatar"
          v-if="isOpen"
        />
        <div class="avatar-status" v-if="isOpen"></div>
      </div>
      <transition name="slide-fade">
        <div class="user-info" v-if="isOpen">
          <div class="user-name">Zain Baig</div>
          <div class="view-profile">View Profile</div>
        </div>
      </transition>
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
  ChartBar as ChartBarIcon,
  Layers as LayersIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-vue-next";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:isOpen"]);

const isMobileOpen = ref(false);
const route = useRoute();

const currentRoute = computed(() => route.path);

const toggleSidebar = () => {
  emit("update:isOpen", !props.isOpen);
};

const toggleMobileSidebar = () => {
  isMobileOpen.value = !isMobileOpen.value;
  document.body.style.overflow = isMobileOpen.value ? "hidden" : "";
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
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.body.style.overflow = "";
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
];
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.9)
  );
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.sidebar-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(96, 165, 250, 0.1), transparent);
  pointer-events: none;
}

.sidebar-collapsed {
  width: 80px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.2),
    rgba(74, 222, 128, 0.2)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-icon:hover {
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.3),
    rgba(74, 222, 128, 0.3)
  );
  color: #ffffff;
  transform: translateY(-2px);
}

.logo-icon:focus {
  outline: none;
}

.logo-icon:active {
  transform: scale(0.95);
}

.logo-icon:focus-visible {
  box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.5);
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #60a5fa, #4ade80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.menu-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 24px;
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.menu-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.menu-item:hover::before {
  opacity: 1;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  transform: translateX(4px);
}

.menu-item.active {
  background: linear-gradient(
    135deg,
    rgba(74, 222, 128, 0.15),
    rgba(96, 165, 250, 0.1)
  );
  color: #4ade80;
  border: 1px solid rgba(74, 222, 128, 0.2);
}

.menu-item.active .menu-indicator {
  opacity: 1;
  transform: scaleY(1);
}

.menu-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.menu-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) scaleY(0);
  width: 3px;
  height: 20px;
  background: linear-gradient(to bottom, #4ade80, #60a5fa);
  border-radius: 3px;
  opacity: 0;
  transition: all 0.3s ease;
}

.user-profile {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  transition: all 0.3s ease;
}

.user-profile-collapsed {
  padding: 12px 0;
  justify-content: center;
  background: transparent;
  border: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 2px solid rgba(74, 222, 128, 0.3);
  transition: all 0.3s ease;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #4ade80;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.8);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.view-profile {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.2s ease;
}

.view-profile:hover {
  color: #4ade80;
}

.mobile-toggle {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  z-index: 101;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
  backdrop-filter: blur(4px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
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
}
</style>
