import { Form, Input, Select, DatePicker, Alert } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useEffect, useMemo } from 'react';
import { useFormDraft } from '../hooks/useFormDraft';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { StepNavButtons } from '../components/StepNavButtons';
import { contactMethodOptions } from '../data/contactMethods';
import { required, futureDateRule } from '../utils/validators';
import { storage } from '../utils/storage';
import type { ContactScheduleForm, PersonalInfoForm } from '../types/form';
import dayjs from 'dayjs';

export const ContactSchedule: React.FC = () => {
  const [form] = Form.useForm<ContactScheduleForm>();
  const { loadDraft, saveDraft, onValuesChange, showSaved } =
    useFormDraft<ContactScheduleForm>('step3');
  const { next, prev, isFirstStep, goTo } = useStepNavigation();

  const step1Data = useMemo(() => storage.get<PersonalInfoForm>('step1'), []);
  const hasPhone = Boolean(step1Data?.phone);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      if (draft.testDriveDate) {
        draft.testDriveDate = dayjs(draft.testDriveDate);
      }
      form.setFieldsValue(draft);
    }
  }, []);

  const handleFinish = (values: ContactScheduleForm) => {
    const contactMethod = values.preferredContactMethod;
    if ((contactMethod === 'phone' || contactMethod === 'whatsapp') && !hasPhone) {
      return;
    }
    saveDraft(values);
    storage.markStepCompleted(3);
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
      <div className="form-section-label">Communication</div>

      <Form.Item
        name="preferredContactMethod"
        label="Preferred Contact Method"
        rules={[required('Contact method is required')]}
      >
        <Select placeholder="Select contact method" options={contactMethodOptions} />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prev, cur) => prev.preferredContactMethod !== cur.preferredContactMethod}
      >
        {({ getFieldValue }) => {
          const method = getFieldValue('preferredContactMethod');
          const needsPhone = method === 'phone' || method === 'whatsapp';
          if (!needsPhone || hasPhone) return null;

          return (
            <Alert
              type="warning"
              showIcon
              className="mb-4"
              message="Phone number required"
              description={
                <span>
                  Your selected contact method requires a phone number.{' '}
                  <a onClick={() => { saveDraft(form.getFieldsValue()); goTo(1); }}>
                    Go to Step 1 to add it →
                  </a>
                </span>
              }
            />
          );
        }}
      </Form.Item>

      <div className="form-section-label mt-2">Address</div>

      <Form.Item
        name="addressLine1"
        label="Address Line 1"
        rules={[required('Address is required')]}
      >
        <Input prefix={<EnvironmentOutlined className="text-gray-300" />} placeholder="Street address" />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Form.Item name="city" label="City" rules={[required('City is required')]}>
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item
          name="postalCode"
          label="Postal Code"
          rules={[required('Postal code is required')]}
        >
          <Input placeholder="Postal code" />
        </Form.Item>
      </div>

      <div className="form-section-label mt-2">Schedule</div>

      <Form.Item name="testDriveDate" label="Test Drive Date & Time" rules={[futureDateRule]}>
        <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          className="w-full"
          placeholder="Select date and time"
        />
      </Form.Item>

      <StepNavButtons isFirstStep={isFirstStep} onBack={handleBack} showSaved={showSaved} />
    </Form>
  );
};
