import { Icon } from './Icon';
import '../styles/customize.css';

export interface CustomizeFabProps {
  onClick: () => void;
  hidden?: boolean;
}

export function CustomizeFab({ onClick, hidden = false }: CustomizeFabProps) {
  return (
    <button
      type="button"
      className={`customize-fab${hidden ? ' customize-fab--hidden' : ''}`}
      data-demo-id="customize-fab"
      onClick={onClick}
      aria-label="Customize your experience"
    >
      <span className="customize-fab__icon" aria-hidden="true">
        <Icon name="sparkles" size={18} />
      </span>
      <span className="customize-fab__label">Customize your experience</span>
    </button>
  );
}
