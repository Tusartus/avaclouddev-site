import { Composition } from 'remotion';
import { LabVideo } from './LabVideo';
import labData from './data/aks-terraform-github-oidc.json';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LabVideo"
        component={LabVideo}
        durationInFrames={30 * 60} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: labData.title,
          techStack: labData.techStack,
          steps: labData.steps,
          repoUrl: labData.repoUrl,
          siteUrl: labData.siteUrl,
        }}
      />
    </>
  );
};
