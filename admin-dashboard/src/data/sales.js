// Helper function to generate random sales data
const generateDailySales = (days, minSale, maxSale) => {
  return Array.from(
    { length: days },
    () => Math.floor(Math.random() * (maxSale - minSale + 1)) + minSale
  );
};

// Generate dates for the last 30 days
const generateDates = (days) => {
  const dates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
  }

  return dates;
};

// Daily sales data for the last 30 days
export const dailySales = {
  dates: generateDates(30),
  revenue: generateDailySales(30, 150000, 450000),
  orders: generateDailySales(30, 80, 250),
  units: generateDailySales(30, 120, 400),
};

// Weekly sales data for the last 12 weeks
export const weeklySales = {
  labels: Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`),
  revenue: generateDailySales(12, 1000000, 3000000),
  orders: generateDailySales(12, 500, 1500),
  units: generateDailySales(12, 800, 2500),
};

// Monthly sales data for the last 12 months
export const monthlySales = {
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
  revenue: [
    3200000, 3500000, 3800000, 4200000, 3900000, 4500000, 4800000, 5200000,
    4900000, 5500000, 5800000, 6200000,
  ],
  orders: [
    1800, 2000, 2200, 2400, 2100, 2500, 2700, 2900, 2600, 3000, 3200, 3400,
  ],
  units: [
    3000, 3300, 3600, 4000, 3500, 4200, 4500, 4800, 4300, 5000, 5300, 5600,
  ],
};

// Yearly sales data for the last 5 years
export const yearlySales = {
  labels: ["2019", "2020", "2021", "2022", "2023"],
  revenue: [32000000, 38000000, 42000000, 48000000, 54000000],
  orders: [18000, 22000, 25000, 28000, 32000],
  units: [30000, 36000, 40000, 46000, 52000],
};

// Sales by category
export const salesByCategory = {
  Electronics: 25000000,
  Clothing: 18000000,
  Footwear: 12000000,
  "Home & Kitchen": 15000000,
  Sports: 8000000,
  Beauty: 6000000,
  Books: 4000000,
};

// Sales by marketplace
export const salesByMarketplace = {
  Amazon: 52000000,
  Walmart: 36000000,
};

// Today's summary stats
export const todaySummary = {
  revenue: 350000,
  orders: 156,
  averageOrderValue: 2243,
};

// This month's summary stats
export const monthSummary = {
  revenue: 8500000,
  orders: 3850,
  averageOrderValue: 2207,
};

// Year to date summary
export const yearSummary = {
  revenue: 54000000,
  orders: 32000,
  averageOrderValue: 1687,
};
