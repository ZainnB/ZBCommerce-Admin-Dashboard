// Dashboard-specific data
export const dashboardStats = {
  revenue: {
    value: 350000,
    change: 4.8,
    data: [10, 15, 12, 18, 15, 22, 20, 26, 23],
  },
  orders: {
    value: 156,
    change: -3.5,
    data: [20, 15, 18, 12, 22, 18, 15, 20, 25],
  },
  visitors: {
    value: 1058,
    change: 9.3,
    data: [15, 20, 18, 25, 22, 30, 28, 35, 32],
  },
};

// Sales analytics data
export const salesAnalytics = {
  daily: {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    values: [
      25, 30, 20, 15, 10, 15, 20, 30, 45, 60, 75, 70, 65, 60, 65, 70, 80, 85,
      90, 85, 70, 55, 40, 30,
    ],
  },
  weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [45000, 52000, 49000, 62000, 78000, 85000, 70000],
  },
  monthly: {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    values: [
      45000, 48000, 52000, 49000, 53000, 57000, 60000, 55000, 58000, 62000,
      65000, 68000, 64000, 60000, 65000, 70000, 75000, 80000, 85000, 82000,
      78000, 75000, 80000, 85000, 90000, 88000, 85000, 90000, 92000, 95000,
    ],
  },
  yearly: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [
      250000, 320000, 280000, 350000, 400000, 450000, 500000, 550000, 600000,
      650000, 700000, 750000,
    ],
  },
};

export const returnsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [35, 28, 32, 45, 30, 38],
  percentages: [12, 9, 11, 15, 10, 13],
};

export const bestSellingProducts = [
  {
    id: "P004",
    image: "https://affinity.com.pk/cdn/shop/files/IMG-7088.webp?v=1698072889",
    name: "Nike Air Max 270",
    category: "Footwear",
    price: 25000,
    totalSales: 54,
    stock: 24,
    status: "In Stock",
  },
  {
    id: "P005",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqE1ZfRFbjmrLXQcqIdTXv3q0KCDt7bO041w&s",
    name: "Levi's 501 Original Jeans",
    category: "Clothing",
    price: 12000,
    totalSales: 32,
    stock: 56,
    status: "In Stock",
  },
  {
    id: "P006",
    image:
      "https://aspire.pk/cdn/shop/files/1H5A4850copy.jpgsacopy.jpgsa.jpg?v=1697369350",
    name: "Adidas Originals T-Shirt",
    category: "Clothing",
    price: 5500,
    stock: 78,
    totalSales: 28,
    status: "In Stock",
  },
  {
    id: "P007",
    image:
      "https://discountstore.pk/cdn/shop/files/e65cdbb7-7c1b-46fa-9397-6e24fbc3e37a.webp?v=1732003360",
    name: "Kindle Paperwhite",
    category: "Electronics",
    price: 30000,
    stock: 12,
    totalSales: 40,
    status: "In Stock",
  },
];
