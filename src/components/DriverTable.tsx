import { Clock, AlarmClockOff as ClockOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Driver } from '../types';

interface DriverTableProps {
  drivers: Driver[];
  onDriverClick: (driverId: string) => void;
  onClockIn: (driverId: string) => void;
  onClockOut: (driverId: string) => void;
}

export const DriverTable: React.FC<DriverTableProps> = ({
  drivers,
  onDriverClick,
  onClockIn,
  onClockOut,
}) => {
  return (
    <Card className="border border-slate-200">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <CardTitle className="text-slate-800">Driver Management</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-700">
              <TableRow className="border-slate-600">
                <TableHead className="text-slate-200 font-semibold">Driver Name</TableHead>
                <TableHead className="text-slate-200 font-semibold">Driver ID</TableHead>
                <TableHead className="text-slate-200 font-semibold">Bus Number</TableHead>
                <TableHead className="text-slate-200 font-semibold">Status</TableHead>
                <TableHead className="text-slate-200 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="border-slate-200 hover:bg-slate-50">
                  <TableCell className="font-medium">
                    <button
                      onClick={() => onDriverClick(driver.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {driver.name}
                    </button>
                  </TableCell>
                  <TableCell className="text-slate-600">{driver.driverId}</TableCell>
                  <TableCell className="text-slate-600">{driver.assignedBusNumber}</TableCell>
                  <TableCell>
                    <Badge
                      variant={driver.currentStatus === 'On Duty' ? 'default' : 'secondary'}
                      className={
                        driver.currentStatus === 'On Duty'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      }
                    >
                      {driver.currentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onClockIn(driver.id)}
                        disabled={driver.currentStatus === 'On Duty'}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        Clock In
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onClockOut(driver.id)}
                        disabled={driver.currentStatus === 'Off Duty'}
                        className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ClockOff className="mr-1 h-3 w-3" />
                        Clock Out
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};