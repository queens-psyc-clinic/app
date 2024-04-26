# Deployment

> Note: the DB password should be changed for deployment, which can be done in
> `db/db_setup/setup_db.sql`. Additionally the admin account password should be
> changed as soon as the app is deployed (the default is 12345)

To deploy the application on a new server first ensure that:

1. the `app/.env` file has the correct credentials for the DB
2. the `REACT_APP_BASE_URL` in `client/.env` is set to the correct url (ie. `localhost/api`)
3. there are valid ssl certificates in `certbot/conf/`. (Check [the proxy
   section](#proxy) for info on how to do this)

Once this is done, the app can be deployed (on `localhost`) by using:

```bash
docker compose -f docker-compose.deploy.yml build # if not already done
docker compose -f docker-compose.deploy.yml up
```

# Testing

For testing the application (like for reviewing someone's PR) use the following:

```bash
docker compose -f docker-compose.test.yml build
docker compose -f docker-compose.test.yml up
```

## API Docs

to view the App api, go to <http://localhost:5050/apidocs>.
This is created using [flasgger](https://github.com/flasgger/flasgger).

The documentation is created from the doc-strings of functions in
`/app/resources`.

## DB Admin Console

There is an Admin Console for the database at:

	localhost:8080

Login using the database credentials.


# Client

The react development server can be started from the `client/` directory using:

	npm start

> Note: you will have to use `npm install` if not already done.

The server will then be running on `localhost:3000`. 

> Note: ensure you have the correct `REACT_APP_BASE_URL` in `client/.env` as this
> correcponds to the URL used to connect the to App (Backend).

# App

To run the app, use the command:

	docker compose up

And if you have **made any changes** to the code and need to check your
changes, use:

	docker compose build

And then use the `docker compose up` command. This will start the App and DB
with an admin database console.

> Note: the App (flask server) has hot-reloading enabled and should not need to
> be restarted when changes are made.

The configuration (DockerFile)of the docker containers are in `db/` and `app/`,
and the config for the entire application is `docker-compose.yml`

> Note: ensure that the proper credentials are in `app/.env` to access the
> database and email.

# DB

The MySQL Database is initialized using `db/db_setup/setup_db.sql` which
declares the table schema & imports csv data from `db/csv_data/`.

In deployment, a volume is maintained of the database in `db/data` so that the
database can be restarted without any loss of data.

## CSV Data

Data recieved from the clinic was converted into a
CSV file which is then processed by `db/csv_data/clean_data.py`.

# Proxy

The proxy is initialized with `proxy/nginx.conf`. It is open on `http` only for
`ssl` certification and the app is accessible via `https`.

The `ssl` certification is automatically renewed by
[certbot](https://eff-certbot.readthedocs.io/en/stable/using.html#nginx) and
the proxy automatically checks for and restarts if the certification has been
renewed

## SSL Certification

If the app is being deployed on a new server the ssl certificate must first be
retrieved manually. To do this first ensure to:

1. comment out the `443` server in `proxy/nginx.conf`
2. comment out `entrypoint:` under `certbot` in `docker-compose.deploy.yml`

then run the command 

	sudo docker-compose -f docker-compose.deploy.yml run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d <app-url>

Replacing <app-url> with the domain of the server. 
