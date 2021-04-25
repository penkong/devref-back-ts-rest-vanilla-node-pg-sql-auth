FROM node:15.13.0-alpine


ENV PORT=5002
ENV DBURL=postgresql://<PGUSER>:<PGPASS>@localhost:5432/<DBNAME>?sslmode=disable
ENV DBNAME=devrefvanillanodesql
ENV NODE_ENV=development
ENV PGPASS=root
ENV PGUSER=secret
ENV CORS=http://localhost:3000
ENV JWT_KEY=uy6hw65hywtrnbewhnterwhg
ENV JWT_TTL=365d


RUN mkdir -p /app
WORKDIR "/app"


COPY package*.json ./



RUN npm config set unsafe-perm true
# we use npm ci here so only the package-lock.json file is used
RUN npm config list \
    && npm ci \
    && npm cache clean --force





COPY . .
EXPOSE 5002

CMD ["npm", "run", "dev"]














