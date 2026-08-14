import { segments } from '../data/dashboard';
import { Icon } from './Icon';
import '../styles/segments.css';

const healthTone: Record<string, string> = {
  Excellent: 'badge--success',
  Healthy: 'badge--info',
  Watch: 'badge--danger',
};

export function SegmentTable() {
  return (
    <article className="card segments" data-demo-id="segments-card">
      <div className="card__header">
        <div>
          <p className="eyebrow">Cohorts</p>
          <h3 className="card__title">Top segments by engagement</h3>
          <p className="card__subtitle">Weighted by product usage, support signal and expansion intent.</p>
        </div>
        <button type="button" className="btn btn--ghost" data-demo-id="segments-cta">
          <Icon name="users" size={16} />
          Manage cohorts
        </button>
      </div>

      <div className="card__body segments__body">
        <table className="segments__table">
          <thead>
            <tr>
              <th scope="col">Segment</th>
              <th scope="col">Accounts</th>
              <th scope="col">Engagement</th>
              <th scope="col">ARR</th>
              <th scope="col">Health</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((row) => (
              <tr key={row.id} data-demo-id={`segment-row-${row.id}`}>
                <th scope="row">{row.segment}</th>
                <td>{row.accounts}</td>
                <td>
                  <span className="segments__meter">
                    <i style={{ width: `${row.engagement}%` }} />
                  </span>
                  <span className="segments__meter-value">{row.engagement}</span>
                </td>
                <td className="segments__arr">{row.arr}</td>
                <td>
                  <span className={`badge ${healthTone[row.health]}`}>{row.health}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
