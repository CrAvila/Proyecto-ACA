# Use node image as base
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Command to run the application
CMD ["npm", "run", "dev"]
