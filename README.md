# Apartment-helper


## How to run locally

````
docker-compose up
cd apartment-helper-app
yarn dev
````


## Database

### Connecting to local database

````
docker-compose exec apartment-helper bash
psql -U apartment-helper
\c apartment-helper
````
