import { Icon } from './Icon';
import { pipelineStages } from '../data/dashboard';
import type { StageStatus } from '../hooks/useCustomizeRequest';
import '../styles/timeline.css';

export interface PipelineTimelineProps {
  statusOf: (stageId: string) => StageStatus;
}

const STATUS_LABEL: Record<StageStatus, string> = {
  pending: 'Waiting',
  active: 'In progress',
  done: 'Complete',
  blocked: 'Not configured',
};

export function PipelineTimeline({ statusOf }: PipelineTimelineProps) {
  return (
    <ol className="timeline" data-demo-id="customize-timeline">
      {pipelineStages.map((stage, index) => {
        const status = statusOf(stage.id);
        return (
          <li
            key={stage.id}
            className={`timeline__item timeline__item--${status}`}
            data-demo-id={`timeline-stage-${stage.id}`}
            data-status={status}
          >
            <span className="timeline__marker" aria-hidden="true">
              {status === 'done' ? <Icon name="check" size={14} /> : <Icon name={stage.icon} size={14} />}
            </span>
            <div className="timeline__content">
              <div className="timeline__heading">
                <strong>
                  {index + 1}. {stage.title}
                </strong>
                <span className="timeline__status">{STATUS_LABEL[status]}</span>
              </div>
              <p>{stage.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
