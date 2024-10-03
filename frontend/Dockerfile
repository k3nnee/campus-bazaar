FROM node:14

#Working directory
WORKDIR /app

#Copy package.json
COPY package*.json ./

#Install Dependencies
RUN npm install

#Copy rest of application code
COPY . .

#Expose port
EXPOSE 3000

#Start React   
CMD ["npm", "run", "dev"]