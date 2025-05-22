<template>
  <div class="app">
    <sidebar />
    <div class="main-content">
      <navbar />
      <div class="page-content">
        <ToastProvider>
          <router-view />
        </ToastProvider>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/layout/SideBar.vue";
import Navbar from "@/components/layout/NavBar.vue";
import ToastProvider from "@/components/ToastProvider.vue";
</script>

<style>
:root {
  --sidebar-width: 240px;
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
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    rgba(0, 128, 128, 0.2) 0%,
    rgba(0, 0, 64, 0.2) 100%
  );
}

.page-content {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
