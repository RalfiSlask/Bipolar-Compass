FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]


# Build image: docker build -f Dockerfile -t name .
# Run container: docker run -p 3000:3000 name