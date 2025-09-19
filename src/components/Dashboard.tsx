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
        <Card className="border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Drivers</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">On Duty</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.onDuty}</div>
            <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">Active</Badge>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Off Duty</CardTitle>
            <UserX className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-600">{stats.offDuty}</div>
            <Badge variant="secondary" className="mt-1">Inactive</Badge>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Verified</CardTitle>
            <Bus className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.verified}</div>
            <Badge className="mt-1 bg-orange-100 text-orange-800 border-orange-200">Aadhaar</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Driver Management</h2>
            <p className="text-sm text-slate-600">Manage driver attendance and view profiles</p>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder="Search by name or driver ID..."
          />
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