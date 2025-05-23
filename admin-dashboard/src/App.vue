<template>
  <div class="app">
    <Sidebar v-model:is-open="isSidebarOpen" />
    <div class="main-content" :class="{ 'full-width': !isSidebarOpen }">
      <div class="cinematic-overlay"></div>
      <Navbar />
      <ToastProvider>
        <div class="page-content">
          <router-view />
        </div>
        <Footer />
      </ToastProvider>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/layout/SideBar.vue";
import Navbar from "@/components/layout/NavBar.vue";
import Footer from "@/components/layout/FooterBar.vue";
import ToastProvider from "@/components/ToastProvider.vue";

import { ref, onMounted, watch } from "vue";

const isSidebarOpen = ref(true);

onMounted(() => {
  const savedState = localStorage.getItem("sidebarOpen");
  if (savedState !== null) {
    isSidebarOpen.value = savedState === "true";
  }
});

watch(isSidebarOpen, (newValue) => {
  localStorage.setItem("sidebarOpen", newValue.toString());
});
</script>

<style>
:root {
  --sidebar-width: 240px;
  --sidebar-collapsed-width: 80px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #0f172a;
  color: #e0e0e0;
  line-height: 1.5;
}

.app {
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    rgba(0, 128, 128, 0.2) 0%,
    rgba(0, 0, 64, 0.2) 120%
  );
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  width: calc(100% - var(--sidebar-width));
}

.main-content.full-width {
  margin-left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
}

.cinematic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(0, 128, 128, 0.15),
      transparent 70%
    ),
    radial-gradient(circle at 80% 70%, rgba(0, 0, 128, 0.1), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .main-content.full-width {
    margin-left: 0;
    width: 100%;
  }
}
</style>
