# ROAR - Text Based MMORPG

Browser Based game written in  [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) to learn more.

Join us at [Discord](https://discord.gg/Axbxy3um)

## Tech stack

### Web

- Nuxt3
- Tailwind CSS (UI)

### API

- NestJs (Framework)
- Postgresql (DB)
- Prisma (ORM)

## Setup

### Prerequirements

- Node (version specified in .nvmrc file)
- Docker compose

Make sure to install the dependencies in both `/web` and `/api` folders.

```bash
# yarn
npm install
```

Start up docker database

```bash
docker compose up -d
```

After starting database perform database migration in `/api` folder

```bash
npx prisma migrate dev
```

Afterwards you should be able to run application for development

WEB

```bash
cd web
npm run dev
```

And API

```bash
cd api
npm run start:dev
```

### Helper scripts

In `/api` folder

Running prisma studio to browse database on `localhost:5555`

```bash
npx prisma studio
```

## Prisma

Format prisma file

```bash
npx prisma format
```

Browse database

```bash
npx prisma studio
```

## Before commit

### In `/web` folder

```bash

```bash
npx nuxi typecheck
```

Run linter (some things may be fixed by it)

```bash
npm run lint:fix
```

### In `/api` folder

```bash
npm run b
```

Run linter (some things may be fixed by it)

```bash
npm run format
```

