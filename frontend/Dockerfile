FROM node:latest AS node
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/frontend /usr/share/nginx/html