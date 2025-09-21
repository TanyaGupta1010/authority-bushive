import React from 'react';
import { Dialog } from '@headlessui/react';
import DriverRegisterFlow from './DriverRegisterFlow';

interface DriverRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const DriverRegistrationModal: React.FC<DriverRegistrationModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
          <DriverRegisterFlow
            onComplete={onComplete} // called when registration succeeds
            onCancel={onClose}      // closes modal if user cancels
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
