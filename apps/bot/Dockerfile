FROM node:20-alpine

WORKDIR /app

# Copy root workspace files
COPY package*.json ./
COPY turbo.json ./

# Copy package manifests for all workspaces
COPY apps/bot/package*.json ./apps/bot/
COPY packages/database/package*.json ./packages/database/

# Install all dependencies
RUN npm install

# Copy source
COPY apps/bot ./apps/bot
COPY packages/database ./packages/database

# Generate Prisma client
RUN npm run db:generate --workspace=packages/database

# Build the bot
RUN npm run build --workspace=apps/bot

WORKDIR /app/apps/bot

CMD ["node", "dist/src/Steve.js"]
