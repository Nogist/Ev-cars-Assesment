import type { Dayjs } from 'dayjs';

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
}

export interface PurchasePreferencesForm {
  purchaseType: 'cash' | 'financing';
  vehicleType: 'ev' | 'hybrid' | 'gas' | 'unsure';
  budgetMin: number;
  budgetMax: number;
  creditScoreRange?: string;
  employmentStatus?: string;
  homeChargingAvailable?: 'yes' | 'no';
}

export interface ContactScheduleForm {
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  addressLine1: string;
  city: string;
  postalCode: string;
  testDriveDate?: Dayjs | null;
}

export interface OnboardingFormData {
  personalInfo: PersonalInfoForm;
  purchasePreferences: PurchasePreferencesForm;
  contactSchedule: ContactScheduleForm;
}
