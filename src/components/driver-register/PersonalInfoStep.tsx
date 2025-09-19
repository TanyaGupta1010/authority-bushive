import { useState } from 'react';
import { Bus, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RegistrationData } from '../../types';

interface PersonalInfoStepProps {
  onNext: (data: Partial<RegistrationData>) => void;
  onCancel: () => void;
  initialData: RegistrationData;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ onNext, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName,
    phoneNumber: initialData.phoneNumber,
    aadhaarNumber: initialData.aadhaarNumber,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md border border-slate-200 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-orange-500 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <Bus className="h-8 w-8 text-white" />
          </div>
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Driver Registration
        </CardTitle>
        <p className="text-sm text-slate-600">
          Step 1 of 4: Personal Information
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div className="bg-orange-500 h-2 rounded-full w-1/4"></div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-700 font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter driver's full name"
              required
              className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-slate-700 font-medium">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+91 98765 43210"
              required
              className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aadhaarNumber" className="text-slate-700 font-medium">
              Aadhaar Number
            </Label>
            <Input
              id="aadhaarNumber"
              type="text"
              value={formData.aadhaarNumber}
              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
              placeholder="1234 5678 9012"
              required
              maxLength={12}
              className="border-slate-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 font-medium"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};