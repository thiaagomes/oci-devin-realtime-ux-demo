import { KpiCard } from './KpiCard';
import { kpis } from '../data/dashboard';
import '../styles/kpi.css';

export function KpiGrid() {
  return (
    <section className="kpi-grid" data-demo-id="kpi-grid" aria-label="Key performance indicators">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </section>
  );
}
