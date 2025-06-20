// Validation Messages Constants
export const VALIDATION_MESSAGES = {
  // Login validation messages
  LOGIN: {
    INVALID_CREDENTIALS: 'Invalid username or password',
    EMPTY_USERNAME: 'Username is required',
    EMPTY_PASSWORD: 'Password is required',
    ACCOUNT_LOCKED: 'Account is temporarily locked',
    TOO_MANY_ATTEMPTS: 'Too many login attempts. Please try again later',
  },
  
  // Registration validation messages
  REGISTRATION: {
    EMAIL_ALREADY_EXISTS: 'Email address is already registered',
    WEAK_PASSWORD: 'Password must be at least 8 characters long',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORDS_DONT_MATCH: 'Passwords do not match',
    TERMS_NOT_ACCEPTED: 'You must accept the terms and conditions',
  },
  
  // Form validation messages
  FORM: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_FORMAT: 'Please enter a valid format',
    MIN_LENGTH: 'Minimum length is {min} characters',
    MAX_LENGTH: 'Maximum length is {max} characters',
    INVALID_CHARACTERS: 'Invalid characters detected',
  },
  
  // Product validation messages
  PRODUCT: {
    OUT_OF_STOCK: 'Product is out of stock',
    QUANTITY_EXCEEDED: 'Quantity exceeds available stock',
    INVALID_QUANTITY: 'Please enter a valid quantity',
    PRODUCT_NOT_FOUND: 'Product not found',
  },
  
  // Cart validation messages
  CART: {
    EMPTY_CART: 'Your cart is empty',
    ITEM_REMOVED: 'Item removed from cart',
    QUANTITY_UPDATED: 'Quantity updated successfully',
    CART_CLEARED: 'Cart cleared successfully',
  },
  
  // Checkout validation messages
  CHECKOUT: {
    INVALID_SHIPPING_ADDRESS: 'Please enter a valid shipping address',
    INVALID_PAYMENT_METHOD: 'Please select a valid payment method',
    INSUFFICIENT_FUNDS: 'Insufficient funds',
    PAYMENT_FAILED: 'Payment failed. Please try again',
    ORDER_CONFIRMED: 'Order confirmed successfully',
  },
  
  // General error messages
  GENERAL: {
    NETWORK_ERROR: 'Network error. Please check your connection',
    SERVER_ERROR: 'Server error. Please try again later',
    SESSION_EXPIRED: 'Session expired. Please login again',
    ACCESS_DENIED: 'Access denied',
    NOT_FOUND: 'Page not found',
  },
  
  // Success messages
  SUCCESS: {
    PROFILE_UPDATED: 'Profile updated successfully',
    PASSWORD_CHANGED: 'Password changed successfully',
    EMAIL_VERIFIED: 'Email verified successfully',
    ACCOUNT_CREATED: 'Account created successfully',
    LOGOUT_SUCCESS: 'Logged out successfully',
  },
} as const;

export default VALIDATION_MESSAGES; 