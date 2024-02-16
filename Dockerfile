# Use an official Node.js runtime as a parent image
FROM node:current-alpine3.18

# Set the working directory in the container
WORKDIR /home/app/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
