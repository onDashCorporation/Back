module.exports = {
  apps: [
    {
      name: "api",
      script: "./server.js",
      instances: 1,
      port: 8080,
      autorestart: true,
      max_memory_restart: "150M",
      namespace: "api",
      env: {
        NODE_ENV: "production",
        },
    },
  ],
};
