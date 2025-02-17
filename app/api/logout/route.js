import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Create a response object
    const response = NextResponse.json({ message: 'Logged out successfully' });

    return response;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}