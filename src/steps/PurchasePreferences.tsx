import { Form, InputNumber, Select, Tooltip } from 'antd';
import { DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useFormDraft } from '../hooks/useFormDraft';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { StepNavButtons } from '../components/StepNavButtons';
import { purchaseTypeOptions } from '../data/purchaseTypes';
import { vehicleTypeOptions } from '../data/vehicleTypes';
import { creditScoreRangeOptions } from '../data/creditScoreRanges';
import { employmentStatusOptions } from '../data/employmentStatuses';
import { required } from '../utils/validators';
import { storage } from '../utils/storage';
import type { PurchasePreferencesForm } from '../types/form';

export const PurchasePreferences: React.FC = () => {
  const [form] = Form.useForm<PurchasePreferencesForm>();
  const { loadDraft, saveDraft, onValuesChange, showSaved } =
    useFormDraft<PurchasePreferencesForm>('step2');
  const { next, prev, isFirstStep } = useStepNavigation();

  useEffect(() => {
    const draft = loadDraft();
    if (draft) form.setFieldsValue(draft);
  }, []);

  const handleFinish = (values: PurchasePreferencesForm) => {
    saveDraft(values);
    storage.markStepCompleted(2);
    next();
  };

  const handleBack = () => {
    saveDraft(form.getFieldsValue());
    prev();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      onValuesChange={onValuesChange}
      requiredMark="optional"
      size="large"
    >
      <div className="form-section-label">Purchase Details</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Form.Item
          name="purchaseType"
          label="Purchase Type"
          rules={[required('Purchase type is required')]}
        >
          <Select placeholder="Select purchase type" options={purchaseTypeOptions} />
        </Form.Item>

        <Form.Item
          name="vehicleType"
          label="Vehicle Type"
          rules={[required('Vehicle type is required')]}
        >
          <Select placeholder="Select vehicle type" options={vehicleTypeOptions} />
        </Form.Item>
      </div>

      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.purchaseType !== cur.purchaseType}>
        {({ getFieldValue }) =>
          getFieldValue('purchaseType') === 'financing' ? (
            <div className="conditional-fields">
              <div className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-3">
                Financing Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <Form.Item
                  name="creditScoreRange"
                  label="Credit Score Range"
                  rules={[required('Credit score range is required')]}
                >
                  <Select placeholder="Select range" options={creditScoreRangeOptions} />
                </Form.Item>

                <Form.Item
                  name="employmentStatus"
                  label="Employment Status"
                  rules={[required('Employment status is required')]}
                >
                  <Select placeholder="Select status" options={employmentStatusOptions} />
                </Form.Item>
              </div>
            </div>
          ) : null
        }
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.vehicleType !== cur.vehicleType}>
        {({ getFieldValue }) =>
          getFieldValue('vehicleType') === 'ev' ? (
            <div className="conditional-fields">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-3">
                EV Details
              </div>
              <Form.Item
                name="homeChargingAvailable"
                label="Home Charging Available?"
                rules={[required('Please select an option')]}
              >
                <Select
                  placeholder="Select availability"
                  options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' },
                  ]}
                />
              </Form.Item>
            </div>
          ) : null
        }
      </Form.Item>

      <div className="form-section-label mt-2">
        Budget Range{' '}
        <Tooltip title="Enter your comfortable price range. Budget minimum must be less than or equal to maximum.">
          <InfoCircleOutlined className="text-gray-300 cursor-help text-xs" />
        </Tooltip>
      </div>

      <div className="flex flex-col w-full gap-0">
        <Form.Item
          name="budgetMin"
          label="Budget Minimum ($)"
          rules={[required('Budget minimum is required')]}
          className="w-full"
        >
          <InputNumber
            className="w-full"
            min={0}
            prefix={<DollarOutlined className="text-gray-300" />}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => Number(value?.replace(/,/g, '') ?? 0) as 0}
            placeholder="e.g. 20,000"
          />
        </Form.Item>

        <Form.Item
          name="budgetMax"
          label="Budget Maximum ($)"
          dependencies={['budgetMin']}
          rules={[
            required('Budget maximum is required'),
            ({ getFieldValue }) => ({
              validator(_, value) {
                const min = getFieldValue('budgetMin');
                if (!value || !min || value >= min) return Promise.resolve();
                return Promise.reject(new Error('Maximum must be ≥ minimum'));
              },
            }),
          ]}
          className="w-full"
        >
          <InputNumber
            className="w-full"
            min={0}
            prefix={<DollarOutlined className="text-gray-300" />}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => Number(value?.replace(/,/g, '') ?? 0) as 0}
            placeholder="e.g. 50,000"
          />
        </Form.Item>
      </div>

      <StepNavButtons isFirstStep={isFirstStep} onBack={handleBack} showSaved={showSaved} />
    </Form>
  );
};
