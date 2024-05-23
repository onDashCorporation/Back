module.exports = {
  apps: [
    {
      name: "api",
      script: "./server.js",
      instances: 4,
      autorestart: true,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
