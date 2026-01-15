import { supabase } from './supabase';

/* TyseScript declaring Bill component types */
export interface bill {
    id?: string;
    address: string
    type: string
    recurrence: string
    price: number
    description: string
    date: string
}

/* function to save bill to localStorage */
export async function saveBill (newBill: bill) { {/* newBill is a type of bill, bills = array, taking the bills from array then pushing newBill into bills array, then JSON.strinigfy newBill into bills array into localStorage */}
    const { error } = await supabase.from('bills').insert(newBill);
    if (error) throw error;
}

export async function getBills(): Promise<bill[]> {
    const { data, error } = await supabase.from('bills').select('*');
    if (error) throw error;
    return data || [];
}

export async function deleteBill(id: string) {
    const { error } = await supabase.from('bills').delete().eq('id', id);
    if (error) throw error;
}

/* function for calling vercel daily cron and alerting from that */