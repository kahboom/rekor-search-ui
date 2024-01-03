FROM registry.access.redhat.com/ubi9/nodejs-20@sha256:65d6f975014181e347f78fa510637778e93f57a2b65e9aad62970c142de5899e as Build

COPY . .
USER root
RUN echo "export PATH=${PATH}:$HOME/node_modules/.bin" >> ~/.bashrc
EXPOSE 3000
RUN npm run build && \
    npm install && \
    npm cache clean --force
CMD ["npm", "run", "start"]