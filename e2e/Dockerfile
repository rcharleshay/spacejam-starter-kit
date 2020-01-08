# Defines the environment for our application

FROM node:8-alpine

ENV NO_UPDATE_NOTIFIER=true

ENV CHROMEDRIVER_FILEPATH=/usr/bin/chromedriver

ENV HOME=/app
WORKDIR /app

RUN set -ex && \
    adduser node root && \
    chmod g+w /app && \
    apk add --update --no-cache chromium chromium-chromedriver

COPY .npmrc package.json package-lock.json /app/
RUN set -ex && \
    npm ci && \
    npm cache clean --force
COPY ./ /app/

RUN set -ex && \
    chmod -R g=u /app/test/reports /app/test/visual-regression && \
    rm -rf .npmrc .npm .config

USER node
ENTRYPOINT ["npm"]
CMD ["run", "e2e:headless"]
