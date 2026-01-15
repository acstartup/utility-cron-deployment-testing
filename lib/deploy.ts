/* TyseScript declaring Bill component types */
export interface bill {
    type: string
    recurrence: string
    price: number
    description: string
}

/* function to save bill to localStorage */
export async function saveBill (newBill: bill) { {/* newBill is a type of bill, bills = array, taking the bills from array then pushing newBill into bills array, then JSON.strinigfy newBill into bills array into localStorage */}
    let bills = JSON.parse(localStorage.getItem('bills') || '[]');
    bills.push(newBill);
    localStorage.setItem('Bills', JSON.stringify(newBill));
    alert("Bill Saved");
}

/* function for calling vercel daily cron and alerting from that */