from datetime import datetime
from typing import List, Optional

from flask_mail import Message
from common.db import execute_sql_query
from common.email import create_email

def check_overdue() -> Optional[List[Message]]:
    overdue_loans = execute_sql_query('SELECT', 'Loans', conditions={'EndDate': datetime.now().strftime("%Y-%m-%d"), 'IsConfirmed': 1})
    if not overdue_loans:
        return
    
    owners = {loan['UserID'] for loan in overdue_loans}
    item_data = {id: [execute_sql_query('SELECT', 'Items',  conditions={'ID': l["ItemID"]}) for l in overdue_loans if l['UserID'] is id] for id in owners}

    print_items = lambda id: '<ul>'.join(f"<li> <b>Item:</b> {i['ItemType']}, <b>Name:</b> {i['ItemName']}, <b>From Test:</b> {i['TestID']}</li>" for i in item_data[id][0]) + '</ul>'
    message: str = """
    Hiya! Hope You're doing well.<br><br>The Queen's Psychology Clinic gently
    reminds you that the following test materials are due and should be
    returned to the clinic as soon as you are able.<br><br>
    """

    emails = {id: execute_sql_query('SELECT', 'Users', conditions={'ID': id})[0]['Email'] for id in owners}
    email_data = [create_email(id, 'Heads Up! Items Due', emails[id], message + print_items(id)) for id in owners]

    notif_data = [{'ID': hash(datetime.now()), 'UserID': id, 'Message': message + print_items(id), 'NotificationDate': datetime.now()} for id in owners]
    execute_sql_query('INSERT', 'Notifications', data=notif_data)

    return email_data

