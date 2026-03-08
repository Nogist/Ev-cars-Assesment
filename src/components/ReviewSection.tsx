import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

interface ReviewSectionProps {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ title, onEdit, children }) => (
  <div className="mb-5">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
      <Button type="link" icon={<EditOutlined />} onClick={onEdit} size="small">
        Edit
      </Button>
    </div>
    <div className="review-card">{children}</div>
  </div>
);
