// Re-export the Prisma client and all generated types
export { PrismaClient } from "./generated/prisma/index.js";
export type {
	Feedback,
	Guild, Prisma, Reminder,
	Snippet,
	User
} from "./generated/prisma/index.js";

// Export a singleton client for use in apps
import { PrismaClient } from "./generated/prisma/index.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
