/**
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `Rs ${new Intl.NumberFormat("en-PK").format(amount)}`;
};

/**
 * Format a number with commas as thousands separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-PK").format(num);
};

/**
 * Format a percentage
 * @param {number} value - The value to format as percentage
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
};
