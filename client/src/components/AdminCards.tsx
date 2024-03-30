import React from "react";
import { Link } from "react-router-dom";
import cardSampleData, { AdminCardData } from "../models/adminCards";
import { Role } from "../models/User";
import lowStockSvg from "../assets/icons/low-stock-color.svg";
import overdueSvg from "../assets/icons/overdue-color.svg";
import signOutSvg from "../assets/icons/sign-out-color.svg";

interface AdminCardsProps {
  userRole: Role;
  cardCounts: {
    signedOut: number;
    lowStock: number;
    overdue: number;
  };
}

const AdminCards: React.FC<AdminCardsProps> = ({
  userRole,
  cardCounts,
}: AdminCardsProps) => {
  if (userRole !== "admin") {
    return null;
  }

  const cards = [
    {
      id: "1",
      Name: "Signed Out Items",
      Count: cardCounts.signedOut.toString(),
      Icon: signOutSvg,
      Link: "/signed-out",
      route: "/signed-out",
    },
    {
      id: "2",
      Name: "Overdue Items",
      Count: cardCounts.overdue.toString(),
      Icon: overdueSvg,
      Link: "/overdue",
      route: "/overdue",
    },
    {
      id: "3",
      Name: "Low Stock Items",
      Count: cardCounts.lowStock.toString(),
      Icon: lowStockSvg,
      Link: "/low-stock",
      route: "/low-stock",
    },
  ];

  return (
    <div className="flex flex-wrap space-x-10">
      {cards.map((cardData: AdminCardData) => (
        <Link
          key={cardData.id}
          to={`/admin${cardData.route}`}
          className="hover:no-underline"
        >
          <div className="shadow-md hover:bg-gray-100 rounded-lg h-min relative py-3 px-6 cursor-pointer">
            <div className="flex">
              <div>
                <h1 className="text-2xl font-semibold mb-1 mt-2">
                  {cardData.Count}
                </h1>
              </div>
              <div className="pl-24 pt-2">
                <img
                  src={cardData.Icon}
                  alt={cardData.Name}
                  className="w-8 h-8 min-w-8 min-h-8"
                />
              </div>
            </div>
            <h3 className="text-sm font-light pb-1">{cardData.Name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminCards;
