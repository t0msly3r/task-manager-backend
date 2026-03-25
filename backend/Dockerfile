# Separate in multistage, install just production dependencies and add unnecessary files
# to .dockerignore to reduce image size
FROM node:20 as dependencies

COPY package*.json ./

RUN npm ci --production

FROM node:20 as build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

# Either separate prisma migrate on a different dockerfile or
# prepare dockerfile to be able to run migrate but don't run it on CMD
# and run node build/app.js instead of npm run dev
# add build script to package json for build stage
CMD npx prisma migrate deploy && node build/app.js