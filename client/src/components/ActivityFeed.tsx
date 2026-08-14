import { activity } from '../data/dashboard';
import { Icon } from './Icon';
import '../styles/activity.css';

export function ActivityFeed() {
  return (
    <article className="card activity" data-demo-id="activity-card">
      <div className="card__header">
        <div>
          <p className="eyebrow">Realtime</p>
          <h3 className="card__title">Activity stream</h3>
        </div>
        <span className="badge badge--success">
          <span className="activity__pulse" aria-hidden="true" />
          Live
        </span>
      </div>

      <ul className="card__body activity__list">
        {activity.map((item) => (
          <li key={item.id} className="activity__item" data-demo-id={`activity-item-${item.id}`}>
            <span className={`activity__avatar activity__avatar--${item.tone}`} aria-hidden="true">
              {item.initials}
            </span>
            <div className="activity__body">
              <p className="activity__text">
                <strong>{item.actor}</strong> {item.action} <em>{item.target}</em>
              </p>
              <span className="activity__time">{item.time}</span>
            </div>
            <button type="button" className="icon-button activity__action" aria-label={`Open ${item.target}`}>
              <Icon name="arrow-right" size={16} />
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
