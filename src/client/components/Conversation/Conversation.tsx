import styled, { StyledComponent } from '@emotion/styled';
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject,
  useRef,
} from 'react';

import TockTheme from '../../styles/theme';

const ConversationContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  scroll-behavior: smooth;
  height: 100%;
  font-size: 16px;
`;

const Conversation: (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => JSX.Element = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const container: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const { children, ...restProps }: typeof props = props;

  return (
    <ConversationContainer ref={container} {...restProps}>
      {children}
    </ConversationContainer>
  );
};

export default Conversation;
