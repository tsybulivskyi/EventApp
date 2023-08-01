# Dockerfile

# Base image
FROM node:18.17.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .


# Build application
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run application
CMD ["npm", "start"]
