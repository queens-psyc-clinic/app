import lowStockSvg from '../assets/icons/low-stock-color.svg';
import overdueSvg from '../assets/icons/overdue-color.svg';
import signOutSvg from '../assets/icons/sign-out-color.svg';

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
  
export interface AdminCardData {
    id: string;
    Name: string;
    Count: string;
    Icon: string;
    Link: string;
}
  
const cardSampleData: AdminCardData[] = [
    {
        id: "1",
        Name: "Signed Out Items",
        Count: "24",
        Icon: signOutSvg,
        Link: "/signed-out-items"
    },
    {
        id: "2",
        Name: "Overdue Items",
        Count: "3",
        Icon: overdueSvg,
        Link: "/overdue-items"
    },
    {
        id: "3",
        Name: "Low Stock Items",
        Count: "14",
        Icon: lowStockSvg,
        Link: "/low-stock-items"
    },
];

  
export interface OverdueItems {
    type: string;
    data: string;
}

export interface SignedOutItems {
    type: string;
    data: string;
}
  
export default cardSampleData;