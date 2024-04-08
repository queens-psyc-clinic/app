FROM container-registry.oracle.com/mysql/community-server:latest

COPY db_setup/setup_db.sql /docker-entrypoint-initdb.d/
COPY db_setup/my.cnf /etc/my.cnf

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY csv_data/init_data.csv /var/lib/mysql-files/
COPY csv_data/clean_data.py /var/lib/mysql-files/

WORKDIR /var/lib/mysql-files
RUN python3 clean_data.py

