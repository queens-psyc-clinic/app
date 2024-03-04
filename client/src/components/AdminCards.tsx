import React from 'react';
import cardSampleData, { AdminCardData } from '../models/adminCards';
import { Role } from '../models/User';

interface AdminCardsProps {
  userRole: Role;
}

const AdminCards: React.FC<AdminCardsProps> = ({ userRole }: AdminCardsProps) => {

    if (userRole !== "admin") {
        return null;
    }

    return (
        <div className='flex flex-wrap'>
            {cardSampleData.map((cardData: AdminCardData) => (
                <div key={cardData.id} className="shadow-md hover:bg-gray-100 rounded-lg relative py-2 px-4 ml-4 hover:cursor-pointer">
                    <div className='flex'>
                        <div>
                            <h1 className="text-3xl font-semibold pb-1 pt-2">{cardData.Count}</h1>
                        </div>
                        <div className='pl-24 pt-2'>
                            <img src={cardData.Icon} alt={cardData.Name} className="w-8 h-8 min-w-8 min-h-8" />
                        </div>
                    </div>
                    <h3 className="text-sm font-light pb-1">{cardData.Name}</h3>
                </div>
            ))}
        </div>
    );
}

export default AdminCards;
