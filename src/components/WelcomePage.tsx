import { Bus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-slate-200 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <div className="bg-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Bus className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">
              Welcome to BusHive
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Your smart companion for bus tracking and management.
            </p>
          </div>
          
          <Button
            onClick={onGetStarted}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium"
            size="lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Government of India | Transport Department
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};