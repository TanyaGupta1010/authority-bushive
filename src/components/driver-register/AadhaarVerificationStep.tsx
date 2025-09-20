import { useState, useEffect } from 'react';
import { Bus, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AadhaarVerificationStepProps {
  onNext: (data: {}) => void;
  onBack: () => void;
  aadhaarNumber: string;
}

export const AadhaarVerificationStep: React.FC<AadhaarVerificationStepProps> = ({ 
  onNext, 
  onBack, 
  aadhaarNumber 
}) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => onNext({});

  const maskedAadhaar = aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, 'XXXX XXXX $3');

  return (
    <Card className="w-full max-w-md border border-slate-200 shadow-lg mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="bg-[#304159] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Bus className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Aadhaar Verification
        </CardTitle>
        <p className="text-sm text-slate-600">Step 2 of 4: Identity Verification</p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div className="bg-[#304159] h-2 rounded-full w-2/4"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center space-y-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-sm text-slate-600 mb-2">Verifying Aadhaar Number:</p>
          <p className="font-mono text-lg font-semibold text-slate-800">{maskedAadhaar}</p>
        </div>

        {isVerifying ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-slate-600">Verifying your Aadhaar details...</p>
            <p className="text-sm text-slate-500">This may take a few moments</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <p className="text-green-800 font-semibold">Verification Successful!</p>
              <p className="text-sm text-green-700 mt-1">Your Aadhaar has been verified successfully</p>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="button" onClick={handleContinue} disabled={!isVerified} className="flex-1 bg-[#304159] hover:bg-[#304159]/90 text-white disabled:opacity-50">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
