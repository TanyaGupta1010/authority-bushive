export interface Driver {
  id: string;
  name: string;
  driverId: string;
  phoneNumber: string;
  aadhaarVerified: boolean;
  assignedBusNumber: string;
  assignedRoute: string;
  currentStatus: 'On Duty' | 'Off Duty';
  profileImage?: string;
}

export interface AttendanceRecord {
  id: string;
  driverId: string;
  date: string;
  clockInTime?: string;
  clockOutTime?: string;
  totalHours?: number;
  status: 'Present' | 'Absent' | 'Partial';
}

export interface AppState {
  currentPage: 'welcome' | 'login' | 'signup' | 'dashboard' | 'profile' | 'driver-register';
  selectedDriverId?: string;
  searchTerm: string;
  isAuthenticated: boolean;
  currentUser?: {
    name: string;
    govId: string;
  };
}

export interface RegistrationData {
  fullName: string;
  phoneNumber: string;
  aadhaarNumber: string;
  password: string;
  driverId?: string;
}