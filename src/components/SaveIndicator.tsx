import { CheckOutlined } from '@ant-design/icons';

interface SaveIndicatorProps {
  visible: boolean;
}

export const SaveIndicator: React.FC<SaveIndicatorProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <span className="save-indicator text-xs text-green-600 flex items-center gap-1">
      <CheckOutlined /> Draft saved
    </span>
  );
};
