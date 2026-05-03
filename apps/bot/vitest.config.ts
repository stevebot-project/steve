import { defineConfig } from "vitest/config";

export default defineConfig({
	ssr: {
		resolve: {
			conditions: ["import", "default"],
		},
	},
	test: {
		environment: "node",
		include: ["tests/**/*.test.ts"],
	},
});
