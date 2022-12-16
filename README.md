# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

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