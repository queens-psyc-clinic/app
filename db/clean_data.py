import pandas as pd

original_data = pd.read_csv('original_data.csv')

rename_scheme = {
    'Acronym': 'ID',
    'Level of User': 'LevelOfUser',
    'Measure of:': 'MeasureOf',
    'Ordering Company': 'OrderingCompany',
    'Edition Number': 'EditionNumber',
    'Number of Items': 'NumberOfParts',
    'Item Name': 'ItemName',
    'Item': 'ItemType'
}
original_data = original_data.rename(columns=rename_scheme).replace(r'\n', ' ', regex=True).replace(r'^\s+|\s+$', '', regex=True)




test_data = original_data[[
    'ID', 
    'Name', 
    'MeasureOf', 
    'LevelOfUser', 
    'EditionNumber', 
    'OrderingCompany'
]].drop_duplicates(subset=['ID'], keep='first')
test_data.to_csv('test_data.csv', index=False)



item_data = original_data.rename(columns={'ID' : 'TestID'})
item_data['ID'] = item_data.apply(lambda row: f"{row['TestID']}-{row.name}", axis=1)
item_data['Status'] = 1
item_data['IsArchived'] = 0
item_data['Stock'] = 1
item_data = item_data[[
    'ID', 
    'Status',
    'ItemType', 
    'ItemName', 
    'Ages',
    'NumberOfParts',
    'Location',
    'TestID',
    'IsArchived',
    'Stock'
]]
item_data.to_csv('item_data.csv', index=False)
