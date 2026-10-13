import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface LabVideoProps {
  title: string;
  techStack: string[];
  steps: { label: string; command?: string }[];
  repoUrl: string;
  siteUrl: string;
}

const IntroCard: React.FC<{ title: string; techStack: string[] }> = ({ title, techStack }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const y = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div style={{ opacity, transform: `translateY(${y}px)`, textAlign: 'center' }}>
        <h1 style={{ color: '#f9fafb', fontSize: 56, fontWeight: 700, marginBottom: 24 }}>{title}</h1>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {(techStack ?? []).map((tech: string, i: number) => (
            <span key={i} style={{ backgroundColor: '#00d4ff20', color: '#00d4ff', padding: '8px 16px', borderRadius: 8, fontSize: 20, fontWeight: 600 }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TerminalScene: React.FC<{ steps: { label: string; command?: string }[] }> = ({ steps }) => {
  const frame = useCurrentFrame();
  const visibleLines = Math.min(Math.floor(frame / 25), (steps ?? []).length);

  return (
    <AbsoluteFill style={{ backgroundColor: '#111827', padding: 80, justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#0a0f1e', borderRadius: 12, padding: 40, fontFamily: 'monospace', border: '1px solid #1f2937' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e' }} />
        </div>
        {(steps ?? []).slice(0, visibleLines).map((step: { label: string; command?: string }, i: number) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <div style={{ color: '#9ca3af', fontSize: 16, marginBottom: 4 }}>{'# '}{step?.label ?? ''}</div>
            {step?.command && (
              <div style={{ color: '#00d4ff', fontSize: 18 }}>{'$ '}{step.command}</div>
            )}
          </div>
        ))}
        <span style={{ color: '#22c55e', fontSize: 18 }}>█</span>
      </div>
    </AbsoluteFill>
  );
};

const ChapterCard: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ opacity, padding: 40, textAlign: 'center' }}>
        <div style={{ width: 60, height: 4, backgroundColor: '#00d4ff', marginBottom: 24, borderRadius: 2, margin: '0 auto 24px' }} />
        <h2 style={{ color: '#f9fafb', fontSize: 48, fontWeight: 700 }}>{text}</h2>
      </div>
    </AbsoluteFill>
  );
};

const OutroCard: React.FC<{ repoUrl: string; siteUrl: string }> = ({ repoUrl, siteUrl }) => {
  const frame = useCurrentFrame();
  const opacity = spring({ frame, fps: 30, from: 0, to: 1, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0f1e', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ opacity, textAlign: 'center' }}>
        <h2 style={{ color: '#f9fafb', fontSize: 48, fontWeight: 700, marginBottom: 32 }}>Try it yourself</h2>
        <div style={{ color: '#00d4ff', fontSize: 24, marginBottom: 16 }}>{repoUrl}</div>
        <div style={{ color: '#9ca3af', fontSize: 20 }}>{siteUrl}</div>
      </div>
    </AbsoluteFill>
  );
};

export const LabVideo: React.FC<LabVideoProps> = ({ title, techStack, steps, repoUrl, siteUrl }) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={150}>
        <IntroCard title={title ?? ''} techStack={techStack ?? []} />
      </Sequence>
      <Sequence from={150} durationInFrames={30}>
        <ChapterCard text="Setup" />
      </Sequence>
      <Sequence from={180} durationInFrames={600}>
        <TerminalScene steps={steps ?? []} />
      </Sequence>
      <Sequence from={780} durationInFrames={30}>
        <ChapterCard text="Results" />
      </Sequence>
      <Sequence from={810} durationInFrames={990}>
        <OutroCard repoUrl={repoUrl ?? ''} siteUrl={siteUrl ?? ''} />
      </Sequence>
    </AbsoluteFill>
  );
};
