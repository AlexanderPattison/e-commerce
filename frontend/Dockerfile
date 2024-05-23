# Use a base image
FROM node:18.17.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Copy the init-user-db script and make it executable (if necessary for frontend)
COPY init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh
RUN chmod +x /docker-entrypoint-initdb.d/init-user-db.sh

# Expose the port your app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
