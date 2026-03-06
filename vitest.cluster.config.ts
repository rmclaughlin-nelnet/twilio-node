import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./spec/cluster",
    include: ["*.spec.{js,ts}"],
    testTimeout: 30000,
  },
});
