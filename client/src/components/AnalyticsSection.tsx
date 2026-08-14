import { AreaChart } from './AreaChart';
import { ChannelMix } from './ChannelMix';
import { Icon } from './Icon';
import { revenueRanges } from '../data/dashboard';
import '../styles/analytics.css';

export interface AnalyticsSectionProps {
  activeRange: string;
  onRangeChange: (range: string) => void;
}

export function AnalyticsSection({ activeRange, onRangeChange }: AnalyticsSectionProps) {
  const range = revenueRanges.find((item) => item.label === activeRange) ?? revenueRanges[revenueRanges.length - 1];

  return (
    <section className="analytics" data-demo-id="analytics-section" aria-label="Analytics">
      <article className="card analytics__main" data-demo-id="analytics-chart-card">
        <div className="card__header">
          <div>
            <p className="eyebrow">Revenue analytics</p>
            <h3 className="card__title">Recurring revenue vs. expansion</h3>
            <p className="card__subtitle">{range.caption}</p>
          </div>
          <div className="analytics__toolbar" data-demo-id="analytics-range-switch">
            {revenueRanges.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`analytics__range${item.label === activeRange ? ' analytics__range--active' : ''}`}
                data-demo-id={`analytics-range-${item.id}`}
                onClick={() => onRangeChange(item.label)}
              >
                {item.label}
              </button>
            ))}
            <button type="button" className="icon-button" aria-label="Export analytics">
              <Icon name="arrow-down" size={16} />
            </button>
          </div>
        </div>
        <div className="card__body">
          <AreaChart
            data={range.series}
            primaryLabel="Recurring"
            secondaryLabel="Expansion"
            granularity={range.granularity}
          />
        </div>
      </article>

      <ChannelMix />
    </section>
  );
}
