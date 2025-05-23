## 🛒 Ecommerce Admin Dashboard

A minimal Vue.js-based admin dashboard for managing products in an ecommerce platform. Supports product creation, sample data listing, Cloudinary image uploads, and responsive UI.

### 🚀 Live Preview

🌐 [View Deployed Site on Vercel](https://zb-mart-admin-dashboard.vercel.app/)

---

### 📂 Project Structure

```
/ecommerce-dashboard/
├── /public/
├── /src/
│   ├── /components/
│   ├── /views/
│   ├── /services/        # Upload logic
│   └── App.vue
├── .env.local           # Cloudinary API keys (excluded from Git)
├── .gitignore
├── README.md
└── package.json
```

---

### ⚙️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/ecommerce-dashboard.git
cd ecommerce-dashboard
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env.local` file in the root and add:

```env
VUE_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
VUE_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

Make sure your Cloudinary preset is **unsigned**.

4. **Run the App**

```bash
npm run serve
```

Visit: [http://localhost:8080](http://localhost:8080)


### 📦 Deployment (Vercel)

This project is auto-deployed via GitHub → Vercel CI integration.

* **Install Command:** `npm install`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* **Root Directory:** set to your project folder (e.g. `ecommerce-dashboard`)


### 🧪 Features

* ✅ Product registration form
* ✅ Cloudinary image upload (conditionally based on environment)
* ✅ Sample data for dashboard demo
* ✅ Mobile-responsive UI


### 🧠 Design Choices & Challenges

See full write-up in [Documentation.md](./Documentation.md) *(you will create this next)*.

