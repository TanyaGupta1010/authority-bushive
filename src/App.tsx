import { useState, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { WelcomePage } from './components/WelcomePage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { Dashboard } from './components/Dashboard';
import { DriverProfile } from './components/DriverProfile';
import DriverRegisterFlow from './components/driver-register/DriverRegisterFlow';
import { mockDrivers, mockAttendanceRecords } from './data/mockData';
import { Driver, AttendanceRecord, AppState } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import './App.css';

function App() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [attendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'welcome',
    searchTerm: '',
    isAuthenticated: false,
  });

  const getCurrentPageTitle = () => {
    switch (appState.currentPage) {
      case 'welcome':
        return 'Welcome to BusHive';
      case 'login':
        return 'Authority Login';
      case 'signup':
        return 'Create Account';
      case 'dashboard':
        return 'Driver Dashboard';
      case 'profile':
        const driver = drivers.find(d => d.id === appState.selectedDriverId);
        return `Driver Profile - ${driver?.name || 'Unknown'}`;
      case 'driver-register':
        return 'Driver Registration';
      default:
        return 'BusHive Authority Portal';
    }
  };

  const handleGetStarted = () => {
    setAppState({ ...appState, currentPage: 'login' });
  };

  const handleLogin = (name: string, govId: string) => {
    setAppState({
      ...appState,
      currentPage: 'dashboard',
      isAuthenticated: true,
      currentUser: { name, govId },
    });
  };

  const handleSwitchToSignup = () => {
    setAppState({ ...appState, currentPage: 'signup' });
  };

  const handleSwitchToLogin = () => {
    setAppState({ ...appState, currentPage: 'login' });
  };

  const handleDriverRegister = () => {
    setAppState({ ...appState, currentPage: 'driver-register' });
  };

  const handleDriverRegisterComplete = () => {
    setAppState({ ...appState, currentPage: 'dashboard' });
  };

  const handleDriverRegisterCancel = () => {
    setAppState({ ...appState, currentPage: 'dashboard' });
  };

  const handleDriverClick = (driverId: string) => {
    setAppState({
      ...appState,
      currentPage: 'profile',
      selectedDriverId: driverId,
    });
  };

  const handleClockIn = (driverId: string) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId
          ? { ...driver, currentStatus: 'On Duty' as const }
          : driver
      )
    );

    const driver = drivers.find(d => d.id === driverId);
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    toast.success(`${driver?.name} clocked in at ${currentTime}`, {
      description: 'Status updated to On Duty',
    });
  };

  const handleClockOut = (driverId: string) => {
    setDrivers(prevDrivers =>
      prevDrivers.map(driver =>
        driver.id === driverId
          ? { ...driver, currentStatus: 'Off Duty' as const }
          : driver
      )
    );

    const driver = drivers.find(d => d.id === driverId);
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    toast.success(`${driver?.name} clocked out at ${currentTime}`, {
      description: 'Status updated to Off Duty',
    });
  };

  const handleSearchChange = (term: string) => {
    setAppState({
      ...appState,
      searchTerm: term,
    });
  };

  const selectedDriver = useMemo(() => {
    return appState.selectedDriverId
      ? drivers.find(d => d.id === appState.selectedDriverId)
      : undefined;
  }, [drivers, appState.selectedDriverId]);

  const driverAttendanceRecords = useMemo(() => {
    return appState.selectedDriverId
      ? attendanceRecords
          .filter(record => record.driverId === appState.selectedDriverId)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 4) // Show last 4 days
      : [];
  }, [attendanceRecords, appState.selectedDriverId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Show navbar only for authenticated pages */}
      {appState.isAuthenticated && (
        <Navbar
          title={getCurrentPageTitle()}
          onDriverRegister={handleDriverRegister}
          showDriverRegister={appState.currentPage === 'dashboard' || appState.currentPage === 'profile'}
        />
      )}

      {/* Main Content */}
      {appState.currentPage === 'welcome' && (
        <WelcomePage onGetStarted={handleGetStarted} />
      )}

      {appState.currentPage === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}

      {appState.currentPage === 'signup' && (
        <SignupPage
          onSignup={handleLogin}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {appState.currentPage === 'driver-register' && (
        <DriverRegisterFlow
          onComplete={handleDriverRegisterComplete}
          onCancel={handleDriverRegisterCancel}
        />
      )}


      {appState.isAuthenticated && (
        <main className="p-6 bg-slate-50 min-h-screen">
          {appState.currentPage === 'dashboard' && (
            <Dashboard
              drivers={drivers}
              searchTerm={appState.searchTerm}
              onSearchChange={handleSearchChange}
              onDriverClick={handleDriverClick}
              onClockIn={handleClockIn}
              onClockOut={handleClockOut}
            />
          )}

          {appState.currentPage === 'profile' && selectedDriver && (
            <div className="space-y-4">
              <button
  onClick={() =>
    setAppState({ ...appState, currentPage: 'dashboard', selectedDriverId: undefined })
  }
  className="text-[#304159] hover:text-[#99744a] font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
  style={{ background: "transparent" }}
>
  ← <span>Back to Dashboard</span>
</button>

              <DriverProfile
                driver={selectedDriver}
                attendanceRecords={driverAttendanceRecords}
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
              />
            </div>
          )}
        </main>
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
