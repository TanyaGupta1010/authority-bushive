🚌 BusHive – Driver Registration & Attendance System

BusHive is a web application designed to help transport authorities register drivers and track their attendance (clock in/clock out) for public buses.
The platform ensures smooth operations by allowing authorities to verify drivers, monitor their work hours, and maintain records in one central system.

🚀 Tech Stack

🎨 Frontend: React + TypeScript + Vite + TailwindCSS

🖥️ Backend: Node.js + Express

🗄️ Database: MongoDB

🧩 UI Components: ShadCN/UI + Lucide Icons

☁️ Hosting: Vercel (Frontend) & MongoDB Atlas (Database)

🔗 APIs & Libraries Used

🗺️ Leaflet – Interactive maps for bus & driver visualization

📡 Axios – For API requests between frontend & backend

🔄 Socket.IO – Real-time updates (e.g., live driver attendance/status)

🌐 REST API – For driver registration, authentication, and attendance tracking

📂 Project Structure
src/
│── api/                  # API integration (driver & auth APIs)
│── components/           # Reusable UI + feature components
│   ├── auth/             # Login & Signup pages
│   ├── driver-register/  # Multi-step driver registration flow
│   ├── layout/           # Navbar, Sidebar, Footer
│   ├── ui/               # Reusable UI components (cards, forms, tables, etc.)
│   ├── Dashboard.tsx     # Authority dashboard
│   ├── DriverTable.tsx   # Driver listing & attendance
│   ├── DriverProfile.tsx # Driver profile details
│   ├── WelcomePage.tsx   # Landing page
│   └── SearchBar.tsx     # Search functionality
│── data/                 # Mock data
│── hooks/                # Custom hooks (toast, etc.)
│── lib/                  # Utility functions
│── types/                # TypeScript type definitions
│── App.tsx               # Root component
│── main.tsx              # Entry point

⚙️ Features

✅ Driver Registration Flow – Multi-step form with Aadhaar verification
✅ Driver Attendance Tracking – Clock-in & clock-out functionality
✅ Authority Dashboard – View registered drivers & their status
✅ Search & Filter – Quickly find drivers in the database
✅ Real-Time Updates – Socket.IO support for instant attendance logs
✅ Map Integration – Leaflet for bus/driver tracking
✅ Responsive UI – Mobile-friendly design with modern UI components
