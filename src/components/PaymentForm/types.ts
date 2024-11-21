export type PaymentType = 'insurance';
export type PaymentPlan = 'monthly' | 'quarterly';

export interface PaymentFormData {
  memberId: number;
  paymentType: PaymentType | null;
  amount: number;
  plan: PaymentPlan;
}

export interface PaymentRecord extends PaymentFormData {
  id: string;
  date: string;
  registeredBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ClubMember {
  id: number;
  name: string;
}