import { CheckCircle, XCircle, Clock, User, Phone, Bus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Driver, AttendanceRecord } from '../types';
import Footer from './layout/footer';

interface DriverProfileProps {
  driver: Driver;
  attendanceRecords: AttendanceRecord[];
  onClockIn: (driverId: string) => void;
  onClockOut: (driverId: string) => void;
}

export const DriverProfile: React.FC<DriverProfileProps> = ({
  driver,
  attendanceRecords,
  onClockIn,
  onClockOut,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Present</Badge>;
      case 'Absent':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Absent</Badge>;
      case 'Partial':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Partial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow space-y-6 px-4 py-6">
        {/* Driver Information Card */}
        <Card className="border border-slate-200">
          <CardHeader className="border-b border-slate-200" style={{ backgroundColor: '#ece6e1' }}>
            <CardTitle className="flex items-center gap-3 text-slate-800 text-3xl font-bold">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              Driver Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{driver.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                    <span className="font-medium">ID: {driver.driverId}</span>
                    <div className="flex items-center space-x-1">
                      {driver.aadhaarVerified ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">Aadhaar Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-red-600 font-medium">Aadhaar Pending</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-700">{driver.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bus className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-700">{driver.assignedBusNumber}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-700">{driver.assignedRoute}</span>
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">Current Status</h4>
                  <Badge
                    variant={driver.currentStatus === 'On Duty' ? 'default' : 'secondary'}
                    className={`text-lg px-4 py-2 ${
                      driver.currentStatus === 'On Duty'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {driver.currentStatus}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-3">Quick Actions</h4>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => onClockIn(driver.id)}
                      disabled={driver.currentStatus === 'On Duty'}
                      className="bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 disabled:opacity-50"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Clock In
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onClockOut(driver.id)}
                      disabled={driver.currentStatus === 'Off Duty'}
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 disabled:opacity-50"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Clock Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance History Card */}
        <Card className="border border-slate-200">
          <CardHeader className="border-b border-slate-200" style={{ backgroundColor: '#ece6e1' }}>
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl font-bold">
              <div className="bg-orange-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-orange-800" />
              </div>
              Recent Attendance History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-700">
                  <TableRow className="border-slate-600">
                    <TableHead className="text-slate-200 font-semibold">Date</TableHead>
                    <TableHead className="text-slate-200 font-semibold">Clock In</TableHead>
                    <TableHead className="text-slate-200 font-semibold">Clock Out</TableHead>
                    <TableHead className="text-slate-200 font-semibold">Total Hours</TableHead>
                    <TableHead className="text-slate-200 font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id} className="border-slate-200">
                      <TableCell className="font-medium text-slate-700">{formatDate(record.date)}</TableCell>
                      <TableCell className="text-slate-600">{record.clockInTime || '-'}</TableCell>
                      <TableCell className="text-slate-600">{record.clockOutTime || '-'}</TableCell>
                      <TableCell className="text-slate-600">{record.totalHours ? `${record.totalHours}h` : '-'}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
