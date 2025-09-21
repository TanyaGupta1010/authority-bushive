export const mockDrivers: Driver[] = [
  // Existing drivers 1-5
  {
    id: '1',
    name: 'Rajesh Kumar',
    driverId: 'DRV001',
    phoneNumber: '+91 98765 43210',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-AB-1234',
    assignedRoute: 'Route 12A: Sector 14 to ISBT',
    currentStatus: 'On Duty',
  },
  {
    id: '2',
    name: 'Suresh Singh',
    driverId: 'DRV002',
    phoneNumber: '+91 98765 43211',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-CD-5678',
    assignedRoute: 'Route 8B: Railway Station to City Center',
    currentStatus: 'Off Duty',
  },
  {
    id: '3',
    name: 'Amit Sharma',
    driverId: 'DRV003',
    phoneNumber: '+91 98765 43212',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-EF-9012',
    assignedRoute: 'Route 15: Airport to Downtown',
    currentStatus: 'On Duty',
  },
  {
    id: '4',
    name: 'Vikram Patel',
    driverId: 'DRV004',
    phoneNumber: '+91 98765 43213',
    aadhaarVerified: false,
    assignedBusNumber: 'HR-55-GH-3456',
    assignedRoute: 'Route 22C: Industrial Area to Mall',
    currentStatus: 'Off Duty',
  },
  {
    id: '5',
    name: 'Manoj Verma',
    driverId: 'DRV005',
    phoneNumber: '+91 98765 43214',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-IJ-7890',
    assignedRoute: 'Route 7A: University to Bus Stand',
    currentStatus: 'On Duty',
  },

  // Tanya Gupta - inserted in the middle
  {
    id: '6',
    name: 'Tanya Gupta',
    driverId: 'DRV006',
    phoneNumber: '+91 94564 15500',
    aadhaarVerified: true,
    assignedBusNumber: 'UP-09-HI-9876',
    assignedRoute: 'Route TBD',
    currentStatus: 'On Duty',
  },

  // Remaining drivers (shifted IDs)
  {
    id: '7',
    name: 'Neha Kapoor',
    driverId: 'DRV007',
    phoneNumber: '+91 98765 43215',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-KL-1234',
    assignedRoute: 'Route 9: Market to Station',
    currentStatus: 'On Duty',
  },
  {
    id: '8',
    name: 'Rohit Mehra',
    driverId: 'DRV008',
    phoneNumber: '+91 98765 43216',
    aadhaarVerified: false,
    assignedBusNumber: 'HR-55-MN-5678',
    assignedRoute: 'Route 3A: City Center to Mall',
    currentStatus: 'Off Duty',
  },
  {
    id: '9',
    name: 'Priya Singh',
    driverId: 'DRV009',
    phoneNumber: '+91 98765 43217',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-OP-9012',
    assignedRoute: 'Route 5B: University to Airport',
    currentStatus: 'On Duty',
  },
  {
    id: '10',
    name: 'Ankit Sharma',
    driverId: 'DRV010',
    phoneNumber: '+91 98765 43218',
    aadhaarVerified: true,
    assignedBusNumber: 'HR-55-QR-3456',
    assignedRoute: 'Route 11C: ISBT to Industrial Area',
    currentStatus: 'Off Duty',
  },
  {
    id: '11',
    name: 'Sana Reddy',
    driverId: 'DRV011',
    phoneNumber: '+91 98765 43219',
    aadhaarVerified: false,
    assignedBusNumber: 'HR-55-ST-7890',
    assignedRoute: 'Route 2A: Downtown to Mall',
    currentStatus: 'On Duty',
  },
];
export const mockAttendanceRecords: AttendanceRecord[] = [
  // Rajesh Kumar (DRV001)
  { id: '1', driverId: '1', date: '2025-01-15', clockInTime: '06:30', clockOutTime: '18:45', totalHours: 12.25, status: 'Present' },
  { id: '2', driverId: '1', date: '2025-01-14', clockInTime: '06:25', clockOutTime: '18:30', totalHours: 12.08, status: 'Present' },
  { id: '3', driverId: '1', date: '2025-01-13', clockInTime: '06:35', clockOutTime: '18:50', totalHours: 12.25, status: 'Present' },

  // Suresh Singh (DRV002)
  { id: '4', driverId: '2', date: '2025-01-15', status: 'Absent' },
  { id: '5', driverId: '2', date: '2025-01-14', clockInTime: '07:00', clockOutTime: '19:00', totalHours: 12, status: 'Present' },
  
  // Amit Sharma (DRV003)
  { id: '6', driverId: '3', date: '2025-01-15', clockInTime: '06:15', clockOutTime: '18:20', totalHours: 12.08, status: 'Present' },
  { id: '7', driverId: '3', date: '2025-01-14', clockInTime: '06:20', clockOutTime: '18:40', totalHours: 12.33, status: 'Present' },

  // Vikram Patel (DRV004)
  { id: '8', driverId: '4', date: '2025-01-15', clockInTime: '07:30', clockOutTime: '15:45', totalHours: 8.25, status: 'Partial' },
  { id: '9', driverId: '4', date: '2025-01-14', clockInTime: '07:15', clockOutTime: '19:30', totalHours: 12.25, status: 'Present' },

  // Manoj Verma (DRV005)
  { id: '10', driverId: '5', date: '2025-01-15', clockInTime: '06:00', clockOutTime: '18:15', totalHours: 12.25, status: 'Present' },
  { id: '11', driverId: '5', date: '2025-01-14', clockInTime: '06:10', clockOutTime: '18:30', totalHours: 12.33, status: 'Present' },

  // Tanya Gupta (DRV006) → no records

  // Neha Kapoor (DRV007)
  { id: '12', driverId: '7', date: '2025-01-15', clockInTime: '06:25', clockOutTime: '18:35', totalHours: 12.17, status: 'Present' },
  { id: '13', driverId: '7', date: '2025-01-14', clockInTime: '06:30', clockOutTime: '18:40', totalHours: 12.17, status: 'Present' },

  // Rohit Mehra (DRV008)
  { id: '14', driverId: '8', date: '2025-01-15', status: 'Absent' },
  { id: '15', driverId: '8', date: '2025-01-14', clockInTime: '07:00', clockOutTime: '19:00', totalHours: 12, status: 'Present' },

  // Priya Singh (DRV009)
  { id: '16', driverId: '9', date: '2025-01-15', clockInTime: '06:20', clockOutTime: '18:30', totalHours: 12.17, status: 'Present' },

  // Ankit Sharma (DRV010)
  { id: '17', driverId: '10', date: '2025-01-15', clockInTime: '06:10', clockOutTime: '18:25', totalHours: 12.25, status: 'Present' },

  // Sana Reddy (DRV011)
  { id: '18', driverId: '11', date: '2025-01-15', clockInTime: '06:15', clockOutTime: '18:40', totalHours: 12.42, status: 'Present' },
];
