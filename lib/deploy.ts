/* TyseScript declaring Bill component types */
export interface bill {
    type: string
    recurrence: string
    price: number
    description: string
}

/* function to save bill to localStorage */
export async function saveBill (bill: bill) {
    let bills = JSON.parse(localStorage.getItem('bill')) || [];
    bills.push(bill);
    localStorage.setItem('Bills', JSON.stringify('bills'));
    alert("Bill Saved");
}

/* function for calling vercel daily cron and alerting from that */