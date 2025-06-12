const fs = require('fs');
const path = require('path');

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

const environmentProd = `
export const environment = {
  TMDB: {
    READ_ACCESS_TOKEN: "${process.env.TMDB_READ_ACCESS_TOKEN || ''}",
    API_KEY: "${process.env.TMDB_API_KEY || ''}",
  },
  GOOGLE_AUTH: {
    CLIENT_ID: "${process.env.GOOGLE_CLIENT_ID || ''}",
    CLIENT_SECRET: "${process.env.GOOGLE_CLIENT_SECRET || ''}",
  },
  AUTH_TOKEN_KEY: "${process.env.AUTH_TOKEN_KEY || 'user-data'}",
  production: true,
  version: "${process.env.npm_package_version || '1.0.0'}"
};
`;

const environmentDev = `
export const environment = {
  TMDB: {
    READ_ACCESS_TOKEN: "${process.env.TMDB_READ_ACCESS_TOKEN || 'demo-tmdb-token'}",
    API_KEY: "${process.env.TMDB_API_KEY || 'demo-tmdb-api-key'}",
  },
  GOOGLE_AUTH: {
    CLIENT_ID: "${process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id'}",
    CLIENT_SECRET: "${process.env.GOOGLE_CLIENT_SECRET || 'demo-google-client-secret'}",
  },
  AUTH_TOKEN_KEY: "${process.env.AUTH_TOKEN_KEY || 'user-data'}",
  production: false,
  version: "${process.env.npm_package_version || '1.0.0-dev'}"
};
`;

const environmentEmpty = `
export const environment = {};
`;

// Create environments directory if it doesn't exist
const envDir = path.join(__dirname, 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
  console.log('📁 Created environments directory');
}

// Write environment files
try {
  // Main environment files
  fs.writeFileSync(path.join(envDir, 'environment.ts'), environmentEmpty.trim());
  fs.writeFileSync(path.join(envDir, 'environment.development.ts'), environmentDev.trim());
  
  // Production environment (for Vercel build)
  if (!isDevelopment || process.env.VERCEL) {
    fs.writeFileSync(path.join(envDir, 'environment.production.ts'), environmentProd.trim());
  }
  
  console.log('✅ Environment files generated successfully!');
  console.log(`🔧 Mode: ${isDevelopment ? 'Development' : 'Production'}`);
  
  // Log which environment variables are being used
  const envVars = [
    'TMDB_READ_ACCESS_TOKEN',
    'TMDB_API_KEY', 
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'AUTH_TOKEN_KEY'
  ];
  
  const foundVars = envVars.filter(varName => process.env[varName]);
  const missingVars = envVars.filter(varName => !process.env[varName]);
  
  if (foundVars.length > 0) {
    console.log('🟢 Found environment variables:', foundVars.join(', '));
  }
  
  if (missingVars.length > 0 && !isDevelopment) {
    console.log('🟡 Missing environment variables (using defaults):', missingVars.join(', '));
  }
  
  console.log('🚀 Ready for build!');
  
} catch (error) {
  console.error('❌ Error generating environment files:', error.message);
  process.exit(1);
}