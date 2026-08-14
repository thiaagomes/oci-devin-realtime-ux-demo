import type { SVGProps } from 'react';

export type IconName =
  | 'sparkles'
  | 'grid'
  | 'chart'
  | 'users'
  | 'flow'
  | 'plug'
  | 'settings'
  | 'search'
  | 'bell'
  | 'help'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'check'
  | 'close'
  | 'menu'
  | 'bolt'
  | 'globe'
  | 'shield'
  | 'clock'
  | 'cloud'
  | 'play';

const PATHS: Record<IconName, string[]> = {
  sparkles: [
    'M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z',
    'M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z',
  ],
  grid: ['M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z'],
  chart: ['M4 20V10m5 10V4m5 16v-7m5 7V7'],
  users: [
    'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1',
    'M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
    'M17 11a3 3 0 1 0 0-6',
    'M21 19v-1a4 4 0 0 0-3-3.87',
  ],
  flow: ['M5 6h6a3 3 0 0 1 3 3v6a3 3 0 0 0 3 3h2', 'M3 4h4v4H3V4zm14 10h4v4h-4v-4z'],
  plug: ['M9 3v6M15 3v6', 'M7 9h10v3a5 5 0 0 1-10 0V9z', 'M12 17v4'],
  settings: [
    'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
    'M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-2.87 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.87-1.2l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 3.7 15H3.6a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 5.3 8.13l-.06-.06A2 2 0 1 1 8.07 5.24l.06.06A1.7 1.7 0 0 0 11 4.1V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.87 1.2l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 20.4 11h.1a2 2 0 1 1 0 4h-.1z',
  ],
  search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M20 20l-3.6-3.6'],
  bell: ['M18 16V11a6 6 0 1 0-12 0v5l-1.6 2.2h15.2L18 16z', 'M10 20a2 2 0 0 0 4 0'],
  help: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M9.6 9.3A2.5 2.5 0 1 1 12 12.5V14', 'M12 17.5h.01'],
  'arrow-right': ['M5 12h13', 'M13 6l6 6-6 6'],
  'arrow-up': ['M12 19V5', 'M6 11l6-6 6 6'],
  'arrow-down': ['M12 5v14', 'M6 13l6 6 6-6'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  bolt: ['M13 3L5 14h5l-1 7 8-11h-5l1-7z'],
  globe: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M3.5 9h17M3.5 15h17', 'M12 3c2.5 3 2.5 15 0 18-2.5-3-2.5-15 0-18z'],
  shield: ['M12 3l7 3v6c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V6l7-3z', 'M9 12.5l2 2 4-4.5'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7.5V12l3 2'],
  cloud: ['M7.5 18h9.5a3.5 3.5 0 0 0 .4-6.98A5.5 5.5 0 0 0 6.6 9.4 4.3 4.3 0 0 0 7.5 18z'],
  play: ['M8 5.5l10 6.5-10 6.5v-13z'],
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
