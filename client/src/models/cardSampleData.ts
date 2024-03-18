export interface Measure {
  type: string;
  data: {
    title: string;
    type: string;
  };
}

export interface Item {
  type: string;
  data: {
    title: string;
    type: string;
  };
}

export interface BorrowedBy {
  type: string;
  data: string;
}

export interface CardData {
  id: string;
  Name: string;
  "Item Name": string;
  Measure: Measure;
  Item: Item;
  Ages: string;
  Acronym: string;
  Level: string;
  Edition: string;
  Stock: string;
  "Borrowed By": BorrowedBy;
  "Checked Out": string;
}

const cardSampleData: CardData[] = [
  {
    id: "1",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Stock: "50",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "testUser",
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "2",
    Name: "Eating Disorder Inventory",
    "Item Name": "Professional Manual",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Second Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Kit",
        type: "item",
      },
    },
    Ages: "20-50",
    Acronym: "SCN-2",
    Level: "A",
    Edition: "1",
    Stock: "0",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "secondTestUser",
    },
    "Checked Out": "28/01/2023",
  },
  {
    id: "3",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Third Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "30-60",
    Acronym: "TCN-3",
    Level: "B",
    Edition: "3",
    Stock: "5",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "thirdTestUser",
    },
    "Checked Out": "29/01/2023",
  },
  {
    id: "4",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Fourth Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "40-70",
    Acronym: "FCN-4",
    Level: "D",
    Edition: "4",
    Stock: "24",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "fourthTestUser",
    },
    "Checked Out": "30/01/2023",
  },
  {
    id: "5",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Fifth Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "CD",
        type: "item",
      },
    },
    Ages: "35-55",
    Acronym: "FCN-5",
    Level: "A",
    Edition: "5",
    Stock: "30",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "fifthTestUser",
    },
    "Checked Out": "31/01/2023",
  },
  {
    id: "6",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Sixth Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "30-40",
    Acronym: "FCN-6",
    Level: "B",
    Edition: "6",
    Stock: "25",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "sixthTestUser",
    },
    "Checked Out": "01/02/2023",
  },
  {
    id: "7",
    Name: "Seventh Card Name",
    "Item Name": "Seventh Item Name",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Seventh Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "45-65",
    Acronym: "FCN-7",
    Level: "C",
    Edition: "7",
    Stock: "22",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "seventhTestUser",
    },
    "Checked Out": "02/02/2023",
  },
  {
    id: "8",
    Name: "Eighth Card Name",
    "Item Name": "Eighth Item Name",
    Measure: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Eighth Measure",
        type: "measure",
      },
    },
    Item: {
      type: "columnCustomComponents.pill",
      data: {
        title: "Textbook",
        type: "item",
      },
    },
    Ages: "20-30",
    Acronym: "FCN-8",
    Level: "A",
    Edition: "8",
    Stock: "18",
    "Borrowed By": {
      type: "columnCustomComponents.user",
      data: "eighthTestUser",
    },
    "Checked Out": "03/02/2023",
  },
];

export default cardSampleData;
