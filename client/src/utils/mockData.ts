import { User } from "../models/User";
import { notificationType } from "../models/notification";
import { Notification } from "../models/notification";
import { columnCustomComponents } from "../models/tableColumns";

// Mock Notification Data
export const adminMockNotifications: Notification[] = [
  {
    notificationType: notificationType.lowStock,
    itemName: "Brown Attention-Deficit Disorder Scales",
    date: "01/02/2023",
    time: "10:23",
  },
  {
    notificationType: notificationType.lowStock,
    itemName: "Comprehensive Test of Phonological Processing",
    date: "01/02/2023",
    time: "10:37",
  },
  {
    notificationType: notificationType.lowStock,
    itemName: "Eating Disorder Inventory",
    date: "01/02/2023",
    time: "10:23",
  },
];

export const clientMockNotifications: Notification[] = [
  {
    notificationType: notificationType.overdue,
    itemName: "Brown Attention-Deficit Disorder Scales",
    date: "01/02/2023",
    time: "10:23",
  },
  {
    notificationType: notificationType.overdue,
    itemName: "Comprehensive Test of Phonological Processing",
    date: "01/02/2023",
    time: "10:37",
  },
  {
    notificationType: notificationType.overdue,
    itemName: "Eating Disorder Inventory",
    date: "01/02/2023",
    time: "10:23",
  },
];

// Mock Table Data
export const defaultMockData: Record<string, string | Object>[] = [
  {
    id: "1",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "2",
    Name: "Eating Disorder Inventory",
    "Item Name": "Professional Manual",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Eating Disorder",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "3",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Projective",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "4",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Kit",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "5",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "USB Stick",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "6",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "7",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "2",
    Name: "Eating Disorder Inventory",
    "Item Name": "Professional Manual",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Eating Disorder",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
  {
    id: "3",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Projective",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
  },
];

export const testUser: User = {
  firstName: "John",
  lastName: "Doe",
  email: "18dasta@queensu.ca",
  notifications: true,
  role: "client",
  profileImageUrl: "",
};

export const signedOutMockData: Record<string, string | Object>[] = [
  {
    id: "1",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "2",
    Name: "Eating Disorder Inventory",
    "Item Name": "Professional Manual",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Eating Disorder",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "3",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Projective",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "4",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Kit",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "5",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "USB Stick",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "6",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
  {
    id: "7",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
  },
];

export const overdueMockData: Record<string, string | Object>[] = [
  {
    id: "1",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
  {
    id: "2",
    Name: "Eating Disorder Inventory",
    "Item Name": "Professional Manual",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Eating Disorder",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
  {
    id: "3",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Projective",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
  {
    id: "4",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Kit",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
  {
    id: "5",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "USB Stick",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
  {
    id: "6",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
  {
    id: "7",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    "Borrowed By": {
      type: columnCustomComponents.user,
      data: testUser,
    },
    "Checked Out": "27/01/2023",
    "Last Notified": "27/01/2023",
  },
];

export const lowStockMockData: Record<string, string | Object>[] = [
  {
    id: "1",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
  {
    id: "2",
    Name: "Eating Disorder Inventory",
    "Item Name": "Professional Manual",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Eating Disorder",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
  {
    id: "3",
    Name: "Draw a Person",
    "Item Name": "Scoring Chart",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Projective",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Book",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
  {
    id: "4",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Kit",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
  {
    id: "5",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "USB Stick",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
  {
    id: "6",
    Name: "Adaptive Behaviour Assessment System",
    "Item Name": "Adult Form",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "General Behavior and Emotion",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Form",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
  {
    id: "7",
    Name: "Comprehensive Test of Phonological Processing",
    "Item Name": "Training Protocols",
    Measure: {
      type: columnCustomComponents.pill,
      data: {
        title: "Attention/ ADHD",
        type: "measure",
      },
    },
    Item: {
      type: columnCustomComponents.pill,
      data: {
        title: "Manual",
        type: "item",
      },
    },
    Ages: "16-89",
    Acronym: "ABAS-2",
    Level: "C",
    Edition: "2",
    Quantity: "1",
    "Ordering Company": {
      type: columnCustomComponents.link,
      data: {
        link: "https://www.wpspublish.com/",
      },
    },
  },
];
