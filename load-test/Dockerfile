# Defines the environment for our application

FROM node:8-alpine

ENV NO_UPDATE_NOTIFIER=true

ENV HOME=/app
WORKDIR /app
RUN set -ex && \
    adduser node root && \
    chmod g+w /app

COPY package.json package-lock.json /app/
RUN set -ex && \
    npm ci && \
    npm cache clean --force
COPY ./ /app/

RUN rm -rf .npm .config

USER node
ENTRYPOINT ["npm"]
CMD ["start"]
