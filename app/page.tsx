import { Hero } from '@/components/home/hero';
import { FeaturedLabs } from '@/components/home/featured-labs';
import { SkillsGrid } from '@/components/home/skills-grid';
import { HowIWork } from '@/components/home/how-i-work';
import { getFeaturedLabs } from '@/lib/mdx';

export default function HomePage() {
  const featuredLabs = getFeaturedLabs();

  return (
    <>
      <Hero />
      <FeaturedLabs labs={featuredLabs} />
      <SkillsGrid />
      <HowIWork />
    </>
  );
}
