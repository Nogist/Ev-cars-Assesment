import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import type { SelectOption } from '../types/common';

countries.registerLocale(enLocale);

const countryNames = countries.getNames('en', { select: 'official' });

export const countryOptions: SelectOption[] = Object.entries(countryNames)
  .map(([code, name]) => ({ label: name, value: code }))
  .sort((a, b) => a.label.localeCompare(b.label));
