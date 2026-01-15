"use client"

import { useState, useEffect } from 'react';
import { saveBill, getBills, deleteBill, getDeployments, bill, deployment } from '@/lib/back';

export default function Home() {
  const [bills, showBill] = useState<bill[]>([]);
  const [deployments, setDeployments] = useState<deployment[]>([]);

  {/* default lines */}
  const [address, setAddress] = useState('');
  const [type, setType] = useState(''); // type = value and setType = function to change it
  const [recurrence, setRecurrence] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    getBills().then(showBill);
    getDeployments().then(setDeployments);
  }, []);

  {/* function to handle compute w/ save and note and deploy */}
  const handleBill = () => {
    if (!type || !recurrence || !price || !description) {
      alert("All bill information inputs must be filled to add a bill.");
      return;
    }
  
    {/* 3 bill limiter */}
    if (bills.length > 3) {
      alert("Hit max capacity of 3 bills, delete a current one to add more")
      return;
    }

    const newBill = {
      address: address,
      type: type,
      recurrence: recurrence,
      price: parseFloat(price),
      description: description,
      date: date
    }
    showBill([...bills, newBill]);
    saveBill(newBill);

    {/* clear bill spots */}
    setAddress("");
    setType("");
    setRecurrence("");
    setPrice("");
    setDescription("");
    setDate("");
  };

  const handleDelete = async (id: string) => {
    await deleteBill(id);
    showBill(bills.filter(bill => bill.id !== id));
  };

  return (
    <div className="flex min-h-screen min-w-screen">
      {/* Left side - Add Utility & Bills */}
      <div className="relative pt-20 pl-120">
      <h1 className="text-black font-bold">Add Utility</h1>
      <div className="flex flex-col relative gap-3 right-15 pt-3">
        {/* add address */}
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-black outline-black text-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"
          placeholder="Address"
        >
        </input>
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
        <input
          id="startDate"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-black text-black outline-black w-50 h-6 px-1 rounded-md bg-gray-100 text-sm"
        />
        <div className="grid justify-start pl-12">
          <button
            onClick={handleBill} className="border border-black outline-black text-black w-20 h-6 rounded-md hover:bg-gray-100 text-sm hover:outline-[0.5]"
          >
            Compute
          </button>
        </div>
      </div>

      {/* Bills list */}
      {bills.map((bill, index) => (
        <div key={index} className="relative border bg-slate-50 mb-2 border-black shadow-md rounded-lg text-black text-md px-2 py-1 right-26 top-10 w-max h-max">
          <div className="flex justify-between gap-4">
            <span className="font-bold text-sm">{bill.address}</span>
            <span className="text-xs font-semibold top-0.5">Start Date: {bill.date}</span>
            <a onClick={() => handleDelete(bill.id!)} className="text-center font-bold border leading-none w-4.5 h-4.5 text-sm rounded-md hover:outline-[0.5] cursor-pointer">x</a>
          </div>
          <div className="flex flex-row gap-4">
            <span className="text-xs"><span className="font-bold">Type:</span> {bill.type}</span>
            <span className="text-xs"><span className="font-bold">Recurrence:</span> {bill.recurrence}</span>
            <span className="text-xs"><span className="font-bold">Price:</span> ${bill.price}</span>
          </div>
          <div className="grid pt-0.5">
            <span className="text-xs"><span className="font-bold">Description:</span> {bill.description}</span>
          </div>
        </div>
      ))}
      </div>

      {/* Right side - Deployments */}
      <div className="w-1/2 relative flex flex-col pl-30 pt-19">
        <h2 className="text-black font-bold mb-2">Deployments</h2>
        {deployments.map((dep) => (
          <div key={dep.id} className="border relative bg-green-50 mb-2 border-green-600 shadow-md items-center rounded-lg text-black text-md px-2 py-1 w-max h-max -ml-23">
            <div className="flex justify-between gap-4">
              <span className="font-bold text-sm">{dep.address}</span>
              <span className="text-xs font-semibold top-0.5">Deployed: {new Date(dep.deployed_at).toLocaleString()}</span>
            </div>
            <div className="flex flex-row gap-4">
              <span className="text-xs"><span className="font-bold">Type:</span> {dep.type}</span>
              <span className="text-xs"><span className="font-bold">Recurrence:</span> {dep.recurrence}</span>
              <span className="text-xs"><span className="font-bold">Price:</span> ${dep.price}</span>
            </div>
            <div className="grid pt-0.5">
              <span className="text-xs"><span className="font-bold">Description:</span> {dep.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}