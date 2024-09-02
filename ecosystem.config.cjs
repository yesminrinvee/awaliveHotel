module.exports = {
  apps: [
    {
      name: 'my-next-app',
      script: 'npm',
      args: 'run serve', // or 'vite' if you have a custom script for serving
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
