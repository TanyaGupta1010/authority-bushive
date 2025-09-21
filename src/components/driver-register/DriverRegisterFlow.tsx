// src/components/driver-register/DriverRegisterFlow.tsx
import React, { useState } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { AadhaarVerificationStep } from './AadhaarVerificationStep';
import { PasswordStep } from './PasswordStep';
import { SuccessStep } from './SuccessStep';
import { RegistrationData } from '../../types';
import axios from 'axios';

interface DriverRegisterFlowProps {
  onComplete: () => void;
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

  const [driverId, setDriverId] = useState<string>(''); // for PasswordStep
  const [tempId, setTempId] = useState<string>('');     // for SuccessStep

  // Step 1: Submit personal info
  const handleNextPersonalInfo = async (data: Partial<RegistrationData>) => {
    try {
      const response = await axios.post('http://localhost:5002/api/drivers/signup', {
        name: data.fullName,
        phoneNumber: data.phoneNumber,
        aadhaarNumber: data.aadhaarNumber,
        busNumber: data.busNumber,
      });

      setRegistrationData(prev => ({ ...prev, ...data }));
      setDriverId(response.data.driverId); 
      setTempId(response.data.tempId || 'TEMP' + Math.floor(1000 + Math.random() * 9000));
      setStep(2);
    } catch (err) {
      console.error(err);
      alert('Failed to register driver. Please try again.');
    }
  };

  // Step 2: Aadhaar verification
  const handleNextAadhaar = () => setStep(3);

  // Step 3: Set password
  const handleNextPassword = async (password: string) => {
    try {
      await axios.post('http://localhost:5002/api/drivers/set-password', {
        _id: driverId,
        password,
      });
      setRegistrationData(prev => ({ ...prev, password }));
      setStep(4);
    } catch (err) {
      console.error(err);
      alert('Failed to set password. Please try again.');
    }
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
          aadhaarNumber={registrationData.aadhaarNumber}
          onNext={handleNextAadhaar}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && driverId && (
        <PasswordStep
          driverId={driverId}
          onNext={handleNextPassword}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && tempId && (
        <SuccessStep
          tempId={tempId}
          driverName={registrationData.fullName}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};

export default DriverRegisterFlow;
