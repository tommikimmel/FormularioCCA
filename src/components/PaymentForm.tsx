import React, { useState } from 'react';
import { CreditCard, Users, Calendar, Shield } from 'lucide-react';

// Mock data for club members
const clubMembers = [
  { id: 1, name: 'Tomas Kimmel' },
  { id: 2, name: 'Gustavo Kimmel' },
  { id: 3, name: 'Bernardo Firamonti' },
  { id: 4, name: 'Daniel Carranza' },
  { id: 5, name: 'Mauricio Zanatta' },
  { id: 6, name: 'Walter Moron' },
  { id: 7, name: 'Carlos Calvo' },
  { id: 8, name: 'Ernesto Porcel' },
  { id: 9, name: 'Tomas Carranza' },
  { id: 10, name: 'Luis Ordoñez' },
  { id: 11, name: 'Miguel Ibieta' },
  { id: 12, name: 'Walter Nievas' },
  { id: 13, name: 'Ricardo Schroder' },
  { id: 14, name: 'Gabriel Ferreyra' },
  { id: 15, name: 'Juan Carlos Bay' },
  { id: 16, name: 'Fernando Cisneros' },
  { id: 17, name: 'Mirco' },
  { id: 18, name: 'Miguel' },
  { id: 19, name: 'Juan Carlos' },
  { id: 20, name: 'Eric' },
  { id: 21, name: 'Genaro' },
];

type PaymentType = 'month' | 'quarter' | 'insurance';

interface PaymentFormData {
  memberId: number;
  paymentType: PaymentType;
  amount: number;
}

export default function PaymentForm() {
  const [formData, setFormData] = useState<PaymentFormData>({
    memberId: 0,
    paymentType: 'month',
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Pago registrado con éxito!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            <CreditCard className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">Registro de Pago</h2>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
          {/* Member Selection */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="h-4 w-4 mr-2" />
              Miembro
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3"
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: Number(e.target.value) })}
            >
              <option value={0}>Seleccionar miembro</option>
              {clubMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Type */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="h-4 w-4 mr-2" />
              Tipo de Pago
            </label>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="radio"
                  name="paymentType"
                  value="month"
                  checked={formData.paymentType === 'month'}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as PaymentType })}
                  className="sr-only"
                />
                <span className={`text-sm ${formData.paymentType === 'month' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                  Mes
                </span>
              </label>
              <label className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="radio"
                  name="paymentType"
                  value="quarter"
                  checked={formData.paymentType === 'quarter'}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as PaymentType })}
                  className="sr-only"
                />
                <span className={`text-sm ${formData.paymentType === 'quarter' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                  Trimestre
                </span>
              </label>
              <label className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="radio"
                  name="paymentType"
                  value="insurance"
                  checked={formData.paymentType === 'insurance'}
                  onChange={(e) => setFormData({ ...formData, paymentType: e.target.value as PaymentType })}
                  className="sr-only"
                />
                <span className={`text-sm ${formData.paymentType === 'insurance' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                  Seguro
                </span>
              </label>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Shield className="h-4 w-4 mr-2" />
              Monto
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm">ARS</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Registrar Pago
          </button>
        </form>
      </div>
    </div>
  );
}