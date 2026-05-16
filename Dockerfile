# Stage 1: Install production dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY app/package*.json ./
RUN npm install --only=production

# Stage 2: Create the final lightweight image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY app/server.js ./
EXPOSE 3000
USER node
CMD ["node", "server.js"]