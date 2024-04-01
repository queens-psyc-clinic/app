from apscheduler.schedulers.background import BackgroundScheduler
import subprocess
import sys

def run_shell_command(container_id, username, password, database_name):
    command = f"docker exec {container_id} /usr/bin/mysqldump -u {username} --password={password} --no-tablespaces {database_name} > backup.sql"
    subprocess.run(command, shell=True, check=True)
    print("[backup_job] backup created!")

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: script.py <container_id> <username> <password> <database_name>")
        sys.exit(1)
    
    container_id, username, password, database_name = sys.argv[1:5]
    
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_shell_command, 'interval', minutes=30, args=[container_id, username, password, database_name])
    
    # Start the scheduler
    scheduler.start()
    
    print("Scheduler started. Press Ctrl+C to exit.")
    try:
        # This is a simple way to keep the script running
        while True:
            pass
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()

