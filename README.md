# ROAR - Text Based MMORPG

Browser Based game written in  [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) to learn more.

Join us at [Discord](https://discord.gg/Axbxy3um)

## Tech stack

- Nuxt3
- Tailwind CSS (UI)
- Postgresql (DB)
- Prisma (ORM)

## Setup

### Prerequirements

- Node (version specified in .nvmrc file)
- Docker compose

Make sure to install the dependencies:

```bash
# yarn
npm install
```

Start up docker database

```bash
docker compose up -d
```

Change the name of your `.env_example` file to `.env` in order to provide credentials to your docker db. 

After starting database perform database migration

```bash
npx prisma migrate dev
```

Afterwards you should be able to run application for development

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database

To set up development database you need to chane `.env_example` to `.env` file and run

```bash
docker compose up -d 
```

This will run docker compose in the background creating database.

For browsing database you may use build in prisma studio by executing

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