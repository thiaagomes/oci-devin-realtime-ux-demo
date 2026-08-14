import { useCallback, useRef, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { HeroSection } from './components/HeroSection';
import { KpiGrid } from './components/KpiGrid';
import { AnalyticsSection } from './components/AnalyticsSection';
import { ActivityFeed } from './components/ActivityFeed';
import { InsightsSection } from './components/InsightsSection';
import { SegmentTable } from './components/SegmentTable';
import { CustomizeFab } from './components/CustomizeFab';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { useAppMeta } from './hooks/useAppMeta';
import './styles/layout.css';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [range, setRange] = useState('12M');
  const insightsRef = useRef<HTMLDivElement>(null);
  const { meta, loading } = useAppMeta();

  const scrollToInsights = useCallback(() => {
    insightsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="app-shell" data-demo-id="app-shell">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="app-main" data-demo-id="app-main">
        <Topbar
          meta={meta}
          metaLoading={loading}
          onOpenNav={() => setNavOpen(true)}
          onOpenCustomize={() => setDrawerOpen(true)}
        />

        <main className="app-content" data-demo-id="app-content">
          <HeroSection onExploreInsights={scrollToInsights} onOpenCustomize={() => setDrawerOpen(true)} />

          <KpiGrid />

          <AnalyticsSection activeRange={range} onRangeChange={setRange} />

          <section className="app-columns" data-demo-id="operations-section">
            <SegmentTable />
            <ActivityFeed />
          </section>

          <div ref={insightsRef} className="app-anchor" data-demo-id="insights-anchor">
            <InsightsSection onExploreInsights={scrollToInsights} />
          </div>

          <footer className="app-footer" data-demo-id="app-footer">
            <p>
              Nebula Signals · Real-Time UX with OCI + Devin · {meta?.version ?? 'v1'}
              {meta?.buildShort ? ` · build ${meta.buildShort}` : ''}
            </p>
            <p className="app-footer__note">Demo data only. No customer information is stored in this application.</p>
          </footer>
        </main>
      </div>

      <CustomizeFab onClick={() => setDrawerOpen(true)} hidden={drawerOpen} />
      <CustomizeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {navOpen ? <div className="app-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" /> : null}
    </div>
  );
}
