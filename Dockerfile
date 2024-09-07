# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Run the application with a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Command to run the application
CMD ["node", "dist/src/main.js"]