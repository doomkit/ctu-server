# Docker commands

```
docker build -t node_dev .
```

```
docker-compose up -d
```

```
pgweb --user=postgres --pass=postgres --db=ctu-collaboration
```

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
