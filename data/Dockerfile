# Use the official MongoDB image as a base image
FROM mongo:latest

# Install the required tools for fetching the GPG key
RUN apt-get update && \
    apt-get install -y gnupg curl && \
    rm -rf /var/lib/apt/lists/*

# Fetch the GPG key and add it to the keyring
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
--dearmor

# Create a /etc/apt/sources.list.d/mongodb-org-7.0.list file for MongoDB
RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB client tools
RUN apt-get update && \
    apt-get install -y mongodb-org && \
    rm -rf /var/lib/apt/lists/*

# Copy the setup.js file into the container
COPY setup.js /docker-entrypoint-initdb.d/

# Expose MongoDB default port
EXPOSE 27017