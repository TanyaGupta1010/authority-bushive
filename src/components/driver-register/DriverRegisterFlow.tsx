// DriverRegisterFlow.tsx
import React, { useState } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { AadhaarVerificationStep } from './AadhaarVerificationStep';
import { PasswordStep } from './PasswordStep';
import { SuccessStep } from './SuccessStep';
import { RegistrationData, Driver } from '../../types';

interface DriverRegisterFlowProps {
  onComplete: (driver: Driver) => void;
  onCancel: () => void;
}

const DriverRegisterFlow: React.FC<DriverRegisterFlowProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    busNumber: '',
    password: '',
  });

  const [newDriver, setNewDriver] = useState<Driver | null>(null);
  const [tempId, setTempId] = useState<string>('');

  // Step 1: Personal Info
  const handleNextPersonalInfo = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  // Step 2: Aadhaar Verification
  const handleNextAadhaar = () => setStep(3);

  // Step 3: Set Password
  const handleNextPassword = (password: string) => {
    const updatedData = { ...registrationData, password };
    setRegistrationData(updatedData);

    const internalId = 'ID' + Math.floor(1000 + Math.random() * 9000);
    const displayDriverId = 'DRV' + Math.floor(1000 + Math.random() * 9000);
    const tempIdGenerated = 'TEMP' + Math.floor(1000 + Math.random() * 9000);
    setTempId(tempIdGenerated);

    const driver: Driver = {
      id: internalId,
      driverId: displayDriverId,
      name: updatedData.fullName || 'Unknown',
      phoneNumber: updatedData.phoneNumber || 'N/A',
      aadhaarVerified: true,
      assignedBusNumber: updatedData.busNumber || 'N/A',
      assignedRoute: 'Not Assigned',
      currentStatus: 'Off Duty',
    };

    setNewDriver(driver);
    setStep(4); // show success step
  };

  // Step 4: Success → actually complete registration
  const handleFinish = () => {
    if (newDriver) onComplete(newDriver);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      {step === 1 && (
        <PersonalInfoStep
          onNext={handleNextPersonalInfo}
          onCancel={onCancel}
          initialData={registrationData}
        />
      )}
      {step === 2 && (
        <AadhaarVerificationStep
          aadhaarNumber={registrationData.aadhaarNumber || ''}
          onNext={handleNextAadhaar}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <PasswordStep
          driverId={tempId || 'TEMP'}
          onNext={handleNextPassword}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && newDriver && (
        <SuccessStep
          tempId={tempId}
          driverName={newDriver.name}
          onComplete={handleFinish} // call onComplete only when user clicks button
        />
      )}
    </div>
  );
};

export default DriverRegisterFlow;
