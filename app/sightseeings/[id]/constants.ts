import { ICardResponse } from '@/api/card';

export type SectionId = 'info' | 'facts' | 'history' | 'legends' | 'videoTours' | 'audioGuides' | 'gallery' | 'map';

export const SECTION_CONFIG: Array<{
  id: SectionId;
  label: string;
  show: (card: ICardResponse) => boolean;
}> = [
  { id: 'info', label: 'Общая информация', show: () => true },
  { id: 'facts', label: 'Факты', show: (card) => !!card.facts?.length },
  { id: 'history', label: 'История', show: (card) => !!card.history?.items.length },
  { id: 'legends', label: 'Легенды', show: (card) => !!card.legends?.length },
  { id: 'videoTours', label: 'Видео-экскурсия', show: (card) => !!card.videoTours?.length },
  { id: 'audioGuides', label: 'Аудиогид', show: (card) => !!card.audioGuides?.length },
  { id: 'gallery', label: 'Галерея', show: (card) => !!card.gallery?.length },
  { id: 'map', label: 'На карте', show: () => true },
];
