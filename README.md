# Ctu Collaboration Server

This is the backend part of the application that is available at [ctu-collaboration.cz](https://ctu-collaboration.cz/).

# Docker commands

This application consists of two containers:

* node.js application server
* postgres database

To run both of these containers is used docker-compose file. To build app use `docker build -t node_dev`.

To run this build use `docker-compose up -d` or `docker-compose up` if you want to see logs.

# Run without docker

If you don't want to use docker, you can use npm scripts `npm run compile` for compiling local build, `npm run start` to start local server or `npm run prod` to build application for production.

In this case you also need to run `npm i` to install all dependencies.

Also in this case you need to run your own postgres database or you can use docker container with db only.

# Requiered config files

You need to set DB credentials ($USER, $DATABASE, $PASSWORD, $PORT) inside `.env` file in root folder:

```
PGHOST='db'
PGUSER=$USER
PGDATABASE=$DATABASE
PGPASSWORD=$PASSWORD
PGPORT=$PORT

API_PREFIX=/api
PORT=3000
```

Same credentials for DB env file `postgres.env`:

```
POSTGRES_PASSWORD=$PASSWORD
POSTGRES_USER=$USER
POSTGRES_DB=$DATABASE
```

Create these files if they are not presented in the project's root directory.

# Database

After satrting database you need to execute two sql scripts, that are located inside `/sql` folder. If you are using docker you need to run the app using `docker-compose up -d` and enter to running container by running `docker exec -it $CONTAINER_NAME psql`. To identify container name, run `docker ps`. After entering container, execute scripts `create.sql` then `insert_data.sql` by copy files content into console.

If you have any issues with executing sql scripts, try to splipt content of this scripts into pieces and remove line breaks.