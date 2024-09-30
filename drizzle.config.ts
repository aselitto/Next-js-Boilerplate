// drizzle.config.ts

import fs from 'node:fs';
import path from 'node:path';

import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from .env file
dotenv.config();

// Path to the Amazon RDS CA certificate
const caCertPath = path.resolve(__dirname, '.certs/us-east-2-bundle.pem'); // Adjust path as needed
const caCert = fs.readFileSync(caCertPath).toString();

export default defineConfig({
  out: './migrations',
  schema: './src/models/Schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
    ssl: {
      rejectUnauthorized: true, // Ensure the server certificate is verified
      ca: caCert, // Provide the CA certificate
    },
  },
  verbose: true,
  strict: true,
});
