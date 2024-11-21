import React, { useState } from 'react';
import { CreditCard, Users, LogOut } from 'lucide-react';
import { PaymentFormData, PaymentType, PaymentPlan } from './types';
import { CLUB_MEMBERS } from './constants';
import PaymentTypeSelector from './PaymentTypeSelector';
import ExcelExport from './ExcelExport';
import { useAuthStore } from '../../store/authStore';
import { usePaymentsStore } from '../../store/paymentsStore';
import { useNavigate } from 'react-router-dom';

const MONTHLY_AMOUNT = 30000;
const QUARTERLY_AMOUNT = 60000;

export default function PaymentForm() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const addPayment = usePaymentsStore((state) => state.addPayment);

  const [formData, setFormData] = useState<PaymentFormData>({
    memberId: 0,
    paymentType: null,
    amount: MONTHLY_AMOUNT,
    plan: 'monthly',
  });

  const handlePlanChange = (plan: PaymentPlan) => {
    setFormData({
      ...formData,
      plan,
      amount: plan === 'monthly' ? MONTHLY_AMOUNT : QUARTERLY_AMOUNT,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const payment = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      registeredBy: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    addPayment(payment);
    alert('Pago registrado con éxito!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Usuario: {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <ExcelExport />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                {CLUB_MEMBERS.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Type Selection */}
            <PaymentTypeSelector
              selectedType={formData.paymentType}
              plan={formData.plan}
              onTypeChange={(type) => setFormData({ ...formData, paymentType: type })}
              onPlanChange={handlePlanChange}
            />

            {/* Amount */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
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
    </div>
  );
}