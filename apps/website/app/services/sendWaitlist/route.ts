import type { NextRequest } from 'next/server';
import supabaseServer from '../supabaseServer';

export async function POST(request: NextRequest) {
  const requestBodyText = await request.text();

  try {
    const waitlistInfo = JSON.parse(requestBodyText);

    const supabase = supabaseServer();

    const { error } = await supabase.from('waitlist').insert([waitlistInfo]);

    if (error) {
      console.error('Error to insert row', error.message);
      return new Response('Server error', { status: 500 });
    }

    return new Response('Waitlist sent', {
      status: 200
    });
  } catch (err: any) {
    console.error('Error al procesar la solicitud:', err.message);
    return new Response('Error interno del servidor', { status: 500 });
  }
}
