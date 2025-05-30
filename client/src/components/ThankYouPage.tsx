import { CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ThankYouPageProps {
  onClose: () => void;
}

export default function ThankYouPage({ onClose }: ThankYouPageProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl shadow-2xl max-w-md w-full">
        <div className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-navy mb-4">Thank You!</h2>
            <p className="text-navy/70 text-lg leading-relaxed">
              Thank you for your interest! We appreciate you taking the time to fill out our form.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-navy/60 text-sm">
              We'll review your information and get back to you soon if there's a good fit.
            </p>
            
            <Button
              onClick={onClose}
              className="bg-button-gradient text-white font-semibold px-8 py-3 w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}