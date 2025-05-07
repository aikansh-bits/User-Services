# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Copy environment variables
COPY .env .env

# Expose the port defined in .env (3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
