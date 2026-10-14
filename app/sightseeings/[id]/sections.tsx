import { FC } from 'react';
import { ICardResponse } from '@/api/card';
import { Audio } from '@/components/audio';
import Gallery from '@/components/gallery';
import { YandexMap } from '@/components/map';
import { InfoIcon } from '@/components/icons/InfoIcon';
import { toRutubeEmbedUrl } from '@/shared/utils/toRutubeEmbedUrl';

export interface SectionProps {
  card: ICardResponse;
}

// TODO: добавить санитайзер HTML (например, DOMPurify) перед dangerouslySetInnerHTML —
// сейчас строки из facts, legends и history.items вставляются как есть.
const html = (value: string) => ({ __html: value });

// TODO: добавить отображение поля events из IGeneralInfo — согласно контракту оно должно приходить с бэкенда
export const InfoSection: FC<SectionProps> = ({ card }) => {
  const { address, openingHours, phone, website, price } = card.generalInfo;
  return (
    <div className="max-w-[680px] text-[14px] leading-[1.45] text-[#171717] md:text-[18px]">
      <div className="mb-10 space-y-6">
        <p className="flex items-center gap-5">
          <InfoIcon type="pin" />
          <span>{address}</span>
        </p>
        {openingHours && (
          <p className="flex items-center gap-5">
            <InfoIcon type="clock" />
            <span>{openingHours}</span>
          </p>
        )}
        {phone && (
          <p className="flex items-center gap-5">
            <InfoIcon type="phone" />
            <a href={`tel:${phone}`} className="hover:underline">
              {phone}
            </a>
          </p>
        )}
        {website && (
          <p className="flex items-center gap-5">
            <InfoIcon type="web" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {website}
            </a>
          </p>
        )}
      </div>
      {/* TODO: Events реализовать по контракту */}
      {/*<p className="mb-6">*/}
      {/*  <strong>Что проходит:</strong> экскурсии, выставки.*/}
      {/*</p>*/}
      <p>
        <strong>Стоимость:</strong> {price || 'уточнять на официальном сайте.'}
      </p>
    </div>
  );
};

export const FactsSection: FC<SectionProps> = ({ card }) => (
  <ul className="max-w-[720px] list-disc space-y-5 pl-5 text-[14px] leading-[1.35] text-[#171717] md:text-[18px]">
    {card.facts?.map((fact) => (
      <li key={fact} dangerouslySetInnerHTML={html(fact)} />
    ))}
  </ul>
);

export const HistorySection: FC<SectionProps> = ({ card }) => {
  const { items = [], quote } = card.history ?? {};
  return (
    <div className="max-w-[720px] text-[14px] leading-[1.35] text-[#171717] md:text-[18px]">
      {quote && <blockquote className="mb-8 border-l-2 border-[#217EA6] pl-5 italic">{quote}</blockquote>}
      <div className="space-y-5">
        {items.map((paragraph) => (
          <p key={paragraph} dangerouslySetInnerHTML={html(paragraph)} />
        ))}
      </div>
    </div>
  );
};

export const LegendsSection: FC<SectionProps> = ({ card }) => (
  <div className="max-w-[720px] space-y-5 text-[14px] leading-[1.45] text-[#171717] md:text-[18px]">
    {card.legends?.map((legend) => (
      <p key={legend} dangerouslySetInnerHTML={html(legend)} />
    ))}
  </div>
);

export const VideoToursSection: FC<SectionProps> = ({ card }) => (
  <div className="space-y-9">
    {card.videoTours?.map((url, index) => (
      <div className="w-full" key={`${url}-${index}`}>
        <h3 className="mb-4 text-[14px] font-normal text-[#171717] md:text-[16px]">Часть {index + 1}</h3>
        <iframe
          width="720"
          height="405"
          src={toRutubeEmbedUrl(url)}
          allow="clipboard-write; autoplay"
          allowFullScreen
        ></iframe>
      </div>
    ))}
  </div>
);

export const AudioGuidesSection: FC<SectionProps> = ({ card }) => (
  <div className="space-y-9">
    {card.audioGuides?.map((url, index) => (
      <Audio key={`${url}-${index}`} src={url} />
    ))}
  </div>
);

// TODO: разобраться с подгрузкой файлов - вставка через url с интернета не работает, пропускает только файлы из проекта
export const GallerySection: FC<SectionProps> = ({ card }) => {
  const { gallery = [], generalInfo } = card;
  return <Gallery images={gallery.map((url, index) => ({ url, alt: `${generalInfo.title} — фото ${index + 1}` }))} />;
};

export const MapSection: FC<SectionProps> = ({ card }) => <YandexMap location={card.map} />;
