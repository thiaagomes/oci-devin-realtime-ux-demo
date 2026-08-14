import { Icon } from './Icon';
import { VersionBadge } from './VersionBadge';
import type { AppMeta } from '../hooks/useAppMeta';
import '../styles/topbar.css';

export interface TopbarProps {
  meta: AppMeta | null;
  metaLoading: boolean;
  onOpenNav: () => void;
  onOpenCustomize: () => void;
}

export function Topbar({ meta, metaLoading, onOpenNav, onOpenCustomize }: TopbarProps) {
  return (
    <header className="topbar" data-demo-id="topbar">
      <div className="topbar__left">
        <button type="button" className="icon-button topbar__nav-toggle" onClick={onOpenNav} aria-label="Open navigation">
          <Icon name="menu" />
        </button>
        <div className="topbar__breadcrumb" data-demo-id="topbar-breadcrumb">
          <span>Workspace</span>
          <Icon name="arrow-right" size={14} />
          <strong>Overview</strong>
        </div>
      </div>

      <label className="topbar__search" data-demo-id="topbar-search">
        <Icon name="search" size={16} />
        <input type="search" placeholder="Search metrics, cohorts, journeys…" aria-label="Search" />
        <kbd>⌘K</kbd>
      </label>

      <div className="topbar__right">
        <VersionBadge meta={meta} loading={metaLoading} />
        <button
          type="button"
          className="btn btn--ghost topbar__cta"
          data-demo-id="topbar-customize-button"
          onClick={onOpenCustomize}
        >
          <Icon name="sparkles" size={16} />
          Customize
        </button>
        <button type="button" className="icon-button" aria-label="Help">
          <Icon name="help" />
        </button>
        <button type="button" className="icon-button topbar__bell" aria-label="Notifications">
          <Icon name="bell" />
          <span className="topbar__bell-dot" aria-hidden="true" />
        </button>
        <button type="button" className="topbar__avatar" data-demo-id="topbar-avatar" aria-label="Account menu">
          <span>TG</span>
        </button>
      </div>
    </header>
  );
}
