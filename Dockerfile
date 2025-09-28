# -----------------------------
# Builder Stage: Build the React app
# -----------------------------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the app for production
RUN npm run build

# -----------------------------
# Nginx Stage: Serve the built app
# -----------------------------
FROM nginx:alpine

# Remove default nginx HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script for runtime env injection
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Start container using entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
