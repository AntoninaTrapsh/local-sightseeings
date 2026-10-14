// Респонс карточки достопримечательности

export interface ICardResponse {
  generalInfo: IGeneralInfo;
  map: IMapLocation;

  facts?: string[]; // теги
  history?: IHistoryBlock;
  legends?: string[]; // теги
  videoTours?: string[];
  audioGuides?: string[];
  gallery?: string[];
}

export interface IGeneralInfo {
  title: string;
  imageUrl: string;
  address: string;
  openingHours?: string;
  phone?: string;
  website?: string;
  events?: string;
  price?: string;
}

export interface IHistoryBlock {
  items: string[]; // теги
  quote?: string;
}

export interface IMapLocation {
  lat: number;
  lng: number;
}

// Реквест за карточкой

export interface ICardRequest {
  id: string;
}
