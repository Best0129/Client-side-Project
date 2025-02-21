import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function PUT(req) {
    try {
        const { email, newPassword } = await req.json(); // Parse the JSON body

        console.log('Request body:', { email, newPassword }); // Log the incoming request body

        // Check if the user exists
        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (!userExists) {
            return NextResponse.json({ error: 'User  not found' }, { status: 404 });
        }

        // Hash the new password
        const hashedPassword = await hash(newPassword, 10);

        // Update the user's password in the database
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json({ error: 'Failed to change password', details: error.message }, { status: 500 });
    }
}