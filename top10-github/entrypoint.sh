#!/bin/bash

echo "Connecting to PostgreSQL"

while ! netcat -z db 5432; do
    sleep 0.1
    echo "Connection failed. Retrying"
done

echo "Connected to PostgreSQL"

python -m flask --app . run --host=0.0.0.0

exec "$@"