import type { RuleObject } from 'antd/es/form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import dayjs from 'dayjs';

export const required = (message: string): RuleObject => ({
  required: true,
  message,
});

export const minLength = (min: number, message: string): RuleObject => ({
  min,
  message,
});

export const emailRule: RuleObject = {
  type: 'email',
  message: 'Please enter a valid email address',
};

export const phoneRule: RuleObject = {
  validator: (_, value: string) => {
    if (!value) return Promise.resolve();
    if (isValidPhoneNumber(value)) return Promise.resolve();
    return Promise.reject(new Error('Please enter a valid phone number'));
  },
};

export const futureDateRule: RuleObject = {
  validator: (_, value) => {
    if (!value) return Promise.resolve();
    if (dayjs(value).isAfter(dayjs())) return Promise.resolve();
    return Promise.reject(new Error('Date must be in the future'));
  },
};
