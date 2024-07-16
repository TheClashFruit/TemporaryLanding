const path = require('path');
const childProcess = require('child_process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ]
  },
  publicRuntimeConfig: {
    modifiedDate: new Date().getTime(),
  },
  generateBuildId: async () => {
    return childProcess.execSync('git rev-parse HEAD').toString().trim();
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
    ],
  }
};

module.exports = nextConfig;