"use client"
import { YMaps, Map, Placemark } from '@mr-igorinni/react-yandex-maps-fork';
import { FC } from 'react';
import { IMapLocation } from '@/api/card';
import s from './styles.module.css'

const DEFAULT_ZOOM = 15;

interface YandexMapProps {
  location: IMapLocation;
  zoom?: number;
}

export const YandexMap:FC<YandexMapProps> = ({ location, zoom = DEFAULT_ZOOM }) => {
  const point: [number, number] = [location.lat, location.lng];
  return (
    <YMaps>
      <Map
        defaultState={{ center: point, zoom }}
        className={s.map}
      >
        <Placemark geometry={point} />
      </Map>
    </YMaps>
  );
}
