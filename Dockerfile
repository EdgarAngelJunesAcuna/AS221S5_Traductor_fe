# Use an official Node runtime as a parent image, specifying the slim version to reduce size
FROM node:16-slim

# Set the working directory to /app inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn) to leverage Docker cache layers
COPY package*.json ./

# Install dependencies including any necessary legacy peer dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container (excluding files specified in .dockerignore)
COPY . .

# Build the application for production (adjust the build command according to your build system, if necessary)
RUN npm run build --prod

# Inform Docker that the container is listening on port 4200 at runtime
EXPOSE 4200

# Define the command to run the app (adjust the start command according to your package.json)
ENTRYPOINT ["npm", "start"]
