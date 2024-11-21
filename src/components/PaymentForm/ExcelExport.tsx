import React from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { usePaymentsStore } from '../../store/paymentsStore';
import { PaymentPlan } from './types';
import { CLUB_MEMBERS } from './constants';

const getPlanLabel = (plan: PaymentPlan) => {
  return plan === 'monthly' ? 'Mensual' : 'Trimestral';
};

const getMemberName = (memberId: number) => {
  const member = CLUB_MEMBERS.find(m => m.id === memberId);
  return member ? member.name : 'Miembro no encontrado';
};

export default function ExcelExport() {
  const payments = usePaymentsStore((state) => state.payments);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      payments.map((payment) => ({
        ID: payment.id,
        Fecha: new Date(payment.date).toLocaleString('es-AR'),
        Miembro: getMemberName(payment.memberId),
        'Tipo de Pago': payment.paymentType === 'insurance' ? 'Seguro' : '-',
        'Plan de Pago': getPlanLabel(payment.plan),
        Monto: `$${payment.amount.toLocaleString('es-AR')}`,
        'Registrado por': payment.registeredBy.name,
        'Email del registrador': payment.registeredBy.email,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pagos');
    XLSX.writeFile(workbook, 'pagos-aeroclub.xlsx');
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
    >
      <Download className="h-4 w-4" />
      <span>Exportar Excel</span>
    </button>
  );
}