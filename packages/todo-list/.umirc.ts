import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "Test" },
  ],
  npmClient: 'yarn',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
});
