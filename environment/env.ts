import dotenv from 'dotenv';
import path from 'path';

// Set NODE_ENV to 'production' by default if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Load environment variables based on NODE_ENV
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : process.env.NODE_ENV === 'staging'
    ? '.env.staging'
    : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });

export interface EnvironmentConfig {
  NODE_ENV: string;
  BASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
  TIMEOUT: number;
  HEADLESS: boolean;
  SLOW_MO: number;
}

export const env: EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  BASE_URL: process.env.BASE_URL || 'https://www.automationexercise.com',
  USERNAME: process.env.USERNAME || 'jeni.jen@yopmail.com',
  PASSWORD: process.env.PASSWORD || 'Password@123',
  TIMEOUT: parseInt(process.env.TIMEOUT || '60000'),
  HEADLESS: process.env.HEADLESS === 'true',
  SLOW_MO: parseInt(process.env.SLOW_MO || '0'),
};

// Validate required environment variables
const requiredEnvVars = ['BASE_URL', 'USERNAME', 'PASSWORD'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} environment variable is not set. Using default value.`);
  }
}

export default env;