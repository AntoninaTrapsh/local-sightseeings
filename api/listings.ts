// Респонс листинга достопримечательностей

export interface IListingResponse {
  sights: ISight[];
  page: IPageResponse;
}

export interface ISight {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

export interface IPageResponse {
  limit: number;
  offset: number;
  count: number;
}

// Реквест листинга достопримечательностей

export interface IRequest {
  filters?: Record<ESightsFilter, string[]>; // keys из IOption
  searchQuery?: string;
  sortType?: ESortType;
  page: IPageRequest;
}

export enum ESortType {
  Popularity = 'popularity',
  Rating = 'rating',
}

export interface IPageRequest {
  offset: number;
  limit: number;
}

export enum ESightsFilter {
  Location = 'location',
  InterestBy = 'interestBy',
  OpeningHours = 'openingHours',
  Category = 'category',
  Price = 'price',
}

// Респонс фильтров достопримечательностей/маршрутов

export interface FiltersResponse {
  filters: IFilters[];
}

// Пример: реальные id будущих фильтров ещё не определены
export enum EFilter {
  Location = 'location',
  Category = 'category',
}

export interface IFilters {
  id: EFilter;
  name: string;
  type: EFilterType;
  options: IOptions[];
}

export interface IOptions {
  key: string;
  label: string;
}

export enum EFilterType {
  Checkbox = 'checkbox',
}
