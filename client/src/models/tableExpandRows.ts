import { getPillColor } from './libraryItem';

interface ExpandedRowItem {
  itemName: string;
  item: string;
  color: string;
}

interface ExpandedRowData {
  id: string;
  items: ExpandedRowItem[];
}

const expandedRowsData: ExpandedRowData[] = [
  {
    id: '1',
    items: [
      { itemName: 'Adaptive Behaviour Assessment', item: 'Form', color: getPillColor('Form') },
      { itemName: 'Theories of Adaptive Behaviour', item: 'Kit', color: getPillColor('Kit') },
    ],
  },
  {
    id: '2',
    items: [
      { itemName: 'Another Book', item: 'Book', color: getPillColor('Book') },
      { itemName: 'Social Skills Assessment', item: 'Form', color: getPillColor('Form') },
    ],
  },
  {
    id: '3',
    items: [
      { itemName: 'Intelligence Test', item: 'Form', color: getPillColor('Form') },
      { itemName: 'Another Manual', item: 'Manual', color: getPillColor('Manual') },
    ],
  },
  {
    id: '4',
    items: [
      { itemName: 'Personality Assessment', item: 'Form', color: getPillColor('Form') },
      { itemName: 'More Books', item: 'Book', color: getPillColor('Book') },
      { itemName: 'Another Form', item: 'Form', color: getPillColor('Form') },
    ],
  },
  {
    id: '5',
    items: [
      { itemName: 'Personality Assessment', item: 'CD', color: getPillColor('CD') },
      { itemName: 'Another Form', item: 'Form', color: getPillColor('Form') },
      { itemName: 'More Books', item: 'Book', color: getPillColor('Book') },
    ],
  },
  // Add data for other expanded rows if needed
];

export default expandedRowsData;
