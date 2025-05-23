<template>
  <footer class="footer-bar">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          <span class="icon">📊</span>
          <span class="text">ZB Mart</span>
        </div>
        <p class="footer-description">
          ZB Mart is a powerful inventory management system designed to help you
          manage your products, sales, and revenue efficiently. With advanced
          analytics and user-friendly interface, ZB Mart is your ultimate
          business companion.
        </p>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Quick Links</h4>
        <nav class="footer-links">
          <a href="#" @click.prevent="$router.push('/')">Dashboard</a>
          <a href="#" @click.prevent="$router.push('/inventory_management')"
            >Products</a
          >
          <a href="#" @click.prevent="$router.push('/revenue_analysis')"
            >Revenue</a
          >
          <a href="#" @click.prevent="$router.push('/settings')">Settings</a>
        </nav>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        &copy; {{ currentYear }} Made by Zain Baig. All rights reserved.
      </div>
      <div class="version">Version 1.0.0</div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer-bar {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 20px 20px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-logo .icon {
  font-size: 24px;
}

.footer-logo .text {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.footer-description {
  color: #a0a0a0;
  font-size: 14px;
  max-width: 300px;
}

.footer-heading {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #4ade80;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.copyright,
.version {
  color: #a0a0a0;
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
