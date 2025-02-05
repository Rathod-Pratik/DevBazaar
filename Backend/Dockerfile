FROM node:21-alpine

WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./


# Install dependencies
RUN npm install

# Copy all the remaining application files into the /app directory
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Command to start the app
CMD ["npm", "start"]
