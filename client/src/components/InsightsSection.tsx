import { insights } from '../data/dashboard';
import { Icon } from './Icon';
import '../styles/insights.css';

export interface InsightsSectionProps {
  onExploreInsights: () => void;
}

export function InsightsSection({ onExploreInsights }: InsightsSectionProps) {
  return (
    <section className="insights" data-demo-id="insights-section" aria-labelledby="insights-title">
      <div className="insights__head">
        <div>
          <p className="eyebrow">Generated for you</p>
          <h2 id="insights-title" className="insights__title">
            Insights worth acting on this week
          </h2>
        </div>
        <button type="button" className="btn btn--ghost" data-demo-id="insights-view-all" onClick={onExploreInsights}>
          View all insights
          <Icon name="arrow-right" size={16} />
        </button>
      </div>

      <div className="insights__grid">
        {insights.map((insight) => (
          <article className="card insight-card" key={insight.id} data-demo-id={`insight-card-${insight.id}`}>
            <span className="insight-card__icon" aria-hidden="true">
              <Icon name={insight.icon} size={18} />
            </span>
            <h3 className="insight-card__title">{insight.title}</h3>
            <p className="insight-card__description">{insight.description}</p>
            <div className="insight-card__footer">
              <div>
                <strong>{insight.metric}</strong>
                <span>{insight.metricLabel}</span>
              </div>
              <button
                type="button"
                className="icon-button insight-card__action"
                aria-label={`Open insight: ${insight.title}`}
              >
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
