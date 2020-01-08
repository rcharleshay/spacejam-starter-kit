# Defines the environment for our application

FROM node:8-alpine

ENV NO_UPDATE_NOTIFIER=true

ENV HOME=/app
WORKDIR /app
RUN set -ex && \
    adduser node root && \
    chmod g+w /app && \
    apk add --update --no-cache \
      # newrelic
      g++ make python \
      # sonar-scanner
      openjdk8-jre \
      nss

COPY .npmrc package.json package-lock.json /app/
RUN set -ex && \
    npm ci && \
    npm cache clean --force
COPY ./ /app/

USER node
RUN set -ex && \
    npm run build
USER root
RUN rm -rf .npmrc .npm .config && \
    apk del g++ make python

USER node
EXPOSE 3000
ENTRYPOINT ["npm"]
CMD ["start"]
