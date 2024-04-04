import csv
import random

def update_csv_inplace(file_path):
    # Read the CSV file and update it in place
    with open(file_path, 'r') as csvfile:
        reader = csv.reader(csvfile)
        rows = list(reader)
    
    for row in rows:
        row[-1] = str(random.randint(1, 20))  # Updating the last column with a random number
    
    with open(file_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(rows)

# Example usage
input_file = './csv_data/item_data.csv'
update_csv_inplace(input_file)
print("CSV file updated successfully.")
