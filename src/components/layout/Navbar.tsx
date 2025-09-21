import React, { useState } from 'react';
// import bushivelogo from 'https://res.cloudinary.com/dx0r0pbgb/image/upload/v1758447983/bushivelogo_1_tnvoyd.png'; // Ensure the logo image is in the same directory
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DriverRegistrationModal } from '@/components/driver-register/DriverRegistrationModal';

interface NavbarProps {
  title: string;
  showDriverRegister?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  showDriverRegister = false,
}) => {
  // State for modal open/close
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  return (
    <nav className="bg-[#ece6e1] border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Logo Image */}
          <img 
            src="https://res.cloudinary.com/dx0r0pbgb/image/upload/v1758447983/bushivelogo_1_tnvoyd.png"
            alt="BusHive Logo" 
            className="h-10 w-10 object-contain"
          />

          <div>
            <h1 className="text-xl font-bold text-[#99744a] hover:text-[#2f362c]">
              BusHive Authority Portal
            </h1>
            <p className="text-sm text-[#414a37]">{title}</p>
          </div>
        </div>

        {/* Driver Register Button */}
        <div className="flex items-center space-x-6">
          {showDriverRegister && (
            <Button
              onClick={() => setIsDriverModalOpen(true)}
              className="bg-[#304159] text-slate-200 px-4 py-2 rounded-full hover:bg-[#2F362C] transition-colors duration-200 flex items-center space-x-1"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Driver Register
            </Button>
          )}
        </div>
      </div>

      {/* Driver Registration Modal */}
      <DriverRegistrationModal
        isOpen={isDriverModalOpen}
        onClose={() => setIsDriverModalOpen(false)}
        onComplete={() => setIsDriverModalOpen(false)}
      />
    </nav>
  );
};
