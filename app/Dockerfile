FROM node:21-alpine

WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Set the environment variable
ARG VITE_API_HOST=https://devbazaar-backend.onrender.com
ENV VITE_API_HOST=$VITE_API_HOST

# Build the app
RUN npm run build

# Remove development dependencies and source code after build
RUN rm -rf src tests .git

# Install a static server globally
RUN npm install -g serve

EXPOSE 5173

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"]