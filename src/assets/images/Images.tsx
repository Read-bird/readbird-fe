import { SyntheticEvent, memo, useCallback } from 'react';
import styled, { CSSObject } from 'styled-components';

type TProps = {
  imgUrl?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgStyle?: CSSObject;
};

export const Images = memo(({ imgUrl, imgAlt, imgWidth, imgHeight, imgStyle }: TProps) => {
  const handleError = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = require('/src/assets/images/noImage.jpeg');
  }, []);

  return (
    <ImageStyle
      $imgStyle={imgStyle}
      src={imgUrl ?? ''}
      alt={imgAlt}
      width={imgWidth}
      height={imgHeight}
      onError={handleError}
    />
  );
});

type TImageProps = {
  $imgStyle?: CSSObject;
};

export const ImageStyle = styled.img<TImageProps>`
  font-size: 13px;
  ${({ $imgStyle }) => $imgStyle};
`;
