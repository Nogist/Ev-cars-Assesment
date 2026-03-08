import { Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { SaveIndicator } from './SaveIndicator';

interface StepNavButtonsProps {
  isFirstStep: boolean;
  isLastStep?: boolean;
  onBack: () => void;
  loading?: boolean;
  showSaved?: boolean;
}

export const StepNavButtons: React.FC<StepNavButtonsProps> = ({
  isFirstStep,
  onBack,
  loading,
  showSaved = false,
}) => (
  <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
    <div>
      {!isFirstStep && (
        <Button icon={<ArrowLeftOutlined />} onClick={onBack} disabled={loading}>
          Back
        </Button>
      )}
    </div>
    <div className="flex items-center gap-3">
      <SaveIndicator visible={showSaved} />
      <Button type="primary" htmlType="submit" loading={loading} size="large">
        Continue <ArrowRightOutlined />
      </Button>
    </div>
  </div>
);
