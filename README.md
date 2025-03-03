# GymBuddy

นี่คือแอปพลิเคชัน Next.js สำหรับหน้า Landing Page ด้านฟิตเนสชื่อ "GymBuddy" ซึ่งรวมถึงฟีเจอร์ต่าง ๆ เช่น แผนการออกกำลังกาย การมีส่วนร่วมของชุมชน และข้อมูลโภชนาการ

## Prerequisites

ก่อนที่คุณจะเริ่ม โปรดตรวจสอบให้แน่ใจว่าคุณได้ทำตามข้อกำหนดต่อไปนี้:

- คุณได้ติดตั้ง [Node.js](https://nodejs.org/) (เวอร์ชัน 14.x หรือใหม่กว่า)
- คุณได้ติดตั้ง [npm](https://www.npmjs.com/) หรือ [yarn](https://yarnpkg.com/) installed.

## Getting Started

ทำตามขั้นตอนเหล่านี้เพื่อตั้งค่าโปรเจกต์ในเครื่องของคุณ:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Best0129/Client-side-Project.git
   cd Client-side-Project
   ```

2. **Install dependencies**

    ใช้ npm
    ```bash
    // Dependencies อื่นๆ
    npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @prisma/client bcryptjs formidable lucide-react next@15.1.4 prisma react@19.0.0 react-dom@19.0.0 react-icons
        
    // Dependencies ของ Next.js
    npm install --save-dev @eslint/eslintrc @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-next typescript
    ```
   ใช้ yarn 
    ```bash
   // Dependencies อื่นๆ
    yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @prisma/client bcryptjs formidable lucide-react next@15.1.4 prisma react@19.0.0 react-dom@19.0.0 react-icons
    
    // Dependencies ของ Next.js
    yarn add --dev @eslint/eslintrc @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-next typescript
   ```

3. **ตั้งค่า Prisma:**
    รันคำสั่งต่อไปนี้เพื่อสร้าง Prisma client
    ```bash
    npx prisma generate
    ```

4. **รันเซิร์ฟเวอร์** 
    
    ใช้ npm
    ```bash
    npm run dev
    ```
   ใช้ yarn 
    ```bash
   yarn dev
   ```

5. **เปิดเบราว์เซอร์**
ไปที่ http://localhost:3000

## Refferences
- [Next.js](https://nextjs.org)
- [Prisma](https://www.prisma.io)
- [Font Awesome](https://fontawesome.com)
- [Lucide icons](https://lucide.dev)
- [React icons](https://react-icons.github.io/react-icons/)