# Docker

This app is containerized using Docker to make deployment & development
straightforward.

To run the app, use the command:

	docker compose up

And if you have **made any changes** to the code and need to check your
changes, use:

	docker compose build

And then use the `docker compose up` command.

The configuration (DockerFile)of the docker containers are in [db](./db) and
[app](./app), and the config for the entire application is
[docker-compose.yml](./docker-compose.yml)

## API

to view the Backend api, go to <http://localhost:5050/apidocs>.
This is created using [flasgger](https://github.com/flasgger/flasgger).

The documentation is created from the doc-strings of functions for [resources](./app/resources).

Resources is where the endpoints are described.

## Database

Once the app is running, there is an Admin Console for the database at:

	localhost:8080

and you can login with:
	
	UserName: dev
	Password: 498capstone
	Database: psychClinic

## App

the python server is running at:

	localhost:5050


# CSV Data

starting from the excel spreadsheet provided by the clinic, data has been
pruned simply in excel, starting with the Items table. This was the process:

1. Create a table with a row for each Test (from Items) which has a column for:
   ID, Name, LevelOfUser, and MeasureOf. Then get the values for each of these
   columns from the Items table.
2. Modify the Items table to only include the columns: ID, Status (1:available,
   0:borrowed), Type(CD, Manual,...), Name, Edition Number, Ages,
   NumberOfParts, Location, Ordering Company, TestID (based on the original
   test name).

The result was `test_data.csv` and `item_data.csv` which are input into the
database on startup.
