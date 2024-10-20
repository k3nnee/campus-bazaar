FROM node:16

#Working directory
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for hot-reloading
RUN npm install -g nodemon

# Copy the rest of the application code into the working directory
COPY . .

# Expose the port the application will run on
EXPOSE 8080

# Run the application using nodemon (good for development)
CMD ["nodemon", "server.js"]
