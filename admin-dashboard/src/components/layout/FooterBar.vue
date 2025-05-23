<template>
  <footer class="footer-bar">
    <div class="footer-glow"></div>

    <div class="footer-content">
      <div class="footer-section brand-section">
        <div class="footer-logo">
          <div class="logo-icon">
            <chart-bar-icon size="24" />
          </div>
          <div class="logo-text">
            <span class="text-gradient">ZB Mart</span>
            <span class="tagline">Inventory Management</span>
          </div>
        </div>
        <p class="footer-description">
          ZB Mart is a powerful inventory management system designed to help you
          manage your products, sales, and revenue efficiently. With advanced
          analytics and user-friendly interface, ZB Mart is your ultimate
          business companion.
        </p>
      </div>

      <div class="footer-section links-section">
        <h4 class="footer-heading">
          <compass-icon size="16" />
          <span>Navigation</span>
        </h4>
        <nav class="footer-links">
          <a href="#" @click.prevent="$router.push('/')" class="footer-link">
            <layout-dashboard-icon size="14" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            @click.prevent="$router.push('/inventory_management')"
            class="footer-link"
          >
            <package-icon size="14" />
            <span>Products</span>
          </a>
          <a
            href="#"
            @click.prevent="$router.push('/revenue_analysis')"
            class="footer-link"
          >
            <bar-chart-2-icon size="14" />
            <span>Revenue</span>
          </a>
        </nav>
      </div>

      <div class="footer-section profile-section">
        <h4 class="footer-heading">
          <user-icon size="16" />
          <span>Developer</span>
        </h4>
        <div class="profile-card">
          <div class="profile-image-container">
            <img
              :src="
                profileInfo.imageUrl || '/placeholder.svg?height=80&width=80'
              "
              alt="Profile Picture"
              class="profile-image"
              @error="handleImageError"
            />
            <div class="profile-image-glow"></div>
          </div>
          <div class="profile-info">
            <h5 class="profile-name">{{ profileInfo.name }}</h5>
            <p class="profile-title">{{ profileInfo.title }}</p>
            <a
              :href="profileInfo.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="linkedin-link"
            >
              <linkedin-icon size="16" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        &copy; {{ currentYear }} Made with
        <heart-icon size="14" class="heart-icon" />
        by {{ profileInfo.name }}
      </div>
      <div class="version-info">
        <span class="version-label">Version</span>
        <span class="version-number">1.0.0</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  ChartBar as ChartBarIcon,
  Compass as CompassIcon,
  LayoutDashboard as LayoutDashboardIcon,
  Package as PackageIcon,
  BarChart2 as BarChart2Icon,
  User as UserIcon,
  Linkedin as LinkedinIcon,
  Heart as HeartIcon,
} from "lucide-vue-next";

const currentYear = computed(() => new Date().getFullYear());

const profileInfo = ref({
  name: "Zain Baig",
  title: "Full Stack Developer",
  linkedinUrl: "https://www.linkedin.com/in/zain-baig-04790b260/",
  imageUrl:
    "https://media.licdn.com/dms/image/v2/D4D03AQH4y1uWf5C1zQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696099285591?e=1753315200&v=beta&t=1i8RQutnmLPfLNXTKcmvBI7tM6WaugmUpBqEsdg4iYQ",
});

const handleImageError = (e) => {
  e.target.src = "/placeholder.svg?height=80&width=80";
};
</script>

<style scoped>
.footer-bar {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.8)
  );
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 40px 24px 24px;
  margin-top: auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.3);
}

.footer-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.2), transparent 70%);
  opacity: 0.6;
  pointer-events: none;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.8s ease-out;
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

.brand-section {
  animation-delay: 0s;
}

.links-section {
  animation-delay: 0.2s;
}

.profile-section {
  animation-delay: 0.4s;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.text-gradient {
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #4ade80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.tagline {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
  max-width: 400px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.footer-heading {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.footer-heading::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #60a5fa, transparent);
  border-radius: 2px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  position: relative;
}

.footer-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #60a5fa, #4ade80);
  transition: width 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
  transform: translateX(4px);
}

.footer-link:hover::after {
  width: 100%;
}

.profile-card {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.profile-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.05),
    rgba(74, 222, 128, 0.05)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.profile-card:hover::before {
  opacity: 1;
}

.profile-image-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.profile-card:hover .profile-image {
  transform: scale(1.05);
}

.profile-image-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.2),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-card:hover .profile-image-glow {
  opacity: 1;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.profile-name {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.profile-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.linkedin-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #60a5fa;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  transition: all 0.3s ease;
  width: fit-content;
}

.linkedin-link:hover {
  color: #3b82f6;
  transform: translateX(4px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.heart-icon {
  color: #f87171;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.version-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.version-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

.version-number {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-family: monospace;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
  }

  .brand-section {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .brand-section {
    grid-column: span 1;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .profile-card {
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .footer-bar {
    padding: 32px 16px 20px;
  }

  .profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-info {
    align-items: center;
  }
}
</style>
