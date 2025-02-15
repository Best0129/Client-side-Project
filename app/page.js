import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Workouts from '@/components/Workouts';
import AboutUs from '@/components/AboutUs';
import Recentworkout from '@/components/Recentworkout';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <AboutUs />
            <Workouts />
            <Recentworkout />
            <Footer />
        </main>
    );
}