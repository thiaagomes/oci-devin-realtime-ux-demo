import type { IconName } from '../components/Icon';

export interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  badge?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      { id: 'overview', label: 'Overview', icon: 'grid' },
      { id: 'analytics', label: 'Analytics', icon: 'chart', badge: 'Live' },
      { id: 'audiences', label: 'Audiences', icon: 'users' },
      { id: 'journeys', label: 'Journeys', icon: 'flow' },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      { id: 'automations', label: 'Automations', icon: 'bolt', badge: '4' },
      { id: 'integrations', label: 'Integrations', icon: 'plug' },
      { id: 'governance', label: 'Governance', icon: 'shield' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
];

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  caption: string;
  icon: IconName;
  series: number[];
}

export const kpis: Kpi[] = [
  {
    id: 'revenue',
    label: 'Net revenue',
    value: '$4.82M',
    delta: '+12.4%',
    trend: 'up',
    caption: 'vs. previous 30 days',
    icon: 'chart',
    series: [18, 24, 21, 30, 27, 36, 33, 44, 41, 52, 58, 64],
  },
  {
    id: 'activation',
    label: 'Activation rate',
    value: '68.3%',
    delta: '+4.1 pts',
    trend: 'up',
    caption: '2,318 accounts onboarded',
    icon: 'bolt',
    series: [40, 38, 44, 47, 45, 52, 50, 57, 61, 60, 66, 68],
  },
  {
    id: 'retention',
    label: 'Net retention',
    value: '121%',
    delta: '+2.8%',
    trend: 'up',
    caption: 'Expansion led by Enterprise',
    icon: 'users',
    series: [92, 96, 98, 101, 104, 108, 106, 112, 115, 117, 119, 121],
  },
  {
    id: 'latency',
    label: 'Experience latency',
    value: '182 ms',
    delta: '-18.6%',
    trend: 'down',
    caption: 'p95 across all regions',
    icon: 'clock',
    series: [320, 305, 298, 276, 268, 250, 244, 228, 215, 204, 192, 182],
  },
];

export interface ChartPoint {
  label: string;
  primary: number;
  secondary: number;
}

export const revenueSeries: ChartPoint[] = [
  { label: 'Jan', primary: 210, secondary: 148 },
  { label: 'Feb', primary: 248, secondary: 162 },
  { label: 'Mar', primary: 232, secondary: 170 },
  { label: 'Apr', primary: 296, secondary: 188 },
  { label: 'May', primary: 318, secondary: 205 },
  { label: 'Jun', primary: 352, secondary: 214 },
  { label: 'Jul', primary: 386, secondary: 246 },
  { label: 'Aug', primary: 372, secondary: 262 },
  { label: 'Sep', primary: 428, secondary: 281 },
  { label: 'Oct', primary: 468, secondary: 302 },
  { label: 'Nov', primary: 505, secondary: 318 },
  { label: 'Dec', primary: 552, secondary: 344 },
];

export interface RevenueRange {
  id: string;
  label: string;
  caption: string;
  granularity: string;
  series: ChartPoint[];
}

export const revenueRanges: RevenueRange[] = [
  {
    id: '30d',
    label: '30D',
    caption: 'Normalized in thousands of USD, grouped by week.',
    granularity: 'week',
    series: [
      { label: 'W1', primary: 118, secondary: 74 },
      { label: 'W2', primary: 132, secondary: 81 },
      { label: 'W3', primary: 126, secondary: 92 },
      { label: 'W4', primary: 149, secondary: 97 },
      { label: 'W5', primary: 161, secondary: 108 },
    ],
  },
  {
    id: '90d',
    label: '90D',
    caption: 'Normalized in thousands of USD, grouped by month.',
    granularity: 'month',
    series: [
      { label: 'Oct', primary: 468, secondary: 302 },
      { label: 'Nov', primary: 505, secondary: 318 },
      { label: 'Dec', primary: 552, secondary: 344 },
    ],
  },
  {
    id: '12m',
    label: '12M',
    caption: 'Normalized in thousands of USD, grouped by month.',
    granularity: 'month',
    series: revenueSeries,
  },
];

export interface ChannelSlice {
  id: string;
  label: string;
  value: number;
  amount: string;
  color: string;
}

export const channelMix: ChannelSlice[] = [
  { id: 'product', label: 'Product-led', value: 42, amount: '$2.02M', color: 'var(--color-accent)' },
  { id: 'partners', label: 'Partner network', value: 27, amount: '$1.30M', color: 'var(--color-accent-2)' },
  { id: 'outbound', label: 'Outbound', value: 19, amount: '$0.91M', color: 'var(--color-info)' },
  { id: 'community', label: 'Community', value: 12, amount: '$0.59M', color: 'var(--color-success)' },
];

export interface ActivityItem {
  id: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  time: string;
  tone: 'accent' | 'success' | 'info' | 'warning';
}

export const activity: ActivityItem[] = [
  {
    id: 'a1',
    actor: 'Marina Alves',
    initials: 'MA',
    action: 'published experiment',
    target: 'Onboarding checklist v4',
    time: '2 min ago',
    tone: 'accent',
  },
  {
    id: 'a2',
    actor: 'OCI Agent',
    initials: 'OA',
    action: 'scaled inference pool for',
    target: 'sa-saopaulo-1',
    time: '11 min ago',
    tone: 'info',
  },
  {
    id: 'a3',
    actor: 'Devin',
    initials: 'DV',
    action: 'opened pull request',
    target: 'feat/adaptive-hero-layout',
    time: '26 min ago',
    tone: 'success',
  },
  {
    id: 'a4',
    actor: 'Lucas Prado',
    initials: 'LP',
    action: 'flagged anomaly in',
    target: 'EMEA activation funnel',
    time: '1 hour ago',
    tone: 'warning',
  },
  {
    id: 'a5',
    actor: 'Sofia Nakamura',
    initials: 'SN',
    action: 'approved rollout of',
    target: 'Pricing page variant B',
    time: '3 hours ago',
    tone: 'accent',
  },
];

export interface InsightCard {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const insights: InsightCard[] = [
  {
    id: 'expansion',
    icon: 'globe',
    title: 'LATAM expansion window',
    description:
      'Trial-to-paid conversion in Brazil is 2.3x the global median. Shifting 15% of onboarding spend unlocks predictable expansion.',
    metric: '+$318K',
    metricLabel: 'projected ARR',
  },
  {
    id: 'friction',
    icon: 'bolt',
    title: 'Checkout friction detected',
    description:
      'Users abandoning at the plan-selection step responded well to a condensed layout with the primary action above the fold.',
    metric: '-27%',
    metricLabel: 'drop-off',
  },
  {
    id: 'reliability',
    icon: 'shield',
    title: 'Reliability headroom',
    description:
      'Edge caching in three regions cut p95 latency below the 200 ms experience budget for the eighth consecutive week.',
    metric: '99.98%',
    metricLabel: 'availability',
  },
];

export interface SegmentRow {
  id: string;
  segment: string;
  accounts: string;
  engagement: number;
  arr: string;
  health: 'Excellent' | 'Healthy' | 'Watch';
}

export const segments: SegmentRow[] = [
  { id: 's1', segment: 'Enterprise · Financial services', accounts: '184', engagement: 92, arr: '$1.94M', health: 'Excellent' },
  { id: 's2', segment: 'Mid-market · Retail', accounts: '412', engagement: 78, arr: '$1.21M', health: 'Healthy' },
  { id: 's3', segment: 'Startup · Developer tools', accounts: '1,096', engagement: 64, arr: '$0.86M', health: 'Healthy' },
  { id: 's4', segment: 'Public sector · LATAM', accounts: '57', engagement: 41, arr: '$0.31M', health: 'Watch' },
];

export interface PipelineStage {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export const pipelineStages: PipelineStage[] = [
  {
    id: 'request-received',
    title: 'Request received',
    description: 'Your description is captured and validated by the experience API.',
    icon: 'check',
  },
  {
    id: 'oci-agent',
    title: 'OCI Agent',
    description: 'OCI Generative AI turns intent into a concrete UI change plan.',
    icon: 'cloud',
  },
  {
    id: 'devin',
    title: 'Devin',
    description: 'Devin implements the change, validates it and ships a new build.',
    icon: 'sparkles',
  },
  {
    id: 'new-version-ready',
    title: 'New version ready',
    description: 'The refreshed experience is deployed and served to this session.',
    icon: 'play',
  },
];
