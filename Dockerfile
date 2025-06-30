FROM nginx:latest

ENV BASE_URL /
ENV API_HOST http://gateway:5000/api

COPY dist/browser/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix base url paths
CMD sed -i 's|<base href="/testpath/">|<base href="'$BASE_URL'"/>|g' /usr/share/nginx/html/index.html && \
    sed -i 's|^\(\s*\)rewrite ^/(.*)$ /$1 last;|\1rewrite ^'$BASE_URL'(.*)$ /$1 last;|g' /etc/nginx/conf.d/default.conf && \
    sed -i 's|http://gateway:5000/api|'$API_HOST'|g' /etc/nginx/conf.d/default.conf && \
    nginx -g "daemon off;"


EXPOSE 80