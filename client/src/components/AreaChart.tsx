import { useMemo, useState } from 'react';
import type { ChartPoint } from '../data/dashboard';
import '../styles/chart.css';

export interface AreaChartProps {
  data: ChartPoint[];
  primaryLabel: string;
  secondaryLabel: string;
}

const WIDTH = 720;
const HEIGHT = 260;
const PADDING = { top: 16, right: 8, bottom: 28, left: 40 };

export function AreaChart({ data, primaryLabel, secondaryLabel }: AreaChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const geometry = useMemo(() => {
    const values = data.flatMap((point) => [point.primary, point.secondary]);
    const max = Math.ceil(Math.max(...values) / 100) * 100;
    const innerWidth = WIDTH - PADDING.left - PADDING.right;
    const innerHeight = HEIGHT - PADDING.top - PADDING.bottom;

    const toX = (index: number) => PADDING.left + (index / (data.length - 1)) * innerWidth;
    const toY = (value: number) => PADDING.top + innerHeight - (value / max) * innerHeight;

    const buildPath = (key: 'primary' | 'secondary') =>
      data.map((point, index) => `${index === 0 ? 'M' : 'L'}${toX(index).toFixed(1)},${toY(point[key]).toFixed(1)}`).join(' ');

    const primaryPath = buildPath('primary');
    const secondaryPath = buildPath('secondary');

    return {
      max,
      toX,
      toY,
      primaryPath,
      secondaryPath,
      primaryArea: `${primaryPath} L${toX(data.length - 1).toFixed(1)},${(HEIGHT - PADDING.bottom).toFixed(1)} L${PADDING.left},${(HEIGHT - PADDING.bottom).toFixed(1)} Z`,
      gridLines: [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
        ratio,
        y: PADDING.top + innerHeight * (1 - ratio),
        value: Math.round(max * ratio),
      })),
    };
  }, [data]);

  const active = hovered === null ? null : data[hovered];

  return (
    <div className="chart" data-demo-id="revenue-chart">
      <div className="chart__legend">
        <span className="chart__legend-item">
          <i className="chart__swatch chart__swatch--primary" />
          {primaryLabel}
        </span>
        <span className="chart__legend-item">
          <i className="chart__swatch chart__swatch--secondary" />
          {secondaryLabel}
        </span>
      </div>

      <svg
        className="chart__svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`${primaryLabel} compared with ${secondaryLabel} over the last twelve months`}
        onMouseLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {geometry.gridLines.map((line) => (
          <g key={line.ratio}>
            <line
              className="chart__grid"
              x1={PADDING.left}
              x2={WIDTH - PADDING.right}
              y1={line.y}
              y2={line.y}
            />
            <text className="chart__axis-label" x={PADDING.left - 10} y={line.y + 4} textAnchor="end">
              {line.value}
            </text>
          </g>
        ))}

        <path d={geometry.primaryArea} fill="url(#areaFill)" />
        <path className="chart__line chart__line--primary" d={geometry.primaryPath} />
        <path className="chart__line chart__line--secondary" d={geometry.secondaryPath} />

        {data.map((point, index) => (
          <g key={point.label}>
            <text
              className="chart__axis-label"
              x={geometry.toX(index)}
              y={HEIGHT - 8}
              textAnchor="middle"
            >
              {point.label}
            </text>
            <circle
              className={`chart__dot${hovered === index ? ' chart__dot--active' : ''}`}
              cx={geometry.toX(index)}
              cy={geometry.toY(point.primary)}
              r={hovered === index ? 5.5 : 3.5}
            />
            <rect
              className="chart__hit"
              x={geometry.toX(index) - 14}
              y={PADDING.top}
              width={28}
              height={HEIGHT - PADDING.top - PADDING.bottom}
              onMouseEnter={() => setHovered(index)}
            />
          </g>
        ))}
      </svg>

      <div className={`chart__tooltip${active ? ' chart__tooltip--visible' : ''}`} aria-live="polite">
        {active ? (
          <>
            <strong>{active.label}</strong>
            <span>
              {primaryLabel}: <b>${active.primary}K</b>
            </span>
            <span>
              {secondaryLabel}: <b>${active.secondary}K</b>
            </span>
          </>
        ) : (
          <span>Hover the chart to inspect a month</span>
        )}
      </div>
    </div>
  );
}
