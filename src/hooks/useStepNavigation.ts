import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

const TOTAL_STEPS = 4;

export function useStepNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentStep = Number(pathname.split('/').pop()) || 1;

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;

  const next = useCallback(() => {
    if (!isLastStep) navigate(`/onboarding/${currentStep + 1}`);
  }, [currentStep, isLastStep, navigate]);

  const prev = useCallback(() => {
    if (!isFirstStep) navigate(`/onboarding/${currentStep - 1}`);
  }, [currentStep, isFirstStep, navigate]);

  const goTo = useCallback(
    (target: number) => {
      if (target >= 1 && target <= TOTAL_STEPS) navigate(`/onboarding/${target}`);
    },
    [navigate],
  );

  return useMemo(
    () => ({ currentStep, isFirstStep, isLastStep, next, prev, goTo, totalSteps: TOTAL_STEPS }),
    [currentStep, isFirstStep, isLastStep, next, prev, goTo],
  );
}
