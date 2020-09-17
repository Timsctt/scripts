import styled, { StyledComponent } from '@emotion/styled';
import React, { ReactNode } from 'react';
import { prop } from 'styled-tools';

import TockTheme from '../../styles/theme';

const MessageContainer: StyledComponent<
  unknown,
  unknown,
  TockTheme
> = styled.div`
  width: 100%;
  max-width: ${prop<any>('theme.sizing.conversation.width')};
  margin: 0.5em auto;
  text-align: right;
`;

const Message: StyledComponent<unknown, unknown, TockTheme> = styled.div`
  display: inline-block;
  background: rgb(106, 166, 23) none repeat scroll 0% 0%;
  color: white;
  padding: 0.5em 1.5em;
  margin: 0 1em;
  border-radius: ${prop<any>('theme.sizing.borderRadius')};
  border-bottom-right-radius: 0;

  ${prop<any>('theme.overrides.messageUser', '')}
`;

type Props = {
  children: ReactNode;
};

const MessageUser: ({ children }: Props) => JSX.Element = ({
  children,
}: Props) => {
  return (
    <MessageContainer>
      <Message>{children}</Message>
    </MessageContainer>
  );
};

export default MessageUser;
