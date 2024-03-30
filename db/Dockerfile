FROM container-registry.oracle.com/mysql/community-server:latest

COPY setup/setup_db.sql /docker-entrypoint-initdb.d/
COPY setup/my.cnf /etc/my.cnf

COPY data/init_data.csv /var/lib/mysql-files/
COPY data/csv_format.py /var/lib/mysql-files/

COPY data/requirements.txt /

RUN pip3 install -r /requirements.txt

WORKDIR /var/lib/mysql-files/

RUN python3 csv_format.py

