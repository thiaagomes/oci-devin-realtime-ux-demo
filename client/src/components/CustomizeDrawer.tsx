import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { PipelineTimeline } from './PipelineTimeline';
import { useCustomizeRequest } from '../hooks/useCustomizeRequest';
import '../styles/customize.css';

export interface CustomizeDrawerProps {
  open: boolean;
  onClose: () => void;
}

const PLACEHOLDER =
  'Move the Explore Insights button to the upper right and change the accent color to emerald green.';

const SUGGESTIONS = [
  'Make the KPI cards more compact and increase spacing between sections.',
  'Move the Explore Insights button to the upper right corner.',
  'Switch the accent color to emerald green and soften the shadows.',
];

export function CustomizeDrawer({ open, onClose }: CustomizeDrawerProps) {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { state, response, submit, reset, stageStatus } = useCustomizeRequest();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => textareaRef.current?.focus(), 240);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      window.clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const submitting = state === 'submitting';

  const handleSubmit = () => {
    if (!prompt.trim() || submitting) return;
    void submit(prompt.trim());
  };

  return (
    <>
      <div
        className={`drawer-overlay${open ? ' drawer-overlay--visible' : ''}`}
        data-demo-id="customize-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`drawer${open ? ' drawer--open' : ''}`}
        data-demo-id="customize-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customize-drawer-title"
        aria-hidden={!open}
      >
        <header className="drawer__header">
          <div className="drawer__title-row">
            <span className="drawer__icon" aria-hidden="true">
              <Icon name="sparkles" size={18} />
            </span>
            <div>
              <h2 id="customize-drawer-title" className="drawer__title">
                Customize your experience
              </h2>
              <p className="drawer__eyebrow">Powered by OCI Generative AI + Devin</p>
            </div>
            <button
              type="button"
              className="icon-button drawer__close"
              data-demo-id="customize-drawer-close"
              onClick={onClose}
              aria-label="Close customization panel"
            >
              <Icon name="close" />
            </button>
          </div>

          <p className="drawer__description" data-demo-id="customize-drawer-description">
            Describe how you would like this application experience to change — layout, colors, spacing, the position of
            any button or an entire section. Your request is sent to an OCI agent, implemented by Devin and delivered back
            to you as a new version of this app.
          </p>
        </header>

        <div className="drawer__body">
          <label className="drawer__field" htmlFor="customize-prompt">
            <span className="eyebrow">Your request</span>
            <textarea
              id="customize-prompt"
              ref={textareaRef}
              className="drawer__textarea"
              data-demo-id="customize-prompt-input"
              rows={6}
              value={prompt}
              placeholder={PLACEHOLDER}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </label>

          <div className="drawer__suggestions" data-demo-id="customize-suggestions">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="drawer__suggestion"
                onClick={() => setPrompt(suggestion)}
              >
                <Icon name="bolt" size={12} />
                {suggestion}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn--primary btn--block drawer__submit"
            data-demo-id="apply-with-ai-button"
            onClick={handleSubmit}
            disabled={!prompt.trim() || submitting}
          >
            <Icon name="sparkles" size={16} />
            {submitting ? 'Sending request…' : 'Apply with AI'}
          </button>

          {response ? (
            <div
              className={`drawer__notice drawer__notice--${
                response.accepted ? 'success' : state === 'error' ? 'error' : 'warning'
              }`}
              data-demo-id="customize-response"
              role="status"
            >
              <Icon name={response.accepted ? 'check' : state === 'error' ? 'close' : 'help'} size={16} />
              <div>
                <strong>
                  {response.accepted
                    ? 'Devin session created'
                    : state === 'error'
                      ? 'Request failed'
                      : 'AI integration not configured yet'}
                </strong>
                <p>{response.message}</p>
                {response.accepted && response.devinSessionUrl ? (
                  <a href={response.devinSessionUrl} target="_blank" rel="noreferrer">
                    Open Devin session
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          <section className="drawer__pipeline">
            <div className="drawer__pipeline-head">
              <p className="eyebrow">Delivery pipeline</p>
              {state !== 'idle' ? (
                <button type="button" className="drawer__reset" onClick={reset}>
                  Reset
                </button>
              ) : null}
            </div>
            <PipelineTimeline statusOf={stageStatus} />
          </section>
        </div>

        <footer className="drawer__footer">
          <span className="badge">
            <Icon name="shield" size={12} />
            V1 baseline · mock workflow
          </span>
          <span className="drawer__hint">Press Esc to close</span>
        </footer>
      </aside>
    </>
  );
}
