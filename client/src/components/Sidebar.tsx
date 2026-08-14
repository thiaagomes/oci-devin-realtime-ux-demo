import { useState } from 'react';
import { Icon } from './Icon';
import { navGroups } from '../data/dashboard';
import '../styles/sidebar.css';

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('overview');

  return (
    <aside
      className={`sidebar${open ? ' sidebar--open' : ''}`}
      data-demo-id="sidebar"
      aria-label="Primary navigation"
    >
      <div className="sidebar__brand" data-demo-id="sidebar-brand">
        <span className="sidebar__logo" aria-hidden="true">
          <Icon name="sparkles" size={20} />
        </span>
        <span className="sidebar__brand-text">
          <strong>Nebula Signals</strong>
          <small>Revenue intelligence</small>
        </span>
        <button type="button" className="icon-button sidebar__close" onClick={onClose} aria-label="Close navigation">
          <Icon name="close" />
        </button>
      </div>

      <nav className="sidebar__nav" data-demo-id="sidebar-nav">
        {navGroups.map((group) => (
          <div className="sidebar__group" key={group.id}>
            <p className="eyebrow sidebar__group-label">{group.label}</p>
            <ul>
              {group.items.map((item) => {
                const isActive = item.id === activeItem;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
                      data-demo-id={`nav-item-${item.id}`}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setActiveItem(item.id)}
                    >
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                      {item.badge ? <span className="sidebar__badge">{item.badge}</span> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar__promo card" data-demo-id="sidebar-promo">
        <span className="badge badge--info">
          <Icon name="cloud" size={12} />
          OCI ready
        </span>
        <h4>Adaptive experience engine</h4>
        <p>Connect OCI Generative AI and Devin to reshape this workspace in real time.</p>
        <button type="button" className="btn btn--ghost btn--block" data-demo-id="sidebar-promo-cta">
          View roadmap
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </aside>
  );
}
