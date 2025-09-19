import { Bus, CheckCircle, Copy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface SuccessStepProps {
  driverId: string;
  driverName: string;
  onComplete: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ driverId, driverName, onComplete }) => {
  const handleCopyDriverId = () => {
    navigator.clipboard.writeText(driverId);
    toast.success('Driver ID copied to clipboard!');
  };

  return (
    <Card className="w-full max-w-md border border-slate-200 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="bg-green-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          Registration Complete!
        </CardTitle>
        <p className="text-sm text-slate-600">
          Step 4 of 4: Success
        </p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div className="bg-green-500 h-2 rounded-full w-full"></div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 text-center">
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Welcome, {driverName}!
            </h3>
            <p className="text-sm text-green-700">
              Your driver account has been successfully created.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Your unique Driver ID:</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-2xl font-bold text-slate-800 bg-white px-4 py-2 rounded border">
                {driverId}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyDriverId}
                className="border-slate-300 hover:bg-slate-50"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Please save this ID - you'll need it for login
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• Your account is now active</li>
              <li>• You can start using the BusHive system</li>
              <li>• Contact admin for bus assignment</li>
              <li>• Keep your Driver ID secure</li>
            </ul>
          </div>

          <Button
            onClick={onComplete}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-medium"
            size="lg"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};