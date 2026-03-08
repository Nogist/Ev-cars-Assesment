interface ReviewFieldProps {
  label: string;
  value?: string | number | null;
}

export const ReviewField: React.FC<ReviewFieldProps> = ({ label, value }) => (
  <div className="flex justify-between py-2.5 border-b border-gray-200 last:border-0">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="text-sm font-medium text-gray-900">{value || '—'}</span>
  </div>
);
