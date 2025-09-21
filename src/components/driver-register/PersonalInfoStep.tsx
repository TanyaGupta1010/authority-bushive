import React, { useState } from 'react';
import { Bus, ArrowRight, X, User, Phone, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RegistrationData } from '../../types';

interface PersonalInfoStepProps {
  initialData: Omit<RegistrationData, 'password'>;
  onNext: (data: Omit<RegistrationData, 'password'>) => void;
  onCancel: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ initialData, onNext, onCancel }) => {
  const [formData, setFormData] = useState<Omit<RegistrationData, 'password'>>(initialData);

  const handleInputChange = (field: keyof Omit<RegistrationData, 'password'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.aadhaarNumber || !formData.busNumber) {
      return alert('All fields are required');
    }
    onNext(formData);
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <Card className="border border-gray-200 shadow-xl rounded-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="w-20 h-20 rounded-full bg-[#304159] flex items-center justify-center">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 p-2">
                <X className="h-6 w-6" />
              </button>
            </div>

            <CardTitle className="text-4xl font-bold text-gray-800 mb-1">
              Driver Registration
            </CardTitle>
            <p className="text-sm text-gray-600 mt-0">
              Step 1 of 4: Personal Information
            </p>

            <div className="w-full bg-[#f7f2eb] rounded-full h-2 mt-4">
              <div className="bg-[#304159] h-2 rounded-full w-1/4"></div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-5">

            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#99744a] w-5 h-5" />
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter driver's full name"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#99744a] w-5 h-5" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Aadhaar Number */}
            <div>
              <Label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#99744a] w-5 h-5" />
                <Input
                  id="aadhaarNumber"
                  type="text"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  placeholder="1234 5678 9012"
                  required
                  maxLength={12}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Bus Number */}
            <div>
              <Label htmlFor="busNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Bus Number
              </Label>
              <div className="relative">
                <Input
                  id="busNumber"
                  type="text"
                  value={formData.busNumber}
                  onChange={(e) => handleInputChange('busNumber', e.target.value)}
                  placeholder="Bus Number"
                  required
                  className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#99744a] focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#ece6e1] text-[#304159] py-3 rounded-xl hover:bg-[#ece6e1]/90 transition-colors duration-200 font-semibold text-lg flex items-center justify-center"
            >
              Continue
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};
