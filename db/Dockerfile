FROM container-registry.oracle.com/mysql/community-server:latest

COPY db_setup/setup_db.sql /docker-entrypoint-initdb.d/
COPY db_setup/my.cnf /etc/my.cnf

COPY csv_data/test_data.csv /var/lib/mysql-files/
COPY csv_data/item_data.csv /var/lib/mysql-files/
