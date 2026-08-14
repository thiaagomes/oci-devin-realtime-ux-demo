import type { AppMeta } from '../hooks/useAppMeta';
import '../styles/version-badge.css';

export interface VersionBadgeProps {
  meta: AppMeta | null;
  loading: boolean;
}

export function VersionBadge({ meta, loading }: VersionBadgeProps) {
  const version = meta?.version ?? 'v1';
  const build = meta?.buildShort;

  return (
    <span
      className={`version-badge${loading ? ' version-badge--loading' : ''}`}
      data-demo-id="version-badge"
      title={meta?.build ? `Build ${meta.build}` : 'Local build'}
    >
      <span className="version-badge__dot" aria-hidden="true" />
      <span className="version-badge__label">Version {version}</span>
      {build ? <span className="version-badge__build">{build}</span> : null}
    </span>
  );
}
