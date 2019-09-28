# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10.9.0

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install
COPY app /app/app
COPY internals /app/internals
COPY server /app/server
COPY .env.prod /app/.env.prod

RUN npm run build

# The base node image sets a very verbose log level.
#ENV NPM_CONFIG_LOGLEVEL warn
EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# Install `serve` to run the application.
#RUN npm install -g serve
#CMD serve -p $PORT -s build
#EXPOSE 80

# Copy all local files into the image.
#COPY package.json package.json
#RUN npm install
#
## Copy all local files into the image.
#COPY . .
#
#RUN npm run build --production
