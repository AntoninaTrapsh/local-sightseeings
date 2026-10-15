'use client';

import { FC, useEffect, useState } from "react";
import { isYandexDiskUrl, resolveYandexDiskUrl } from '@/shared/utils/resolveYandexDiskUrl';

interface AudioProps {
  src: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  className?: string;
}

export const Audio:FC<AudioProps> = ({
  src,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  preload = 'metadata',
  className,
}) => {
  const [resolved, setResolved] = useState<{ from: string; url: string }>();
  const resolvedSrc = isYandexDiskUrl(src) ? (resolved?.from === src ? resolved.url : undefined) : src;

  useEffect(() => {
    if (!isYandexDiskUrl(src)) return;
    let cancelled = false;
    resolveYandexDiskUrl(src)
      .then((url) => !cancelled && setResolved({ from: src, url }))
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <audio
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      preload={preload}
      className={className}
      src={resolvedSrc}
    >
      Ваш браузер не поддерживает аудио элемент.
    </audio>
  );
};
