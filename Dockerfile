FROM node:20

RUN npm install -g pnpm

WORKDIR /app

COPY . /app
RUN pnpm install --frozen-lockfile
RUN cd examples/nx-workspace && pnpm playwright install --with-deps && cd -
RUN CI=1 pnpm test
RUN pnpm build && \
    cd examples/nx-workspace && \
    cd apps/ng-app-cli && \
    # npx ng add ../../../packages/angular --skip-confirmation
    npx tsc --noEmit --project tsconfig.app.json && \
    cd - && \
    pnpm build:all && \
    CI=1 pnpm test:all && \
    pnpm e2e:all

CMD echo "Build successful"
    