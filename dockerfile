FROM node:14

# Create app directory
WORKDIR /usr/source/app

# Copy necessary files and dependencies
COPY package*.json ./
COPY src/ src/
COPY .env .env
COPY env.js .

# Install app dependencies   
RUN npm install

# Set environment variables
ENV NODE_ENV=production

# Expose the port that the application runs on
EXPOSE 8080

# Start the application
CMD ["npm" ,"start" ]