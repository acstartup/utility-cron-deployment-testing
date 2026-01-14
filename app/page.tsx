"use client"

import { useState } from 'react';
import { saveBill, bill } from '@/lib/deploy';

export default function Home() {
  const [bills, showBill] = useState<bill[]>([]);  

  // default lines
  const [type, setType] = useState(''); // type = value and setType = function to change it
  const [recurrence, setRecurrence] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  /* function to handle compute w/ save and note and deploy */
  const handleBill = () => {
    const newBill = {
      type: type,
      recurrence: recurrence,
      price: parseFloat(price),
      description: description
    }
    showBill([...bills, newBill]);
    saveBill(newBill);
  }

  return (
    <div className="relative top-20 pl-75 min-w-screen min-h-screen">
      <h1 className="text-black">Add Utility</h1>
      <div className="flex flex-col relative gap-3 right-15 pt-3">
        <select 
          id="type" 
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"> 
          {/* 1. utility type (dropdown) 2. recurrance (dropdown) 3. price (input) 4. description (input) */}
          <option value="">Select utility type</option>
          <option value="rent">Rent</option>
          <option value="water">Water</option>
          <option value="electricity">Electricity</option>
        </select>
        <select 
          id="recurrence" 
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className="border border-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm">
          <option value="">Select utility recurrence</option>
          <option value="secondly">Secondly</option>
          <option value="minutely">Minutely</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-black outline-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"
          placeholder="Price ($)"
        ></input>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-black outline-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"
          placeholder="Description"
        ></input>
        <div className="grid justify-start pl-12">
          <button
            onClick={handleBill} className="border border-black text-black w-20 h-6 rounded-md hover:bg-gray-100 text-sm hover: gr"
          >
            Compute
          </button>
        </div>
      </div>

      {/* 1. return for computed info into a UI computed bill but not yet deployed */}
      {bills.map((bill, index) => (
        <div key={index} className="relative border bg-slate-50 border-black shadow-md rounded-lg text-black text-md px-2 py-1 right-36 top-110 w-100 w-min-w-screen h-min-h-screen">
          <div className="font-bold text-sm">Your Bill:</div>
          <div className="flex gap-18 text-sm">
            <span>Type: {bill.type}</span>
            <span>Recurrence: {bill.recurrence}</span>
            <span>Price: ${bill.price}</span>
          </div>
          <div className="text-sm">
            Description: {bill.description}
          </div>
        </div>  
      ))}

      {/* 2. return for actual deployed bill from deploy.ts data cron taking bill info into a deployment */}
    </div> 

  )
}