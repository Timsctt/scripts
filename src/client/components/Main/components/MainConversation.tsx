import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
} from 'react';

import TockTheme from '../../../styles/theme';

const MainContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  scroll-behavior: smooth;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  height: 510px;
  max-height: 50vh;
`;

const MainConversation: (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => JSX.Element = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const container: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { children, ...restProps }: typeof props = props;

  useEffect(() => {
    if (container.current) {
      const scroll = () => {
        if (container.current) {
          container.current.scrollTop = container.current.scrollHeight;
        }
      };
      scroll();
      const images: NodeListOf<HTMLImageElement> = container.current.querySelectorAll(
        'img',
      );
      images.forEach((img: HTMLImageElement) => {
        if (!img.onload) {
          img.onload = scroll;
        }
      });
    }
  });

  return (
    <MainContainer ref={container} {...restProps}>
      {children}
    </MainContainer>
  );
};

export default MainConversation;
