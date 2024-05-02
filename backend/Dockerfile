FROM node:20

WORKDIR /app

COPY package*.json ./

# shell form command
RUN npm install

# copies everything 'here', from where 'docker build' is executed to the WORKDIR
COPY . .

# Compile TypeScript files to JavaScript (if needed)
RUN npm run build

ENV PORT=3000

EXPOSE 3000

# exec form command
CMD ["npm", "start"]