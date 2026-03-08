import type { OnboardingFormData } from '../types/form';
import type { SubmitResponse } from '../types/submission';

export const submitOnboarding = (_data: OnboardingFormData): Promise<SubmitResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Your onboarding has been submitted successfully!',
        referenceId: `REF-${Date.now().toString(36).toUpperCase()}`,
      });
    }, 2000);
  });
};
