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

// Returns data
export const returnsData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [35, 28, 32, 45, 30, 38],
  percentages: [12, 9, 11, 15, 10, 13],
};

// Best selling products
export const bestSellingProducts = [
  {
    id: "#12598",
    image: "https://via.placeholder.com/40",
    name: "Off-white shoulder wide sleeve top",
    price: 4099,
    totalSales: 48,
    stock: 25,
    status: "In Stock",
  },
  {
    id: "#20587",
    image: "https://via.placeholder.com/40",
    name: "Green Velvet semi-sleeve top",
    price: 10000,
    totalSales: 76,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "#10020",
    image: "https://via.placeholder.com/40",
    name: "Nike air max 2099",
    price: 17500,
    totalSales: 32,
    stock: 3,
    status: "Restock",
  },
  {
    id: "#15789",
    image: "https://via.placeholder.com/40",
    name: "Leather crossbody bag",
    price: 8500,
    totalSales: 41,
    stock: 12,
    status: "In Stock",
  },
  {
    id: "#18234",
    image: "https://via.placeholder.com/40",
    name: "Wireless Bluetooth earbuds",
    price: 6000,
    totalSales: 65,
    stock: 8,
    status: "In Stock",
  },
];
