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
    <div class="bg-white p-4 rounded-lg shadow-md h-full w-full ">
    <h2 class="text-xl font-bold mb-2">Orders Overview</h2>
    <div class="text-green-500 mb-4">30 this month.</div>
    <div class="space-y-4 content-overflow-custom ">
        <div class="flex items-center justify-between space-x-2 text-gray-700">
            <div class="flex flex-col order-date-custom">
                <span class="flex items-center space-x-1">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128 320l128-128 128 128z"></path></svg>
                    <span>Design changes</span>
                </span>
                <p class="text-gray-500 text-sm">22 DEC 7:20 PM</p>
            </div>
            <span class="ml-auto text-gray-400 text-sm">$2400</span>
        </div>
        <div class="flex items-center justify-between space-x-2 text-gray-700">
            <div class="flex flex-col order-date-custom">
                <span class="flex items-center space-x-1">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128 320l128-128 128 128z"></path></svg>
                    <span>Design changes</span>
                </span>
                <p class="text-gray-500 text-sm">22 DEC 7:20 PM</p>
            </div>
            <span class="ml-auto text-gray-400 text-sm">$2400</span>
        </div>
        <div class="flex items-center justify-between space-x-2 text-gray-700">
            <div class="flex flex-col order-date-custom">
                <span class="flex items-center space-x-1">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128 320l128-128 128 128z"></path></svg>
                    <span>Design changes</span>
                </span>
                <p class="text-gray-500 text-sm">22 DEC 7:20 PM</p>
            </div>
            <span class="ml-auto text-gray-400 text-sm">$2400</span>
        </div>
        <div class="flex items-center justify-between space-x-2 text-gray-700">
            <div class="flex flex-col order-date-custom">
                <span class="flex items-center space-x-1">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128 320l128-128 128 128z"></path></svg>
                    <span>Design changes</span>
                </span>
                <p class="text-gray-500 text-sm">22 DEC 7:20 PM</p>
            </div>
            <span class="ml-auto text-gray-400 text-sm">$2400</span>
        </div>
        <div class="flex items-center justify-between space-x-2 text-gray-700">
            <div class="flex flex-col order-date-custom">
                <span class="flex items-center space-x-1">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128 320l128-128 128 128z"></path></svg>
                    <span>Design changes</span>
                </span>
                <p class="text-gray-500 text-sm">22 DEC 7:20 PM</p>
            </div>
            <span class="ml-auto text-gray-400 text-sm">$2400</span>
        </div>
    </div>
</div>

  );
}

export default OrderOverview;
