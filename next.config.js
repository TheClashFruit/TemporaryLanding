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
  }
};

module.exports = nextConfig;