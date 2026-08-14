import { Icon } from './Icon';
import { Sparkline } from './Sparkline';
import type { Kpi } from '../data/dashboard';
import '../styles/kpi.css';

export interface KpiCardProps {
  kpi: Kpi;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const positive = kpi.trend === 'up';
  const stroke = positive ? 'var(--color-accent)' : 'var(--color-success)';

  return (
    <article className="card kpi-card" data-demo-id={`kpi-card-${kpi.id}`}>
      <div className="kpi-card__top">
        <span className="kpi-card__icon" aria-hidden="true">
          <Icon name={kpi.icon} size={16} />
        </span>
        <p className="kpi-card__label">{kpi.label}</p>
        <span className={`badge ${positive ? 'badge--success' : 'badge--info'} kpi-card__delta`}>
          <Icon name={positive ? 'arrow-up' : 'arrow-down'} size={12} />
          {kpi.delta}
        </span>
      </div>

      <p className="kpi-card__value">{kpi.value}</p>
      <p className="kpi-card__caption">{kpi.caption}</p>

      <div className="kpi-card__chart">
        <Sparkline points={kpi.series} stroke={stroke} />
      </div>
    </article>
  );
}
