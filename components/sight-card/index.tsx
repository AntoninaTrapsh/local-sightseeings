import { FC } from 'react';
import s from './styles.module.css';
import { CoverImage } from '@/components/CoverImage';
import cn from 'classnames';
import Link from 'next/link';
import { ISight } from '@/api/listings';

interface SightCardProps {
  sight: ISight;
}

export const SightCard: FC<SightCardProps> = ({ sight }) => {
  const { id, title, description, location, imageUrl, imageUrlMobile } = sight;
  return (
    <article className={s.card}>
      <Link href={`/sightseeings/${id}`} className="link-around" data-description="на страницу достопримечательности" />
      <CoverImage
        className={s.image}
        src={imageUrl}
        mobileSrc={imageUrlMobile}
        alt={description}
        width={212}
        height={128}
      />
      <h3 className={cn('text-md', s.title)}>{title}</h3>
      <p className={cn('text-lg', s.description)}>{description}</p>
      <p className={cn('text-md', s.location)}>{location}</p>
    </article>
  );
};
