# Deployment

To deploy the application, first ensure that:

1. the `app/.env` file has the correct credentials
2. the `REACT_APP_BASE_URL` in `client/.env` is set to the correct url (ie. `localhost/api`)

Once this is done, the app can be deployed (on `localhost`) by using:

```bash
docker compose -f docker-compose.deploy.yml build # if not already done
docker compose -f docker-compose.deploy.yml up
```

# Development

## Client

The react development server can be started from the `client/` directory using:

	npm start

> Note: you will have to use `npm install` if not already done.

The server will then be running on `localhost:3000`. 

> Note: ensure you have the correct REACT_APP_BASE_URL in `client/.env` as this
> correcponds to the URL used to connect the to App (Backend).

## App

This app is containerized using Docker to make deployment & development
straightforward.

To run the app, use the command:

	docker compose up

And if you have **made any changes** to the code and need to check your
changes, use:

	docker compose build

And then use the `docker compose up` command.

> Note: the App (flask server) has hot-reloading enabled and should not need to
> be restarted when changes are made.

The configuration (DockerFile)of the docker containers are in [db](./db) and
[app](./app), and the config for the entire application is
[docker-compose.yml](./docker-compose.yml)

### API Docs

to view the Backend api, go to <http://localhost:5050/apidocs>.
This is created using [flasgger](https://github.com/flasgger/flasgger).

The documentation is created from the doc-strings of functions in
[resources](./app/resources).

Resources is where the endpoints are described.

## Database

Once the app is running, there is an Admin Console for the database at:

	localhost:8080

and you can login with:
	
	UserName: dev
	Password: 498capstone
	Database: psychClinic

## CSV Data

[Data](db/csv_data/init_data.csv) recieved from the clinic was converted into a
CSV file which is then processed by [clean_data.py](db/csv_data/clean_data.py)
