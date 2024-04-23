import pandas as pd

init_data = pd.read_csv('init_data.csv')

rename_scheme = {
    'Acronym': 'ID',
    'Level of User': 'LevelOfUser',
    'Measure of:': 'MeasureOf',
    'Ordering Company': 'OrderingCompany',
    'Edition Number': 'EditionNumber',
    'Number of Items': 'Stock', # Note these will be turned from str to ints
    'Item Name': 'ItemName',
    'Item': 'ItemType'
}
init_data = init_data.rename(columns=rename_scheme).replace(r'\n', ' ', regex=True).replace(r'^\s+|\s+$', '', regex=True).replace(r'  ', ' ', regex=True)


init_data['Notes'] = ''


test_data = init_data[[
    'ID', 
    'Name', 
    'MeasureOf', 
    'LevelOfUser', 
    'EditionNumber', 
    'OrderingCompany',
    'Notes',
    'IsArchived'
]].drop_duplicates(subset=['ID'], keep='first')

test_data['Name'] = test_data['Name'].fillna('Not Specified')
test_data['LevelOfUser'] = test_data['LevelOfUser'].fillna('N/A')

test_data.to_csv('test_data.csv', index=False)



item_data = init_data.rename(columns={'ID' : 'TestID'})
item_data['ID'] = item_data.apply(lambda row: f"{row['TestID']}-{row.name}", axis=1)
item_data['Status'] = 1
item_data['Stock'] = item_data['Stock'].replace(r'[^0-9]', '', regex=True).fillna(0)
item_data['ItemName'] = item_data['ItemName'].fillna('Not Specified')
item_data['Location'] = item_data['Location'].fillna('Not Specified')
item_data = item_data[[
    'ID', 
    'Status',
    'ItemType', 
    'ItemName', 
    'Ages',
    'Location',
    'TestID',
    'IsArchived',
    'Notes',
    'Stock'
]]
item_data.to_csv('item_data.csv', index=False)
