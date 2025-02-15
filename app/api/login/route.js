import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Request Body:', body);

    if (!body) {
      return new Response(JSON.stringify({ message: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { email, password } = body;
    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User  not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Compare the provided password with the hashed password
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return new Response(JSON.stringify({ message: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the user data if the password is valid
    return new Response(JSON.stringify({ message: 'Logged in successfully', user: { username: user.username, email: user.email } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}