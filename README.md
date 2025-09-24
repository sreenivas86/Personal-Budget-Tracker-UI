## my this is ui part of personal tracker 

## downloand Backend code from github and setup after run it
[Personal Budget Tracker ](https://github.com/sreenivas86/Personal-Expense-Tracker)

##      Aplication running steps 


# 1. clone the project 
# 2. install the dependencies 
````
npm install 
````
# 3. run the application
````
npm run dev

````
Sure! Here’s your content converted into a **well-formatted `README.md`** for your Vite React Docker project:

```markdown
# Vite React Docker Setup (Production-Ready)

This project demonstrates a **production-ready setup** for a Vite React app using Docker, Node 22.14.0, npm 11.5.2, runtime API injection, and Nginx. It supports **SPA routing, caching, gzip compression**, and works in both **development** and **production**.

---

## 1️⃣ Project Structure

```

my-vite-app/
├─ public/
│  └─ config.js       # runtime env config
├─ src/
│  └─ main.jsx
├─ package.json
├─ package-lock.json
├─ Dockerfile
├─ docker-entrypoint.sh
└─ nginx.conf

````

---

## 2️⃣ `public/config.js` (Runtime Environment)

```js
window._env_ = {
  VITE_API_URL: "http://localhost:8080" // default value, replaced at container start
};
````

---

## 3️⃣ Dockerfile

```dockerfile
# Stage 1: Build Vite React app
FROM node:22.14.0-alpine AS builder

WORKDIR /app

# Update npm to 11.5.2
RUN npm install -g npm@11.5.2

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Nginx production server
FROM nginx:alpine

# Remove default nginx HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy build from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script for runtime env injection
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port
EXPOSE 80

# Start container using entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
```

---

## 4️⃣ `docker-entrypoint.sh`

```bash
#!/bin/sh
# Replace API URL in config.js at container runtime
if [ -n "$VITE_API_URL" ]; then
  echo "Setting VITE_API_URL to $VITE_API_URL"
  sed -i "s|http://localhost:8080|$VITE_API_URL|g" /usr/share/nginx/html/config.js
fi

# Start Nginx
nginx -g "daemon off;"
```

---

## 5️⃣ `nginx.conf` (SPA + caching)

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Cache static assets long-term
    location /assets/ {
        try_files $uri =404;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri /index.html;
    }

    # No cache for runtime config.js
    location /config.js {
        try_files $uri =404;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;
}
```

---

## 6️⃣ React Usage (main.jsx or API service)

```js
const BASE_URL = window._env_?.VITE_API_URL || import.meta.env.VITE_API_URL;
console.log("API URL:", BASE_URL);
```

* Works in **development** (`import.meta.env`)
* Works in **production** (runtime `window._env_`)

---

## 7️⃣ Commands to Build and Run

### Build Docker Image

```bash
docker build -t vite-frontend-runtime .
```

### Run Container with Custom API URL

```bash
docker run -d -p 3000:80 -e VITE_API_URL=http://backend:8080 vite-frontend-runtime
```

* `-e VITE_API_URL=...` → injects runtime API URL
* Access app at `http://localhost:3000`

### Stop Container

```bash
docker ps              # list containers
docker stop <container_id>
docker rm <container_id>
```

---

## 8️⃣ Optional OS Commands

* Check Docker version:

```bash
docker --version
```

* Remove old images:

```bash
docker images
docker rmi <image_id>
```

* View container logs:

```bash
docker logs <container_id>
```

---

✅ This setup is **fully production-ready**, SPA-friendly, supports **runtime API injection**, caching, gzip, and works in **dev + prod**.

---

### Next Step

You can also create a **`docker-compose.yml`** to run **frontend + backend together** with environment variables, allowing you to start everything with **one command**.

```

---

If you want, I can also **create the docker-compose version** for you and add instructions to include backend + frontend together.  

Do you want me to do that?
```
