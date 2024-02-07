# Docker

If/when you are changing the files in [`db/`](./db) and testing your edits, you
can use the [`start_db`](./start_db) to quickly run the `docker build` and
`docker_compose` commands.

> NOTE: if this script doesnt work, use the commands below (sometimes
> bash-scripts can be finnikey).

The database is packaged & run using Docker. Firstly, ensure you have `docker`
& `docker-compose` installed on your computer. (ie. `brew install docker
docker-compose`)

to build the docker image, use:
	
	docker build db -t clinic-mysql

To create an image which will be the database server. The `-t` option specifies
the name of the image.

Now, to run the image use the command:

	docker-compose -f db/docker-compose.yml up	

which will start the MySQL server. Now you can go to

	http://localhost:8080

and login with
	
	UserName: dev
	Password: 498capstone
	Database: psychClinic

# CSV Data

data has been pruned simply in excel, starting with the Items table. This was
the process:

1. Create a table with a row for each Test (from Items) which has a column for:
   ID, Name, LevelOfUser, and MeasureOf. Then get the values for each of these
   columns from the Items table.
2. Modify the Items table to only include the columns: ID, Status (1:available,
   0:borrowed), Type(CD, Manual,...), Name, Edition Number, Ages,
   NumberOfParts, Location, Ordering Company, TestID (based on the original
   test name).

The result was `test_data.csv` and `item_data.csv` which are input into the
database on startup.
