#!/bin/sh

# List of runtime environment variables
RUNTIME_VARS="VITE_API_URL VITE_OTHER_VAR"

# Replace placeholders in config.js with actual env values
for var in $RUNTIME_VARS; do
  if [ -n "${!var}" ]; then
    echo "Setting $var to ${!var}"
    sed -i "s|__${var}__|${!var}|g" /usr/share/nginx/html/config.js
  fi
done

# Start nginx
nginx -g "daemon off;"
