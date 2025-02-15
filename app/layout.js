import './globals.css'

export const metadata = {
  title: 'GymBuddy - Your Ultimate Fitness Companion',
  description: 'Transform your life with personalized workouts, nutrition plans, and a supportive community',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}