import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { data: bills } = await supabase.from('bills').select('*');
  
  const today = new Date();
  const deployedBills = [];

  for (const bill of bills || []) {
    const startDate = new Date(bill.date);
    
    if (shouldDeploy(startDate, bill.recurrence, today)) {
      // Save deployment to database
      await supabase.from('deployments').insert({
        bill_id: bill.id,
        address: bill.address,
        type: bill.type,
        recurrence: bill.recurrence,
        price: bill.price,
        description: bill.description,
      });
      deployedBills.push(bill);
    }
  }

  return NextResponse.json({ deployed: deployedBills.length });
}

function shouldDeploy(startDate: Date, recurrence: string, today: Date): boolean {
  const diffMs = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  switch (recurrence) {
    case 'Minutely':
      return true; // Every minute
    case 'Daily':
      return diffDays >= 0 && diffMs >= 0; // Every day from start
    case 'Monthly':
      return today.getDate() === startDate.getDate(); // Same day each month
    default:
      return false;
  }
}