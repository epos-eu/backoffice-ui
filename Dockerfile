FROM node:22.11.0 as builder

RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

COPY . ./


RUN corepack enable
RUN corepack prepare pnpm@10.0.0 --activate
RUN pnpm config set store-dir /root/.pnpm-store/v3
RUN export NODE_OPTIONS='--max-old-space-size=8192'
RUN pnpm install
RUN pnpm run build -c production

FROM nginx:stable

# Set environment vars
ENV BASE_URL /
ENV API_HOST http://gateway:5000/api

COPY --from=builder /home/node/app/dist/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i 's|<base href="/" />|<base href="'$BASE_URL'"/>|g' /usr/share/nginx/html/index.html && \
    sed -i 's|^\(\s*\)rewrite ^/(.*)$ /$1 last;|\1rewrite ^'$BASE_URL'(.*)$ /$1 last;|g' /etc/nginx/conf.d/default.conf && \
    sed -i 's|http://gateway:5000/api|'$API_HOST'|g' /etc/nginx/conf.d/default.conf && \
    nginx -g "daemon off;"

EXPOSE 80