FROM registry.access.redhat.com/ubi9/nodejs-20@sha256:65d6f975014181e347f78fa510637778e93f57a2b65e9aad62970c142de5899e as Build

COPY . .
USER root
RUN echo "export PATH=${PATH}:$HOME/node_modules/.bin" >> ~/.bashrc
EXPOSE 3000
RUN npm run build && \
    npm install && \
    npm cache clean --force
CMD ["npm", "run", "start"]

LABEL \
      com.redhat.component="trusted-artifact-signer-rekor-ui" \
      name="trusted-artifact-signer-rekor-ui" \
      version="0.0.1" \
      summary="User Interface for checking Rekor Entries" \
      description="Provides a user interface for checking Rekor Entries through an Node App" \
      io.k8s.description="Provides a user interface for checking Rekor Entries through an Node App" \
      io.k8s.display-name="Provides a user interface for checking Rekor Entries through an Node App" \
      io.openshift.tags="rekor-ui, rekor, cli, rhtas, trusted, artifact, signer, sigstore" \
      maintainer="trusted-artifact-signer@redhat.com"
