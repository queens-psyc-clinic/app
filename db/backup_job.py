from apscheduler.schedulers.background import BackgroundScheduler
import subprocess

def run_shell_command(cmd: str, log: str):
    subprocess.run(cmd, shell=True, check=True)
    print(log)


def backup_db():
    run_shell_command(
        "cp -R ./data/psychClinic ./backup",
        "[backup_job] new backup created!"
    )

if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    scheduler.add_job(backup_db, 'interval', days=1)

    # Start the scheduler
    scheduler.start()

    print("Scheduler started. Press Ctrl+C to exit.")
    try:
        # This is a simple way to keep the script running
        while True:
            pass
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
