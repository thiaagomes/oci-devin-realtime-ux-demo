import { AreaChart } from './AreaChart';
import { ChannelMix } from './ChannelMix';
import { Icon } from './Icon';
import { revenueSeries } from '../data/dashboard';
import '../styles/analytics.css';

const ranges = ['30D', '90D', '12M'];

export interface AnalyticsSectionProps {
  activeRange: string;
  onRangeChange: (range: string) => void;
}

export function AnalyticsSection({ activeRange, onRangeChange }: AnalyticsSectionProps) {
  return (
    <section className="analytics" data-demo-id="analytics-section" aria-label="Analytics">
      <article className="card analytics__main" data-demo-id="analytics-chart-card">
        <div className="card__header">
          <div>
            <p className="eyebrow">Revenue analytics</p>
            <h3 className="card__title">Recurring revenue vs. expansion</h3>
            <p className="card__subtitle">Normalized in thousands of USD, refreshed every 5 minutes.</p>
          </div>
          <div className="analytics__toolbar" data-demo-id="analytics-range-switch">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                className={`analytics__range${range === activeRange ? ' analytics__range--active' : ''}`}
                data-demo-id={`analytics-range-${range.toLowerCase()}`}
                onClick={() => onRangeChange(range)}
              >
                {range}
              </button>
            ))}
            <button type="button" className="icon-button" aria-label="Export analytics">
              <Icon name="arrow-down" size={16} />
            </button>
          </div>
        </div>
        <div className="card__body">
          <AreaChart data={revenueSeries} primaryLabel="Recurring" secondaryLabel="Expansion" />
        </div>
      </article>

      <ChannelMix />
    </section>
  );
}
