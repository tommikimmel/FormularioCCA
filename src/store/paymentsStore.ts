import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PaymentRecord } from '../components/PaymentForm/types';

interface PaymentsState {
  payments: PaymentRecord[];
  addPayment: (payment: PaymentRecord) => void;
}

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set) => ({
      payments: [],
      addPayment: (payment) =>
        set((state) => ({
          payments: [...state.payments, payment],
        })),
    }),
    {
      name: 'payments-storage',
    }
  )
);