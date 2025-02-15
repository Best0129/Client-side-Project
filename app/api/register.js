import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Check if the user already exists
      const existingUser  = await prisma.user.findUnique({
        where: { email },
      });

      if (existing(User)) {
        return res.status(400).json({ message: 'User  already exists' });
      }

      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Create a new user
      const newUser  = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'User  registered successfully', user: newUser  });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}