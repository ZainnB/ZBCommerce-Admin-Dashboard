/**
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return `Rs ${new Intl.NumberFormat("en-PK").format(amount)}`;
};

/**
 *
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-PK").format(num);
};

/**
 *
 * @param {number} value
 * @returns {string}
 */
export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
};
