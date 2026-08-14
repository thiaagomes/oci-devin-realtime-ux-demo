import { channelMix } from '../data/dashboard';
import { Icon } from './Icon';
import '../styles/analytics.css';

export function ChannelMix() {
  return (
    <article className="card analytics__aside" data-demo-id="channel-mix-card">
      <div className="card__header">
        <div>
          <p className="eyebrow">Acquisition</p>
          <h3 className="card__title">Channel mix</h3>
        </div>
        <span className="badge">
          <Icon name="clock" size={12} />
          Last 90 days
        </span>
      </div>

      <div className="card__body channel-mix">
        <div className="channel-mix__bar" aria-hidden="true">
          {channelMix.map((slice) => (
            <span key={slice.id} style={{ width: `${slice.value}%`, background: slice.color }} />
          ))}
        </div>

        <ul className="channel-mix__list">
          {channelMix.map((slice) => (
            <li key={slice.id} data-demo-id={`channel-${slice.id}`}>
              <span className="channel-mix__dot" style={{ background: slice.color }} aria-hidden="true" />
              <span className="channel-mix__label">{slice.label}</span>
              <span className="channel-mix__amount">{slice.amount}</span>
              <strong className="channel-mix__value">{slice.value}%</strong>
            </li>
          ))}
        </ul>

        <div className="channel-mix__footer">
          <div>
            <p className="eyebrow">Blended CAC payback</p>
            <strong>9.4 months</strong>
          </div>
          <button type="button" className="btn btn--ghost" data-demo-id="channel-mix-cta">
            Breakdown
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
