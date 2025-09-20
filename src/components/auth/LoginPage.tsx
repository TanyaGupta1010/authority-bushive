import React, { useState } from 'react';
import { User, LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginPageProps {
  onLogin: (name: string, govId: string) => void;
  onSwitchToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    govId: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/person/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          govtID: formData.govId,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || 'Login failed');
        setIsLoading(false);
        return;
      }

      alert('Login successful!');
      onLogin(data.person.name, formData.govId);
    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#304159]">
            <User className="h-8 w-8 text-[#ece6e1]" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Authority Login
          </CardTitle>
          <p className="text-sm text-gray-600">
            Access the BusHive Authority Portal
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                className="border-gray-300 focus:border-[#99744a] focus:ring-[#99744a]"
              />
            </div>

            {/* Government ID */}
            <div className="space-y-2">
              <Label htmlFor="govId" className="text-gray-700 font-medium">
                Government ID
              </Label>
              <Input
                id="govId"
                type="text"
                value={formData.govId}
                onChange={(e) => handleInputChange('govId', e.target.value)}
                placeholder="Enter your government ID"
                required
                className="border-gray-300 focus:border-[#99744a] focus:ring-[#99744a]"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-gray-300 focus:border-[#99744a] focus:ring-[#99744a] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ece6e1] hover:bg-[#ece6e1]/90 text-[#304159] py-2.5 font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#304159] mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-[#99744a] hover:text-[#99744a]/80 font-medium hover:underline"
            >
              Sign up here
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
