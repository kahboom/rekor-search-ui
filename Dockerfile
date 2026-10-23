FROM registry.access.redhat.com/ubi9/nodejs-18@sha256:8d41fbc3e9d1a8e48567838b6cff25716b043927bc80da85ef989ec1bbc15a4b as Build
#
COPY . .
USER root
ENV NODE_ENV production
EXPOSE 3000
RUN echo "export PATH=${PATH}:$HOME/node_modules/.bin" >> ~/.bashrc && \
    npm install --ignore-scripts && \
    npm run build && \
    chmod -R 777 /opt/app-root/src/.npm && \
    echo "NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN = ${NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN}" && \
    npm cache clean --force
USER 1001
CMD ["node_modules/.bin/next", "start"]

LABEL \
      com.redhat.component="trusted-artifact-signer-rekor-ui" \
      name="trusted-artifact-signer-rekor-ui" \
      version="0.0.1" \
      summary="User Interface for checking Rekor Entries" \
      description="Provides a user interface for checking Rekor Entries through a Node App" \
      io.k8s.description="Provides a user interface for checking Rekor Entries through a Node App" \
      io.k8s.display-name="Provides a user interface for checking Rekor Entries through a Node App" \
      io.openshift.tags="rekor-ui, rekor, cli, rhtas, trusted, artifact, signer, sigstore" \
      maintainer="trusted-artifact-signer@redhat.com"
