# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with cache mount
RUN --mount=type=cache,target=/app/.npm \
    npm ci

# Copy project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only with cache mount
RUN --mount=type=cache,target=/app/.npm \
    npm ci --only=production

# Copy Prisma schema and generated client
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copy the rest of the application
COPY . .

# Create uploads directory and set permissions
RUN mkdir -p uploads && \
    adduser -D -H -u 1001 -s /sbin/nologin nodejs || true && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]