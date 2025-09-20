import { Bus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  title: string;
  onDriverRegister?: () => void;
  showDriverRegister?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ title, onDriverRegister, showDriverRegister = false }) => {
  return (
    <nav className="bg-[#ece6e1] border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Bus className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font- text-[#99744a] hover-[#2f362c]">BusHive Authority Portal</h1>
            <p className="text-sm text-[#414a37]">{title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          {/* <div className="text-sm text-slate-300">
            Transport Department | Government Portal
          </div> */} 
          {showDriverRegister && (
            <Button
              onClick={onDriverRegister}
              className="bg-[#414A37] text-[#DBC2A6] px-4 py-2 rounded-lg hover:bg-[#2F362C] transition-colors duration-200 flex items-center space-x-1"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Driver Register 
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};