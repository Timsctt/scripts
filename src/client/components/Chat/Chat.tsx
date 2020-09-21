import {
  Card,
  Carousel,
  Message,
  QuickReply,
  Widget,
  CalendarGraphCard,
} from '../../useTock/TockContext';
import { useTock, UseTock } from '../../useTock/rollup';
import CardComponent from '../Card';
import CarouselComponent from '../Carousel';
import ChatInput from '../ChatInput';
import Conversation from '../Conversation';
import MessageBot from '../MessageBot';
import MessageUser from '../MessageUser';
import QR from '../QuickReply';
import QuickReplyList from '../QuickReplyList';
import Loader from '../Loader';
import DefaultWidget from '../widgets/DefaultWidget';
import CalendarGraphCardComponent from '../CalendarGraphCard';

import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState
} from 'react';
import TockTheme from '../../styles/theme';
import styled, { StyledComponent } from '@emotion/styled';
import { prop } from 'styled-tools';
import MainConversation from '../Main/components/MainConversation';
import Launcher from '../Launcher';

export interface ChatProps {
  endPoint: string;
  referralParameter?: string;
  timeoutBetweenMessage?: number;
  widgets?: any;
}

export const ChatApp: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 1%;
  bottom: 1%;

  ${prop<any>('theme.overrides.card.cardContainer', '')};
`;

export const Container: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 2px 10px 1px #b5b5b5;
  width: 20em;
  position: fixed;
  right: 1%;
  bottom: 1%;
  max-height: 60%;
  min-height: 430px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  background-color: white;

  ${prop<any>('theme.overrides.card.cardContainer', '')};
`;

export const SenderContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  align-items: center;
  display: flex;
  background-color: #f4f7f9;
  min-height: 30px;
  padding: 15px 5px;
`;

export const MainContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
`;

export const HeaderContainer: StyledComponent<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  unknown,
  TockTheme
> = styled.div`
  background-color: #6aa617;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-shadow: -5px 2px 19px -4px black;
  min-height: 55px;
  font-family: 'Inter', sans-serif;
  position: relative;
  z-index: 1;
  .#{$namespace}avatar {
    all: initial;
    height: 31px;
    width: 31px;
    position: absolute;
    top: 12px;
    left: 14px;
  }
`;

const Chat: (props: ChatProps) => JSX.Element = ({
  endPoint,
  referralParameter,
  timeoutBetweenMessage = 700,
  widgets = {},
}: ChatProps) => {
  const {
    messages,
    quickReplies,
    loading,
    sendMessage,
    sendQuickReply,
    sendAction,
    sendReferralParameter,
    loadMessages,
    sseInitPromise,
    sseInitializing,
  }: UseTock = useTock(endPoint);
  const [displayableMessageCount, setDisplayableMessageCount] = useState(0);

  useEffect(() => {
    if (referralParameter) {
      loadMessages()
      sseInitPromise.then(() => sendReferralParameter(referralParameter));
    }
  }, [sendReferralParameter, referralParameter]);

  useEffect(() => {
    if (messages.length > displayableMessageCount) {
      setTimeout(() => {
        setDisplayableMessageCount(displayableMessageCount + 1);
      }, timeoutBetweenMessage);
    }
  }, [messages, displayableMessageCount]);

  return (
    <div className="class">
      <ChatApp>
        <Container>
          <HeaderContainer>Chatbot MGEN</HeaderContainer>
          <MainConversation>
            <Conversation className="conversation">
              {messages
                .slice(0, displayableMessageCount)
                .map(
                  (
                    message:
                      | Message
                      | Card
                      | CalendarGraphCard
                      | Carousel
                      | Widget,
                    i: number,
                  ) => {
                    if (message.type === 'widget') {
                      const WidgetComponent =
                        widgets[message.widgetData.type] || DefaultWidget;
                      return (
                        <WidgetComponent key={i} {...message.widgetData.data} />
                      );
                    } else if (message.type === 'message') {
                      return message.author === 'bot' ? (
                        <MessageBot
                          key={i}
                          message={message}
                          sendAction={sendAction}
                        />
                      ) : (
                          <MessageUser key={i}>{message.message}</MessageUser>
                        );
                    } else if (message.type === 'card') {
                      return (
                        <CardComponent
                          sendAction={sendAction}
                          key={i}
                          {...message}
                        />
                      );
                    } else if (message.type === 'carousel') {
                      return (
                        <CarouselComponent key={i}>
                          {message.cards.map(
                            (card: Card | CalendarGraphCard, ic: number) =>
                              card.type == 'card' ? (
                                <CardComponent
                                  sendAction={sendAction}
                                  key={ic}
                                  {...card}
                                />
                              ) : (
                                  <CalendarGraphCardComponent
                                    key={ic}
                                    {...card}
                                  />
                                ),
                          )}
                        </CarouselComponent>
                      );
                    }
                    return null;
                  },
                )}
              {loading && <Loader />}
            </Conversation>
          </MainConversation>
          <footer>
            {displayableMessageCount === messages.length && (
              <QuickReplyList>
                {quickReplies.map((qr: QuickReply, i: number) => (
                  <QR
                    key={i}
                    onClick={sendQuickReply.bind(null, qr.label, qr.payload)}
                  >
                    {qr.label}
                  </QR>
                ))}
              </QuickReplyList>
            )}
            <SenderContainer>
              <ChatInput disabled={sseInitializing} onSubmit={sendMessage} />
            </SenderContainer>
          </footer>
        </Container>
        <Launcher
          openLabel="conversation opened"
          closeLabel="conversation closed"
        />
      </ChatApp>
    </div>
  );
};

export default Chat;
