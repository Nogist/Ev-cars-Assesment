import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { OnboardingLayout } from './components/OnboardingLayout';
import { PersonalInfo } from './steps/PersonalInfo';
import { PurchasePreferences } from './steps/PurchasePreferences';
import { ContactSchedule } from './steps/ContactSchedule';
import { ReviewSubmit } from './steps/ReviewSubmit';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2563eb',
          borderRadius: 8,
          fontSize: 14,
          controlHeight: 40,
        },
        components: {
          Steps: {
            colorPrimary: '#2563eb',
          },
          Form: {
            labelFontSize: 13,
            labelColor: '#374151',
          },
          Select: {
            optionSelectedBg: '#eff6ff',
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<OnboardingLayout />}>
            <Route path="1" element={<PersonalInfo />} />
            <Route path="2" element={<PurchasePreferences />} />
            <Route path="3" element={<ContactSchedule />} />
            <Route path="4" element={<ReviewSubmit />} />
            <Route index element={<Navigate to="1" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/onboarding/1" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
