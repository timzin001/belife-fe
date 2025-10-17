# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Install library
yarn install

## Run dev
yarn dev

## Build PM2 to deploy server
yarn build
pm2 start ecosystem.config.cjs

## List port is running
netstat -tulpn | grep LISTEN

