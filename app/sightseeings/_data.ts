import { ISight, IListingResponse } from '@/api/listings';
import { SightListItem, SightMock } from '@/app/types/sight';
import { mockMogutovaMountain } from '@/app/mocks/mogutova-mountain';
import { mockBogatyrskayaSloboda } from '@/app/mocks/bogatyrskaya-sloboda';
import { mockPredannosti } from '@/app/mocks/predannosti';
import { mockPeschera } from '@/app/mocks/peschera';
import { mockTatischeva } from '@/app/mocks/tatischeva';
import { mockLeninMuseum } from '@/app/mocks/lenin-museum';
import { mockGoluboeOzero } from '@/app/mocks/goluboe-ozero';
import { mockGornolyzhnyiKompleksKrasnayaGlinka } from '@/app/mocks/gornolyzhnyi-kompleks-krasnaya-glinka';
import { mockMolodetskiiKurgan } from '@/app/mocks/molodetskii-kurgan';
import { mockMuzeiLyagushki } from '@/app/mocks/muzei-lyagushki';
import { mockNaberezhnayaAvtozavodskogoRaionaTolyatti } from '@/app/mocks/naberezhnaya-avtozavodskogo-raiona-tolyatti';
import { mockOgonVechnoiSlavy } from '@/app/mocks/ogon-vechnoi-slavy';
import { mockVoznesenskiiMuzhskoiMonastyr } from '@/app/mocks/voznesenskii-muzhskoi-monastyr';
import { mockPadovskiyKarer } from '@/app/mocks/padovskiy-karer';
import { mockSamarskayaIstoricheskayaMechet } from '@/app/mocks/samarskaya-istoricheskaya-mechet';
import { mockSamarskiiOblastnoiKhudozhestvennyiMuzei } from '@/app/mocks/samarskii-oblastnoi-khudozhestvennyi-muzei';
import { mockSernoeOzero } from '@/app/mocks/sernoe-ozero';

export const mockSights: SightMock[] = [
  mockMogutovaMountain,
  mockBogatyrskayaSloboda,
  mockPredannosti,
  mockPeschera,
  mockTatischeva,
  mockLeninMuseum,
  mockGoluboeOzero,
  mockGornolyzhnyiKompleksKrasnayaGlinka,
  mockMolodetskiiKurgan,
  mockMuzeiLyagushki,
  mockNaberezhnayaAvtozavodskogoRaionaTolyatti,
  mockPadovskiyKarer,
  mockSamarskayaIstoricheskayaMechet,
  mockSamarskiiOblastnoiKhudozhestvennyiMuzei,
  mockSernoeOzero,
  mockOgonVechnoiSlavy,
  mockVoznesenskiiMuzhskoiMonastyr,
];

const toListingSight = ({ id, description, location, card }: SightMock): ISight => ({
  id,
  title: card.generalInfo.title,
  description,
  imageUrl: card.generalInfo.imageUrl,
  imageUrlMobile: card.generalInfo.imageUrlMobile,
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
