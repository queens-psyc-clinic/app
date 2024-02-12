from flask import Flask, render_template, jsonify
import pymysql 

app = Flask(__name__)

# configuration for connection to the database
db_config = {
    'host' : 'db',
    'user' : 'dev',
    'password' : '498capstone',
    'db' : 'psychClinic'
}



@app.route('/')
def display_data():    
    with pymysql.connect(**db_config) as conn, conn.cursor() as cursor:
        cursor.execute("SHOW TABLES") # MySQL query to get all the data
        tables = [table[0] for table in cursor.fetchall()]

        # Fetch all data from each table
        all_data = {}
        for table in tables:
            cursor.execute(f"SELECT * FROM {table}")
            table_data = cursor.fetchall()
            all_data[table] = table_data

        return render_template('index.html', all_data=all_data)
        


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
