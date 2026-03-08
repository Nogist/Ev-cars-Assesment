import { Button, Result, Spin } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { ReviewSection } from '../components/ReviewSection';
import { ReviewField } from '../components/ReviewField';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { useSubmitOnboarding } from '../hooks/useSubmitOnboarding';
import { storage } from '../utils/storage';
import { countryOptions } from '../data/countries';
import { purchaseTypeOptions } from '../data/purchaseTypes';
import { vehicleTypeOptions } from '../data/vehicleTypes';
import { creditScoreRangeOptions } from '../data/creditScoreRanges';
import { employmentStatusOptions } from '../data/employmentStatuses';
import { contactMethodOptions } from '../data/contactMethods';
import type { PersonalInfoForm, PurchasePreferencesForm, ContactScheduleForm } from '../types/form';
import dayjs from 'dayjs';

const findLabel = (options: { label: string; value: string }[], value?: string) =>
  options.find((o) => o.value === value)?.label ?? value;

export const ReviewSubmit: React.FC = () => {
  const { goTo, prev } = useStepNavigation();
  const { mutate, isPending, isSuccess, data } = useSubmitOnboarding();

  const step1 = useMemo(() => storage.get<PersonalInfoForm>('step1'), []);
  const step2 = useMemo(() => storage.get<PurchasePreferencesForm>('step2'), []);
  const step3 = useMemo(() => storage.get<ContactScheduleForm>('step3'), []);

  const handleSubmit = () => {
    if (!step1 || !step2 || !step3) return;
    mutate({
      personalInfo: step1,
      purchasePreferences: step2,
      contactSchedule: step3,
    });
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Spin size="large" />
        <p className="text-gray-400 text-sm">Submitting your onboarding...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Onboarding Complete!"
        subTitle={
          <>
            {data.message}
            <br />
            <span className="text-xs text-gray-400 mt-1 inline-block">Reference: {data.referenceId}</span>
          </>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => {
              storage.clearAll();
              window.location.href = '/onboarding/1';
            }}
          >
            Start New Onboarding
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Review Your Information</h2>
        <p className="text-sm text-gray-400 mt-1">Please verify everything before submitting.</p>
      </div>

      <ReviewSection title="Personal Information" onEdit={() => goTo(1)}>
        <ReviewField label="Name" value={`${step1?.firstName ?? ''} ${step1?.lastName ?? ''}`} />
        <ReviewField label="Email" value={step1?.email} />
        <ReviewField label="Phone" value={step1?.phone || 'Not provided'} />
        <ReviewField label="Country" value={findLabel(countryOptions, step1?.country)} />
      </ReviewSection>

      <ReviewSection title="Purchase Preferences" onEdit={() => goTo(2)}>
        <ReviewField label="Purchase Type" value={findLabel(purchaseTypeOptions, step2?.purchaseType)} />
        <ReviewField label="Vehicle Type" value={findLabel(vehicleTypeOptions, step2?.vehicleType)} />
        <ReviewField label="Budget" value={step2 ? `$${step2.budgetMin?.toLocaleString()} – $${step2.budgetMax?.toLocaleString()}` : undefined} />
        {step2?.purchaseType === 'financing' && (
          <>
            <ReviewField label="Credit Score" value={findLabel(creditScoreRangeOptions, step2.creditScoreRange)} />
            <ReviewField label="Employment" value={findLabel(employmentStatusOptions, step2.employmentStatus)} />
          </>
        )}
        {step2?.vehicleType === 'ev' && (
          <ReviewField label="Home Charging" value={step2.homeChargingAvailable === 'yes' ? 'Yes' : 'No'} />
        )}
      </ReviewSection>

      <ReviewSection title="Contact & Schedule" onEdit={() => goTo(3)}>
        <ReviewField label="Contact Method" value={findLabel(contactMethodOptions, step3?.preferredContactMethod)} />
        <ReviewField label="Address" value={step3?.addressLine1} />
        <ReviewField label="City" value={step3?.city} />
        <ReviewField label="Postal Code" value={step3?.postalCode} />
        <ReviewField
          label="Test Drive"
          value={step3?.testDriveDate ? dayjs(step3.testDriveDate).format('MMM D, YYYY [at] h:mm A') : 'Not scheduled'}
        />
      </ReviewSection>

      <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
        <Button icon={<ArrowLeftOutlined />} onClick={prev}>Back</Button>
        <Button type="primary" size="large" icon={<SendOutlined />} onClick={handleSubmit}>
          Submit Onboarding
        </Button>
      </div>
    </div>
  );
};
