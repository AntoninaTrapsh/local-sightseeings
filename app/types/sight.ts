import { ICardResponse } from '@/api/card';
import { ISight } from '@/api/listings';

// title и imageUrl листинга берутся из card.generalInfo
export type SightMock = Pick<ISight, 'id' | 'description' | 'location'> & {
  card: ICardResponse;
};

export type SightListItem = ISight & {
  category?: string;
  interestBy?: string;
  price?: string;
  openingHours?: string;
};
