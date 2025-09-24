#!/bin/sh
# Replace API URL in config.js at runtime
if [ -n "$VITE_API_URL" ]; then
  echo "Setting VITE_API_URL to $VITE_API_URL"
  sed -i "s|http://localhost:8080|$VITE_API_URL|g" /usr/share/nginx/html/config.js
fi

# Start nginx
nginx -g "daemon off;"
