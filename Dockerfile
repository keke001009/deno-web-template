FROM denoland/deno:alpine

EXPOSE 5000

WORKDIR /usr/app

COPY . .

RUN deno cache --import-map=import_map.json src/deps.ts

RUN deno cache --import-map=import_map.json src/main.ts

CMD [ "run", "--allow-net", "--allow-env", "--allow-read", "src/main.ts" ]