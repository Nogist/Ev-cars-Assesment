import { Form, Input, Select } from 'antd';
import type { InputRef } from 'antd';
import { UserOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import { useEffect, useRef } from 'react';
import { useFormDraft } from '../hooks/useFormDraft';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { StepNavButtons } from '../components/StepNavButtons';
import { PhoneNumberInput } from '../components/PhoneNumberInput';
import { countryOptions } from '../data/countries';
import { required, minLength, emailRule, phoneRule } from '../utils/validators';
import { storage } from '../utils/storage';
import type { PersonalInfoForm } from '../types/form';

export const PersonalInfo: React.FC = () => {
  const [form] = Form.useForm<PersonalInfoForm>();
  const { loadDraft, saveDraft, onValuesChange, showSaved } = useFormDraft<PersonalInfoForm>('step1');
  const { next, isFirstStep } = useStepNavigation();
  const firstInputRef = useRef<InputRef>(null);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) form.setFieldsValue(draft);
    firstInputRef.current?.focus();
  }, []);

  const handleFinish = (values: PersonalInfoForm) => {
    saveDraft(values);
    storage.markStepCompleted(1);
    next();
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
      <div className="form-section-label">Basic Details</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[required('First name is required'), minLength(2, 'Minimum 2 characters')]}
        >
          <Input ref={firstInputRef} prefix={<UserOutlined className="text-gray-300" />} placeholder="First name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[required('Last name is required'), minLength(2, 'Minimum 2 characters')]}
        >
          <Input prefix={<UserOutlined className="text-gray-300" />} placeholder="Last name" />
        </Form.Item>
      </div>

      <Form.Item
        name="email"
        label="Email"
        rules={[required('Email is required'), emailRule]}
      >
        <Input prefix={<MailOutlined className="text-gray-300" />} placeholder="Enter your email" />
      </Form.Item>

      <Form.Item name="phone" label="Phone" rules={[phoneRule]}>
        <PhoneNumberInput />
      </Form.Item>

      <div className="form-section-label mt-2">Location</div>

      <Form.Item
        name="country"
        label="Country"
        rules={[required('Country is required')]}
      >
        <Select
          showSearch
          optionFilterProp="label"
          placeholder="Select your country"
          options={countryOptions}
          suffixIcon={<GlobalOutlined className="text-gray-300" />}
        />
      </Form.Item>

      <StepNavButtons
        isFirstStep={isFirstStep}
        onBack={() => {}}
        showSaved={showSaved}
      />
    </Form>
  );
};
