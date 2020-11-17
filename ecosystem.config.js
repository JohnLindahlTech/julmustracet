module.exports = {
  apps: [
    {
      name: "julmustracet",
      instances: 2,
      script: "node_modules/.bin/next start",
      watch: [".next"],
      exec_mode: "cluster",
      max_memory_restart: "1G",
    },
    {
      name: "achievement-cruncher",
      instances: 1,
      script:
        "node -r dotenv/config .next/server/achievementsCrunch.js dotenv_config_path=.env.local",
      watch: [".next/server/achievementsCrunch.js"],
      max_memory_restart: "500M",
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "yarn; yarn build; pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
