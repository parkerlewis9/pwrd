FROM nikolaik/python-nodejs:python3.8-nodejs12
#FROM python:3.9.0a2-alpine3.10

# Env
# ENV TIME_ZONE=figure this out
ENV PORT 3333

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

ADD . /usr/src/app

CMD ["npm", "run", "start-dev"]
EXPOSE 3333
