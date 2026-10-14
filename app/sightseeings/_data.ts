import { ISight, IListingResponse } from '@/api/listings';
import { SightListItem, SightMock } from '@/app/types/sight';
import { mockMogutovaMountain } from '@/app/mocks/mockMogutovaMountain';
import { mockBogatyrskayaSloboda } from '@/app/mocks/mockBogatyrskayaSloboda';
import { mockPredannosti } from '@/app/mocks/mockPredannosti';
import { mockPeschera } from '@/app/mocks/mockPeschera';
import { mockPloshchadSlavi } from '@/app/mocks/mockPloshchadSlavi';
import { mockLeninMuseum } from '@/app/mocks/mockLeninMuseum';

export const mockSights: SightMock[] = [
  mockMogutovaMountain,
  mockBogatyrskayaSloboda,
  mockPredannosti,
  mockPeschera,
  mockPloshchadSlavi,
  mockLeninMuseum,
];

const toListingSight = ({ id, description, location, card }: SightMock): ISight => ({
  id,
  title: card.generalInfo.title,
  description,
  imageUrl: card.generalInfo.imageUrl,
  location,
});

export const mockListing: IListingResponse = {
  sights: mockSights.map(toListingSight),
  page: { limit: mockSights.length, offset: 0, count: mockSights.length },
};

export const mockSightsList: SightListItem[] = mockSights.map((mock) => ({
  ...toListingSight(mock),
  price: mock.card.generalInfo.price,
  openingHours: mock.card.generalInfo.openingHours,
}));

export const getMockCard = (id: string) => mockSights.find((mock) => mock.id === id)?.card;
