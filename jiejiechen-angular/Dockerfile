## STAGE 1: Build Container
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

## STAGE 2: Production container
FROM node:18-slim AS runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=4001 NODE_ENV=production
ENV AWS_LWA_ENABLE_COMPRESSION=true

# Container Working path
WORKDIR /app

# Copy builded code
COPY --from=builder /app/run.sh ./run.sh
COPY --from=builder /app/dist ./dist
# Solve static files not found issue (missing "background" in path)
COPY --from=builder /app/dist/angular-app/browser ./dist/angular-app/browser/background

# Start the application
CMD exec ./run.sh
