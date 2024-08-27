import React from 'react';
import { IoMdArrowDropup } from 'react-icons/io';

function OrderOverview() {
  const orders = [
    { date: '22 DEC 7:20 PM', description: 'Design changes', amount: '$2400' },
    { date: '22 DEC 7:20 PM', description: 'Design changes', amount: '$2400' },
    { date: '22 DEC 7:20 PM', description: 'Design changes', amount: '$2400' },
    { date: '22 DEC 7:20 PM', description: 'Design changes', amount: '$2400' },
    { date: '22 DEC 7:20 PM', description: 'Design changes', amount: '$2400' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full w-full">
      <h2 className="text-xl font-bold mb-2">Orders Overview</h2>
      <div className="text-green-500 mb-4">30 this month.</div>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-2 text-gray-700"
          >
            <div className="flex flex-col order-date-custom">
              <span className="flex items-center space-x-1">
                <IoMdArrowDropup className="text-green-500" />
                <span>{order.description}</span>
              </span>
              <p className="text-gray-500 text-sm">{order.date}</p>
            </div>
            <span className="ml-auto text-gray-400 text-sm">{order.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderOverview;
