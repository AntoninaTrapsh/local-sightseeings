'use client';
// TODO: если перевести fetch на серверный компонент (убрать 'use client'), можно удалить
// useEffect/useState для data и fetching — Next.js App Router поддерживает async page компоненты.
// 'use client' тогда останется только у интерактивных частей (навигация по секциям).
import { useEffect, useMemo, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { ICardResponse } from '@/api/card';
import { getMockCard } from '../_data';
import { SectionContent } from './SectionContent';
import { SECTION_CONFIG, SectionId } from './constants';
import { NavButton } from './NavButton';
import { Loader } from '@/components/Loader';
import { CoverImage } from '@/components/CoverImage';

export default function SightseeingDetailPage() {
  const [active, setActive] = useState<SectionId>('info');

  const { id } = useParams<{ id: string }>()

  const [data, setData] = useState<ICardResponse>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
 
    // TODO: если оставляем на клиенте, то fetch-логику лучше вынести в кастомный хук useSightDetail(id) —
    // компонент не должен знать о деталях получения данных.
    
    new Promise<ICardResponse | undefined>((res) => {
      setFetching(true);
      setTimeout(() => {
        // TODO: при подключении бэкенда заменить на реальный fetch по id из ICardRequest { id: string }
        res(getMockCard(id));
      }, 2000);
    })
      .then((received) => {
        setData(received);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [id]);

 const sections = useMemo(
  () => data ? SECTION_CONFIG.filter((section) => section.show(data)) : [],
  [data]
);

  // TODO: в Next.js App Router состояние загрузки вроде можно вынести в файл loading.tsx рядом с page.tsx —
  // фреймворк подхватит его автоматически и уберёт необходимость в ручном if (fetching).
  if (fetching) {
    return (
      <article className="bg-background flex min-h-[70vh]">
        <Loader fullHeight />
      </article>
    );
  }

  if (!data) {
    notFound();
  }

  const { title, imageUrl, imageUrlMobile } = data.generalInfo;

  return (
    <article className="min-h-screen bg-background">
      <section className="w-full">
        <CoverImage
          src={imageUrl}
          mobileSrc={imageUrlMobile}
          alt={title}
          width={1600}
          height={900}
          sizes="100vw"
          className="h-[407px] w-full object-cover object-[32%_50%] md:h-[360px] md:object-[50%_50%] lg:h-[620px]"
        />
      </section>
      <section className="container mx-auto max-w-[1440px] px-5 pb-24 pt-8 md:px-8 md:pt-14 lg:pb-28">
        <h1 className="mb-8 max-w-[1060px] text-[28px] font-semibold leading-[1.15] text-[#0B1215] md:mb-12 md:text-[54px] lg:text-[64px]">
          {title}
        </h1>
        <div className="hidden grid-cols-[260px_minmax(0,1fr)] gap-20 md:grid lg:grid-cols-[300px_minmax(0,1fr)]">
          <nav className="flex flex-col items-start gap-7">
            {sections.map((section) => (
              <NavButton
                key={section.id}
                label={section.label}
                isActive={active === section.id}
                onClick={() => setActive(section.id)}
                className="text-[20px] lg:text-[24px]"
              />
            ))}
          </nav>
          <div className="pt-1">
            <SectionContent active={active} card={data} />
          </div>
        </div>
        <div className="md:hidden">
          <div className="space-y-7">
            {sections.map((section) => (
              <section key={section.id}>
                <NavButton
                  label={section.label}
                  isActive={active === section.id}
                  onClick={() => setActive(section.id)}
                  className="text-[16px]"
                />
                {active === section.id && (
                  <div className="mt-5">
                    {/* TODO: SectionContent сейчас рендерится отдельно в десктопе и мобайле.
                        На мобилках он рендерится внутри каждого section.map — при смене active
                        предыдущий контент размонтируется, а новый монтируется заново.
                        Можно вынести один <SectionContent> ниже списка и управлять видимостью через CSS,
                        чтобы избежать лишних mount/unmount. */}
                    <SectionContent active={active} card={data} />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
