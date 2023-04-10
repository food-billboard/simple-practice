import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "Home" },
  ],
  npmClient: 'yarn',
});
