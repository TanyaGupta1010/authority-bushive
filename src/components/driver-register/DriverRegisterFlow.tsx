import React, { useState } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { AadhaarVerificationStep } from './AadhaarVerificationStep';
import { PasswordStep } from './PasswordStep';
import { SuccessStep } from './SuccessStep';
// import { RegistrationData } from '../types';

interface DriverRegisterFlowProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const DriverRegisterFlow: React.FC<DriverRegisterFlowProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    password: '',
  });

  const handleNextPersonalInfo = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleNextAadhaar = () => setStep(3);

  const handleNextPassword = () => setStep(4);

  // Here you can generate driver ID dynamically or fetch from backend
  const driverId = 'DRV' + Math.floor(1000 + Math.random() * 9000);
  const driverName = registrationData.fullName;

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
          aadhaarNumber={registrationData.aadhaarNumber}
          onNext={handleNextAadhaar}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <PasswordStep
          onNext={handleNextPassword}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <SuccessStep
          driverId={driverId}
          driverName={driverName}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};
