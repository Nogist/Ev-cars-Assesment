import { CarOutlined, CheckOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { storage } from '../utils/storage';

const stepTitles = ['Personal Info', 'Preferences', 'Contact', 'Review'];

const stepDescriptions = [
  'Your details',
  'Vehicle & budget',
  'Address & schedule',
  'Confirm & submit',
];

export const OnboardingLayout: React.FC = () => {
  const { currentStep } = useStepNavigation();
  const completedSteps = storage.getCompletedSteps();
  const title = stepTitles[currentStep - 1];
  const description = stepDescriptions[currentStep - 1];

  return (
    <div className="min-h-screen py-6 px-4 md:py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <CarOutlined className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Vehicle Onboarding</h1>
            <p className="text-xs text-gray-400">Step {currentStep} of 4</p>
          </div>
        </div>

        <div className="onboarding-card">
          <div className="step-header">
            {/* Stepper / Progress: current step + indicate completed (per assessment brief) */}
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4].map((step) => (
                <span
                  key={step}
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    completedSteps.includes(step)
                      ? 'bg-blue-600 text-white'
                      : step === currentStep
                        ? 'border-2 border-blue-600 text-blue-600 bg-blue-50'
                        : 'border border-gray-200 text-gray-400 bg-white'
                  }`}
                  aria-label={step === currentStep ? `Current step: ${step}` : completedSteps.includes(step) ? `Step ${step} completed` : `Step ${step}`}
                >
                  {completedSteps.includes(step) && step !== currentStep ? <CheckOutlined className="text-[10px]" /> : step}
                </span>
              ))}
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              </div>
              <span className="text-xs font-medium text-gray-400 shrink-0">
                {currentStep} of 4
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 step-transition" key={currentStep}>
            <Outlet />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Your progress is saved automatically
        </p>
      </div>
    </div>
  );
};
