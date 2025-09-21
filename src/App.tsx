import { useState, useMemo, useEffect } from 'react';
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

  const getInitialAppState = (): AppState => {
    const saved = localStorage.getItem('appState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      currentPage: 'welcome',
      searchTerm: '',
      isAuthenticated: false,
    };
  };
  const [appState, setAppState] = useState<AppState>(getInitialAppState());

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(appState));
  }, [appState]);

  const getCurrentPageTitle = () => {
    switch (appState.currentPage) {
      case 'welcome': return 'Welcome to BusHive';
      case 'login': return 'Authority Login';
      case 'signup': return 'Create Account';
      case 'dashboard': return 'Driver Dashboard';
      case 'profile':
        const driver = drivers.find(d => d.id === appState.selectedDriverId);
        return `Driver Profile - ${driver?.name || 'Unknown'}`;
      case 'driver-register': return 'Driver Registration';
      default: return 'BusHive Authority Portal';
    }
  };

  const handleGetStarted = () => setAppState({ ...appState, currentPage: 'login' });
  const handleLogin = (name: string, govId: string) =>
    setAppState({ ...appState, currentPage: 'dashboard', isAuthenticated: true, currentUser: { name, govId } });
  const handleSwitchToSignup = () => setAppState({ ...appState, currentPage: 'signup' });
  const handleSwitchToLogin = () => setAppState({ ...appState, currentPage: 'login' });
  const handleDriverRegister = () => setAppState({ ...appState, currentPage: 'driver-register' });
  const handleDriverRegisterCancel = () => setAppState({ ...appState, currentPage: 'dashboard', searchTerm: '' });

  // ✅ Handle new driver registration
  const handleDriverRegisterComplete = (newDriver: Driver) => {
    setDrivers(prev => [...prev, newDriver]); // Add new driver
    setAppState(prev => ({ ...prev, currentPage: 'dashboard', searchTerm: '' }));
    toast.success(`${newDriver.name} has been registered successfully!`);
  };

  const handleDriverClick = (driverId: string) =>
    setAppState(prev => ({ ...prev, currentPage: 'profile', selectedDriverId: driverId }));

  const handleClockIn = (driverId: string) => {
    setDrivers(prev => {
      const updated = prev.map(d => d.id === driverId ? { ...d, currentStatus: 'On Duty' } : d);
      const driver = updated.find(d => d.id === driverId);
      const currentTime = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
      toast.success(`${driver?.name} clocked in at ${currentTime}`, { description: 'Status updated to On Duty' });
      return updated;
    });
  };

  const handleClockOut = (driverId: string) => {
    setDrivers(prev => {
      const updated = prev.map(d => d.id === driverId ? { ...d, currentStatus: 'Off Duty' } : d);
      const driver = updated.find(d => d.id === driverId);
      const currentTime = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
      toast.success(`${driver?.name} clocked out at ${currentTime}`, { description: 'Status updated to Off Duty' });
      return updated;
    });
  };

  const handleSearchChange = (term: string) =>
    setAppState(prev => ({ ...prev, searchTerm: term }));

  const selectedDriver = useMemo(() =>
    appState.selectedDriverId ? drivers.find(d => d.id === appState.selectedDriverId) : undefined,
    [drivers, appState.selectedDriverId]
  );

  return (
    <div className="min-h-screen bg-white">
      {appState.isAuthenticated && (
        <Navbar
          title={getCurrentPageTitle()}
          showDriverRegister={appState.currentPage === 'dashboard' || appState.currentPage === 'profile'}
        />
      )}

      {appState.currentPage === 'welcome' && <WelcomePage onGetStarted={handleGetStarted} />}
      {appState.currentPage === 'login' && <LoginPage onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />}
      {appState.currentPage === 'signup' && <SignupPage onSignup={handleLogin} onSwitchToLogin={handleSwitchToLogin} />}

      {appState.currentPage === 'driver-register' && (
        <DriverRegisterFlow
          onComplete={handleDriverRegisterComplete}
          onCancel={handleDriverRegisterCancel}
        />
      )}

      {appState.isAuthenticated && appState.currentPage === 'dashboard' && (
        <Dashboard
          drivers={drivers}
          searchTerm={appState.searchTerm}
          onSearchChange={handleSearchChange}
          onDriverClick={handleDriverClick}
          onClockIn={handleClockIn}
          onClockOut={handleClockOut}
        />
      )}

      {appState.isAuthenticated && appState.currentPage === 'profile' && selectedDriver && (
        <div className="space-y-4">
          <button
            onClick={() => setAppState(prev => ({ ...prev, currentPage: 'dashboard', selectedDriverId: undefined }))}
            className="text-[#304159] hover:text-[#99744a] font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
          >
            ← <span>Back to Dashboard</span>
          </button>

          <DriverProfile
            driver={selectedDriver}
            attendanceRecords={attendanceRecords.filter(r => r.driverId === selectedDriver.id)}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
          />
        </div>
      )}

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
