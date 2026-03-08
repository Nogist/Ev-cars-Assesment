import PhoneInput from 'react-phone-number-input';
import type { Value } from 'react-phone-number-input';

interface PhoneNumberInputProps {
  value?: Value;
  onChange?: (value: Value | undefined) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange }) => (
  <PhoneInput
    international
    placeholder="Enter phone number"
    value={value}
    onChange={(val) => onChange?.(val)}
  />
);
