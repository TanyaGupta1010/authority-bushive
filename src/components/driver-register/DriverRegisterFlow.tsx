import { useState } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { AadhaarVerificationStep } from './AadhaarVerificationStep';
import { PasswordStep } from './PasswordStep';
import { SuccessStep } from './SuccessStep';
import { RegistrationData } from '../../types';

interface DriverRegisterFlowProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const DriverRegisterFlow: React.FC<DriverRegisterFlowProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    password: '',
  });

  const handleStepComplete = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
    
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const generateDriverId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleFinalSubmit = () => {
    const driverId = generateDriverId();
    setRegistrationData(prev => ({ ...prev, driverId }));
    setCurrentStep(4);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            onNext={handleStepComplete}
            onCancel={onCancel}
            initialData={registrationData}
          />
        );
      case 2:
        return (
          <AadhaarVerificationStep
            onNext={handleStepComplete}
            onBack={() => setCurrentStep(1)}
            aadhaarNumber={registrationData.aadhaarNumber}
          />
        );
      case 3:
        return (
          <PasswordStep
            onNext={handleFinalSubmit}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <SuccessStep
            driverId={registrationData.driverId!}
            driverName={registrationData.fullName}
            onComplete={onComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      {renderStep()}
    </div>
  );
};