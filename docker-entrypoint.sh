#!/bin/sh

# List of runtime environment variables to inject
RUNTIME_VARS="VITE_API_URL VITE_OTHER_VAR"

# Path to the config file
CONFIG_FILE="/usr/share/nginx/html/config.js"

# Replace placeholders in config.js with actual env values
for var in $RUNTIME_VARS; do
  value=$(eval echo \$$var)
  if [ -n "$value" ]; then
    echo "Injecting $var=$value into config.js"
    sed -i "s|__${var}__|$value|g" "$CONFIG_FILE"
  else
    echo "Warning: $var is not set, skipping substitution"
  fi
done

# Start nginx in foreground
exec nginx -g "daemon off;"
