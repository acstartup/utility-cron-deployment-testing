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
    if (!type || !recurrence || !price || !description) {
      alert("All bill information inputs must be filled to add a bill.");
      return;
    }

    const newBill = {
      type: type,
      recurrence: recurrence,
      price: parseFloat(price),
      description: description
    }
    showBill([...bills, newBill]);
    saveBill(newBill);

    {/* clear bill spots */}
    setType("");
    setRecurrence("");
    setPrice("");
    setDescription("");
  }

  const handleDelete = () => {

  }

  return (
    <div className="relative pt-20 pl-75 min-w-screen min-h-screen">
      <h1 className="text-black font-bold">Add Utility</h1>
      <div className="flex flex-col relative gap-3 right-15 pt-3">
        <select 
          id="type" 
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"> 
          {/* 1. utility type (dropdown) 2. recurrance (dropdown) 3. price (input) 4. description (input) */}
          <option value="">Select utility type</option>
          <option value="Rent">Rent</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
        </select>
        <select 
          id="recurrence" 
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className="border border-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm">
          <option value="">Select utility recurrence</option>
          <option value="Secondly">Secondly</option>
          <option value="Minutely">Minutely</option>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
        </select>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-black outline-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"
          placeholder="Price ($)"
        ></input>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-black outline-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"
          placeholder="Description"
        ></input>
        <div className="grid justify-start pl-12">
          <button
            onClick={handleBill} className="border border-black outline-black text-black w-20 h-6 rounded-md hover:bg-gray-100 text-sm hover:outline-[0.5]"
          >
            Compute
          </button>
        </div>
      </div>

      {/* 1. return for computed info into a UI computed bill but not yet deployed */}
      {bills.map((bill, index) => (
      <div className="">
        <div key={index} className="relative border bg-slate-50 mb-2 border-black shadow-md rounded-lg text-black text-md px-2 py-1 right-30 top-10 w-81">
          <div className="flex justify-between">
            <span className="font-bold text-sm">Your Bill:</span>
            <a onClick={handleDelete} className="relative text-center font-bold border leading-none w-4.5 h-4.5 text-sm rounded-md hover:outline-[0.5]">x</a>
          </div>
          <div className="flex gap-8">
            <span className="text-xs"><span className="font-bold">Type:</span> {bill.type}</span>
            <span className="text-xs"><span className="font-bold">Recurrence:</span> {bill.recurrence}</span>
            <span className="text-xs"><span className="font-bold">Price:</span> ${bill.price}</span>
          </div>
          <div className="grid pt-0.5">
            <span className="text-xs"><span className="font-bold">Description:</span> {bill.description}</span>
          </div>
        </div>  
      </div>
      ))}

      {/* 2. return for actual deployed bill from deploy.ts data cron taking bill info into a deployment */}
    </div> 
  )
}