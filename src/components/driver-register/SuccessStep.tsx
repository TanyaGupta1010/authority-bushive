import { Bus, CheckCircle, Copy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface SuccessStepProps {
  driverName: string;
  driverId?: string;  // optional real ID
  tempId: string;     // temp ID to display
  onComplete: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ driverName, tempId, onComplete }) => {
  const handleCopyTempId = () => {
    navigator.clipboard.writeText(tempId);
    toast.success('Temporary ID copied to clipboard!');
  };

  return (
    <Card className="w-full max-w-md border border-slate-200 shadow-lg mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="bg-[#304159] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">Registration Complete!</CardTitle>
        <p className="text-sm text-slate-600">Step 4 of 4: Success</p>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div className="bg-[#304159] h-2 rounded-full w-full"></div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6 text-center">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome, {driverName}!</h3>
          <p className="text-sm text-green-700">Your driver account has been successfully created.</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 mb-2">Your temporary Driver ID:</p>
          <div className="flex items-center justify-center space-x-2">
            <span className="font-mono text-2xl font-bold text-slate-800 bg-white px-4 py-2 rounded border">{tempId}</span>
            <Button type="button" variant="outline" size="sm" onClick={handleCopyTempId} className="border-slate-300 hover:bg-slate-50">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Please save this ID — you'll need it for login</p>
        </div>

        <Button type="button" onClick={onComplete} className="w-full bg-[#304159] hover:bg-[#304159]/90 text-white py-3 font-medium">
          Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};
