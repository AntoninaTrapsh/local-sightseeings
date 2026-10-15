import { FC } from 'react';
import { SectionId } from './constants';
import {
  AudioGuidesSection,
  FactsSection,
  GallerySection,
  HistorySection,
  InfoSection,
  LegendsSection,
  MapSection,
  SectionProps,
  VideoToursSection,
} from './sections';

const SECTION_MAP: Record<SectionId, FC<SectionProps>> = {
  info: InfoSection,
  facts: FactsSection,
  history: HistorySection,
  legends: LegendsSection,
  videoTours: VideoToursSection,
  audioGuides: AudioGuidesSection,
  gallery: GallerySection,
  map: MapSection,
};

export interface SectionContentProps extends SectionProps {
  active: SectionId;
}

export const SectionContent: FC<SectionContentProps> = ({ active, card }) => {
  const Section = SECTION_MAP[active];
  return <Section card={card} />;
};
