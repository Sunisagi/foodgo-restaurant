FROM node:14.18.1
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
RUN pnpm install
COPY . .
CMD ["pnpm", "start:dev"]
