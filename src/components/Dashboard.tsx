import { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { DriverTable } from './DriverTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, Bus } from 'lucide-react';
import { Driver } from '../types';

interface DashboardProps {
  drivers: Driver[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onDriverClick: (driverId: string) => void;
  onClockIn: (driverId: string) => void;
  onClockOut: (driverId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  drivers,
  searchTerm,
  onSearchChange,
  onDriverClick,
  onClockIn,
  onClockOut,
}) => {
  const filteredDrivers = useMemo(() => {
    return drivers.filter(driver => 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.driverId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [drivers, searchTerm]);

  const stats = useMemo(() => {
    const totalDrivers = drivers.length;
    const onDutyDrivers = drivers.filter(d => d.currentStatus === 'On Duty').length;
    const offDutyDrivers = drivers.filter(d => d.currentStatus === 'Off Duty').length;
    const verifiedDrivers = drivers.filter(d => d.aadhaarVerified).length;
    
    return {
      total: totalDrivers,
      onDuty: onDutyDrivers,
      offDuty: offDutyDrivers,
      verified: verifiedDrivers,
    };
  }, [drivers]);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Drivers */}
      <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        <div className="p-6 flex justify-between items-center">
          <h3 className="text-slate-600 text-sm font-semibold">Total Drivers</h3>
          <Users className="h-5 w-5 text-slate-400" />
        </div>
        <div className="px-6 pb-4">
          <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
        </div>
        <div className="bg-[#304159] text-center py-2">
          <span className="text-slate-200 font-semibold">Total</span>
        </div>
      </div>

      {/* On Duty */}
      <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        <div className="p-6 flex justify-between items-center">
          <h3 className="text-slate-600 text-sm font-semibold">On Duty</h3>
          <UserCheck className="h-5 w-5 text-green-800" />
        </div>
        <div className="px-6 pb-4">
          <p className="text-3xl font-bold text-slate-800">{stats.onDuty}</p>
        </div>
        <div className="bg-[#304159] text-center py-2">
          <span className="text-slate-200 font-semibold">Active</span>

        </div>
      </div>

      {/* Off Duty */}
      <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        <div className="p-6 flex justify-between items-center">
          <h3 className="text-slate-600 text-sm font-semibold">Off Duty</h3>
          <UserX className="h-5 w-5 text-slate-500" />
        </div>
        <div className="px-6 pb-4">
          <p className="text-3xl font-bold text-slate-800">{stats.offDuty}</p>
        </div>
        <div className="bg-[#304159] text-center py-2">
          <span className="text-slate-200 font-semibold">Inactive</span>
        </div>
      </div>

      {/* Verified */}
      <div className="bg-white shadow-md rounded-t-2xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-transform duration-200">
        <div className="p-6 flex justify-between items-center">
          <h3 className="text-slate-600 text-sm font-semibold">Verified</h3>
          <Bus className="h-5 w-5 text-[#D2884C]" />
        </div>
        <div className="px-6 pb-4">
          <p className="text-3xl font-bold text-slate-800">{stats.verified}</p>
        </div>
        <div className="bg-[#304159] text-center py-2">
          <span className="text-slate-200 font-semibold">Verified</span>

        </div>
      </div>
    </div>
      {/* Search Bar */}
     <div className="bg-[#ece6e1] p-6 rounded-lg border border-slate-200">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h2 className="text-lg font-semibold text-slate-800">Driver Management</h2>
      <p className="text-sm text-slate-600">Manage driver attendance and view profiles</p>
    </div>
    <div className="bg-white rounded-full shadow-sm w-80 sm:w-96">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder="Search by name or driver ID..."
      />
    </div>
  </div>
</div>



      {/* Driver Table */}
      <DriverTable
        drivers={filteredDrivers}
        onDriverClick={onDriverClick}
        onClockIn={onClockIn}
        onClockOut={onClockOut}
      />
    </div>
  );
};
