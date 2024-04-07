FROM node:alpine
WORKDIR "/app"

COPY ./package.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve
CMD ["serve", "-s", "build"]

# CMD ["npm", "start"]

# FROM nginx
# EXPOSE 3000
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html

