import React from 'react';
import { Calendar, Shield } from 'lucide-react';
import { PaymentType, PaymentPlan } from './types';

interface PaymentTypeSelectorProps {
  selectedType: PaymentType | null;
  plan: PaymentPlan;
  onTypeChange: (type: PaymentType | null) => void;
  onPlanChange: (plan: PaymentPlan) => void;
}

export default function PaymentTypeSelector({
  selectedType,
  plan,
  onTypeChange,
  onPlanChange,
}: PaymentTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4 mr-2" />
          Plan de Pago
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onPlanChange('monthly')}
            className={`p-3 border rounded-md transition-colors ${
              plan === 'monthly'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => onPlanChange('quarterly')}
            className={`p-3 border rounded-md transition-colors ${
              plan === 'quarterly'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            Trimestral
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Shield className="h-4 w-4 mr-2" />
          Seguro
        </label>
        <div className="flex justify-center">
          <label className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors w-full">
            <input
              type="checkbox"
              checked={selectedType === 'insurance'}
              onChange={() => onTypeChange(selectedType === 'insurance' ? null : 'insurance')}
              className="sr-only"
            />
            <span className={`text-sm ${
              selectedType === 'insurance'
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600'
            }`}>
              Seguro
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}