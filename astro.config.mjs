import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        input: undefined,
      },
    },
  },
  integrations: [
    icon({
      include: {
        ph: ["*"],
      },
    }),
  ],
});
