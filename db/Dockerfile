FROM container-registry.oracle.com/mysql/community-server:latest

COPY setup_db.sql /docker-entrypoint-initdb.d/
COPY test_data.csv /var/lib/mysql-files/
COPY item_data.csv /var/lib/mysql-files/
COPY my.cnf /etc/my.cnf