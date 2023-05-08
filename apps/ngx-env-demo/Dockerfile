FROM node:18

ARG NG_VERSION
ARG NGX_API_URL

ENV NGX_API_URL=$NGX_API_URL

WORKDIR /app
RUN npx -y @angular/cli@$NG_VERSION new ng-app --defaults
WORKDIR /app/ng-app
RUN npx ng add @ngx-env/builder --skip-confirmation
RUN npm add @ngx-env/core
RUN npx ng config projects.ng-app.architect.build.options.ngxEnv.prefix 'NGX_'
COPY src src
COPY .env .env
RUN echo 'console.log("NGX_API_URL", process.env["NGX_API_URL"])' >>src/main.ts
RUN npm run build
EXPOSE 8080
CMD ["npx", "http-server", "dist/ng-app", "-p", "8080"]

### Build the image
# docker build --build-arg NG_VERSION=16 --build-arg NGX_API_URL=staging.api.com -t ngx-env-demo .

### Run the container
# docker run -p 8080:8080 ngx-env-demo
