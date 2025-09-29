
FROM node:22-alpine 

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

EXPOSE 5173
# Build the app for production
CMD ["npm", "run", "dev"]


