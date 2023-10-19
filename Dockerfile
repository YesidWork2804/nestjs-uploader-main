# Base image
FROM node:18.17.1

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build --prod

EXPOSE 3000

# Start the server using the production build
# CMD ["npx", "http-server", "dist/","-p 3000"]

CMD [ "node", "dist/main.js","-p 3000"]

