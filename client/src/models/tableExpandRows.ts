import { ReactNode } from 'react';

interface ExpandedRowItem {
  itemName: string;
  item: string;
}

interface ExpandedRowData {
  id: string;
  items: ExpandedRowItem[];
}

const expandedRowsData: ExpandedRowData[] = [
  {
    id: '1',
    items: [
      { itemName: 'Adaptive Behaviour Assessment', item: 'Form' },
      { itemName: 'Theories of Adaptive Behaviour', item: 'Book' },
    ],
  },
  {
    id: '2',
    items: [
      { itemName: 'Social Skills Assessment', item: 'Form' },
      { itemName: 'Another Book', item: 'Book' },
    ],
  },
  {
    id: '3',
    items: [
      { itemName: 'Intelligence Test', item: 'Form' },
      { itemName: 'Another Book', item: 'Book' },
    ],
  },
  {
    id: '4',
    items: [
      { itemName: 'Personality Assessment', item: 'Form' },
      { itemName: 'More Books', item: 'Book' },
      { itemName: 'Another Form', item: 'Form' },
    ],
  },
  // Add data for other expanded rows if needed
];

export default expandedRowsData;
