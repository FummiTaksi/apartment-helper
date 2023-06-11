# Apartment-helper


## How to run locally

````
docker-compose up
cd apartment-helper-app
yarn dev
````


## Deployment

Continuous deployment from `main` branch to [here](https://apartment-helper.vercel.app/)

## Database

### Connecting to local database

````
docker-compose exec apartment-helper-db bash
psql -U apartment-helper
\c apartment-helper
````

### Creating new database migrations

To create new change to schema, edit `prisma/schema.prisma` and run

````
yarn prisma migrate dev --name $NAME_OF_MIGRATION_FILE
````

To create an empty migration file, run 

````
yarn prisma dev --create-only $NAME_OF_MIGRATION_FILE
````

### Applying migrations

````
yarn prisma migrate dev
````


### Generating prisma client

Everytime database schema changes, run

````
yarn prisma generate
````
