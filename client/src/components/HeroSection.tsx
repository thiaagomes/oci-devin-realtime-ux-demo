import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import '../styles/hero.css';

export interface HeroSectionProps {
  onExploreInsights: () => void;
  onOpenCustomize: () => void;
}

const highlights = [
  { id: 'pipeline', label: 'Qualified pipeline', value: '$12.4M' },
  { id: 'experiments', label: 'Live experiments', value: '18' },
  { id: 'regions', label: 'Active regions', value: '9' },
];

export function HeroSection({ onExploreInsights, onOpenCustomize }: HeroSectionProps) {
  return (
    <section className="hero" data-demo-id="hero-section" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__content">
        <span className="badge badge--info hero__pill" data-demo-id="hero-pill">
          <Icon name="bolt" size={12} />
          Live demo in progress
        </span>

        <h1 id="hero-title" className="hero__title" data-demo-id="hero-title">
          Welcome back, Thiago.
          <span className="hero__title-accent">Your revenue engine is compounding.</span>
        </h1>

        <p className="hero__subtitle" data-demo-id="hero-subtitle">
          Nebula Signals unified 42 data sources overnight. Activation is up 4.1 points and three segments crossed their
          expansion threshold while you were away.
        </p>

        <div className="hero__actions" data-demo-id="hero-actions">
          <button
            type="button"
            className="btn btn--primary hero__cta"
            data-demo-id="explore-insights-button"
            onClick={onExploreInsights}
          >
            <Icon name="chart" size={16} />
            Explore Insights
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            data-demo-id="hero-secondary-button"
            onClick={onOpenCustomize}
          >
            <Icon name="sparkles" size={16} />
            Customize your experience
          </button>
        </div>

        <ul className="hero__highlights" data-demo-id="hero-highlights">
          {highlights.map((item) => (
            <li key={item.id} data-demo-id={`hero-highlight-${item.id}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="hero__panel card" data-demo-id="hero-panel">
        <div className="hero__panel-head">
          <p className="eyebrow">Experience health</p>
          <span className="badge badge--success">
            <Icon name="check" size={12} />
            Optimal
          </span>
        </div>
        <div className="hero__score">
          <div className="hero__ring" style={{ '--score': 87 } as CSSProperties} aria-hidden="true">
            <span>87</span>
          </div>
          <div>
            <h3>Experience score</h3>
            <p>Composite of latency, engagement and satisfaction across every surface.</p>
          </div>
        </div>
        <ul className="hero__panel-list">
          <li>
            <span>Perceived speed</span>
            <span className="hero__meter">
              <i style={{ width: '92%' }} />
            </span>
            <strong>92</strong>
          </li>
          <li>
            <span>Clarity</span>
            <span className="hero__meter">
              <i style={{ width: '81%' }} />
            </span>
            <strong>81</strong>
          </li>
          <li>
            <span>Personalization</span>
            <span className="hero__meter">
              <i style={{ width: '74%' }} />
            </span>
            <strong>74</strong>
          </li>
        </ul>
      </aside>
    </section>
  );
}
