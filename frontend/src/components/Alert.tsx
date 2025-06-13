import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

const typeClasses = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
};

const typeClassesButton={
    success:'bg-green-50 text-green-500 ',
    error:'bg-red-50 text-red-500 ',
    warning:'bg-yellow-50 text-yellow-500 ',
    info:'bg-blue-50 text-blue-500 '
}
const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {

  return (
    <div className={`rounded-md p-4 mb-4 ${typeClasses[type]}`}>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className={`cursor-pointer inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${typeClassesButton[type]}`}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;