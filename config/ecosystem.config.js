module.exports = {
  apps: [
    {
      name: "api",
      script: "./server.js",
      instances: "max",
      autorestart: true,
      port: 8080,
      max_memory_restart: "100M",
      namespace: "api",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        },
    },
  ],
};
