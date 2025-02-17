"use client"
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        const data = await response.json();
        if (response.ok) {
          console.log(data.message); // "Logged out successfully"
          
          // Clear user data from localStorage
          localStorage.removeItem('user');
          router.push('/'); 
        } else {
          console.error(data.message); // Handle error
        }
      };
    return (
        <main>
            <Navbar />
            <button onClick={handleLogout}>Logout</button>
        </main>
    );
}