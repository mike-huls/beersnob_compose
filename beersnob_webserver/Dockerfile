FROM nginx:1.17-alpine

# 1. Get rid of standard confs
RUN rm /etc/nginx/conf.d/*

# 2. Copy conf files to the container
#COPY ./conf/ /etc/nginx/
COPY ./conf/nginx.conf /etc/nginx/conf.d/
