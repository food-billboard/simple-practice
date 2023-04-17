import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "Test" },
  ],
  npmClient: 'yarn',
  publicPath: './'
});
