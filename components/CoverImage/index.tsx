import { FC } from 'react';
import Image, { getImageProps, ImageProps } from 'next/image';

export const MOBILE_MEDIA = '(max-width: 767px)';

type CoverImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  mobileSrc?: string;
};

export const CoverImage: FC<CoverImageProps> = ({ src, mobileSrc, alt, ...imageProps }) => {
  if (!mobileSrc) {
    return <Image {...imageProps} src={src} alt={alt} />;
  }

  const { props } = getImageProps({ ...imageProps, src, alt });
  const { props: mobileProps } = getImageProps({ ...imageProps, src: mobileSrc, alt });

  return (
    <picture className="contents">
      <source media={MOBILE_MEDIA} srcSet={mobileProps.srcSet} sizes={mobileProps.sizes} />
      <img {...props} alt={alt} />
    </picture>
  );
};
