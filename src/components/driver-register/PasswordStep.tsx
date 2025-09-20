import { useState } from 'react';
import { Bus, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PasswordStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const PasswordStep: React.FC<PasswordStepProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) onNext();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <Card className="w-full max-w-md border border-slate-200 shadow-lg mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="bg-[#304159] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Bus className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">Set Password</CardTitle>
        <p className="text-sm text-slate-600">Step 3 of 4: Account Security</p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div className="bg-[#304159] h-2 rounded-full w-3/4"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
              placeholder="Create a secure password"
              required
              className={`border-slate-300 focus:border-orange-500 focus:ring-orange-500 ${errors.password ? 'border-red-500' : ''}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={e => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              required
              className={`border-slate-300 focus:border-orange-500 focus:ring-orange-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700">
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        {/* Password Info */}
        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
          • At least 6 characters <br />
          • Combination of letters and numbers <br />
          • Keep it secure
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="button" onClick={handleNext} className="flex-1 bg-[#304159] hover:bg-[#304159]/90 text-white">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
