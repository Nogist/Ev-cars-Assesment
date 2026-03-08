import { useMutation } from '@tanstack/react-query';
import { submitOnboarding } from '../api/onboarding';
import type { OnboardingFormData } from '../types/form';

export function useSubmitOnboarding() {
  return useMutation({
    mutationFn: (data: OnboardingFormData) => submitOnboarding(data),
  });
}
