import { ESortType, IPageRequest, IPageResponse } from './listings';

// Респонс маршрутов

export interface IListingResponse {
  routes: IRoute[];
  page: IPageResponse;
}

export interface IRoute {
  title: string;
  routeLength: string;
  locomotion: string;
  city: string;
  imageUrl: string;
}

// Реквест маршрутов

export interface IRequest {
  filters?: Record<ERoutesFilter, string[]>; // keys из IOption
  searchQuery?: string;
  sortType?: ESortType;
  page: IPageRequest;
}

export enum ERoutesFilter {
  RouteLength = 'routeLength',
  Locomotion = 'locomotion',
  InterestBy = 'interestBy',
  Location = 'location',
  Difficulty = 'difficulty',
}
