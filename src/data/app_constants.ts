// Application Constants
export const APP_CONSTANTS = {
  // Timeouts
  DEFAULT_TIMEOUT: 60000, // 60 sec
  SHORT_TIMEOUT: 5000,
  LONG_TIMEOUT: 120000, // 2 min
  
  // Retry attempts
  MAX_RETRIES: 3,
  
  // Wait intervals
  POLLING_INTERVAL: 1000,
  
  // Test data
  TEST_USER: {
    VALID_USERNAME: 'testuser@example.com',
    VALID_PASSWORD: 'TestPassword123!',
    INVALID_USERNAME: 'invalid@example.com',
    INVALID_PASSWORD: 'WrongPassword',
  },
  
  // URLs
  ENDPOINTS: {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    PRODUCTS: '/products',
    CART: '/cart',
    CHECKOUT: '/checkout',
  },
  
  // Status codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  
  // Messages
  SUCCESS_MESSAGES: {
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    PRODUCT_ADDED: 'Product added to cart',
    ORDER_PLACED: 'Order placed successfully',
  },
  
  // File paths
  TEST_DATA_PATH: './test-data/',
  SCREENSHOTS_PATH: './screenshots/',
  DOWNLOADS_PATH: './downloads/',
} as const;

export default APP_CONSTANTS; 