import { Dispatch, useCallback } from 'react';
import {
  Button,
  Card,
  CalendarGraphCard,
  Carousel,
  Message,
  PostBackButton,
  QuickReply,
  TockAction,
  TockState,
  UrlButton,
  UrlButtonGraphLogin,
  useTockDispatch,
  useTockState,
  Widget,
  WidgetData,
} from './TockContext';
import { Sse } from './Sse';
import AccessToken, { checkLogin, getAccessToken } from './AccessToken';

export interface IUseTock {
  messages: (Message | Card | CalendarGraphCard | Carousel | Widget)[];
  quickReplies: QuickReply[];
  loading: boolean;
  loadMessages: () => void;
  addMessage: (
    message: string,
    author: 'bot' | 'user',
    buttons?: Button[],
  ) => void;
  sendMessage: (message: string) => Promise<void>;
  addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: { label: string; url?: string }[],
  ) => void;
  addCalendarGraphCard: (
    subject?: string,
    bodyPreview?: string,
    start?: string,
    end?: string,
    location?: string,
  ) => void;
  addCarousel: (cards: Card[]) => void;
  addWidget: (widgetData: WidgetData) => void;
  setQuickReplies: (quickReplies: QuickReply[]) => void;
  sendQuickReply: (label: string, payload?: string) => Promise<void>;
  sendAction: (button: Button) => Promise<void>;
  sendReferralParameter: (referralParameter: string) => void;
  sseInitPromise: Promise<void>;
  sseInitializing: boolean;
}

function mapButton(button: any): Button {
  if (button.type === 'web_url') {
    return new UrlButton(button.title, button.url);
  } else if (button.type === 'postback') {
    return new PostBackButton(button.title, button.payload);
  } else if (button.type === 'quick_reply') {
    return new QuickReply(button.title, button.payload);
  } else if (button.type === 'login') {
    return new UrlButtonGraphLogin(button.title, button.url);
  } else {
    return new UrlButton(button.title, button.url);
  }
}

function mapCard(card: any): Card {
  return {
    title: card.title,
    subTitle: card.subTitle,
    imageUrl: card.file ? card.file.url : null,
    buttons: card.buttons.map((button: any) => mapButton(button)),
    type: 'card',
  } as Card;
}

function mapCalendarGraphCard(calendarGraphCard: any): CalendarGraphCard {
  return {
    subject: calendarGraphCard.subject,
    bodyPreview: calendarGraphCard.bodyPreview,
    organizer: calendarGraphCard.bodyPreview,
    start: calendarGraphCard.start,
    end: calendarGraphCard.end,
    location: calendarGraphCard.location,
    type: 'calendarGraphCard',
  } as CalendarGraphCard;
}

// class UseTock implements IUseTock {
  
//   private tockEndPoint: string;
  
//   constructor(tockEndPoint: string) {
//     this.tockEndPoint = tockEndPoint;
//   }

// }
const UseTock: (tockEndPoint: string) => IUseTock = (tockEndPoint: string) => {
  const {
    messages,
    quickReplies,
    userId,
    codeUser = checkLogin(),
    loading,
    sseInitializing,
  }: TockState = useTockState();

  const dispatch: Dispatch<TockAction> = useTockDispatch();

  const endpointMessage: string = "http://localhost:3001/messages";

  const startLoading: () => void = () => {
    dispatch({
      type: 'SET_LOADING',
      loading: true,
    });
  };

  if (codeUser) {
    getAccessToken()
  }
  /* function startLoading() {
    dispatch({
      type: 'SET_LOADING',
      loading: true,
    });
  } */

  const stopLoading: () => void = () => {
    dispatch({
      type: 'SET_LOADING',
      loading: false,
    });
  };


  const loadMessages: () => void = () => {
    fetch(endpointMessage + "/" + userId)
    .then(responses => responses.json())
    .then(function(responses) {

      responses.reverse().forEach(responses => {
        if(responses["responses"].length > 0 ) {
          const lastMessage: any = responses["responses"][responses["responses"].length - 1];
          dispatch({
            type: 'ADD_MESSAGE',
            messages: responses["responses"].map(({ text, card, calendarGraphCard, carousel, widget }: any) => {
              if (widget) {
                return {
                  widgetData: widget,
                  type: 'widget',
                };
              } else if (text) {
                return {
                  author: 'bot',
                  message: text,
                  type: 'message',
                  buttons: (lastMessage.buttons || [])
                    .filter((button: any) => button.type !== 'quick_reply')
                    .map(mapButton),
                } as Message;
              } else if (card) {
                return mapCard(card);
              } else if (calendarGraphCard) {
                return mapCalendarGraphCard(calendarGraphCard);
              } else {
                if (carousel.cards[0].subject != null) {
                  return {
                    cards: carousel.cards.map(mapCalendarGraphCard),
                    type: 'carousel',
                  } as Carousel;
                } else {
                  return {
                    cards: carousel.cards.map(mapCard),
                    type: 'carousel',
                  } as Carousel;
                }
              }
            }),
          })
        } else {
          dispatch({
            type: 'ADD_MESSAGE',
            messages: [{
              author: 'user',
              message: responses["message"]["content"],
              type: 'message',
            } as Message]
          })
        } // end else
      }) // end forEach
    }) // end then()
  }

  const handleBotResponse: (botResponse: any) => void = ({
    responses,
  }: any) => {
      const lastMessage: any = responses[responses.length - 1];
      if (lastMessage.buttons && lastMessage.buttons.length > 0) {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: (lastMessage.buttons || [])
            .filter((button: any) => button.type === 'quick_reply')
            .map(mapButton),
        });
      } else {
        dispatch({
          type: 'SET_QUICKREPLIES',
          quickReplies: [],
        });
      }

      dispatch({
        type: 'ADD_MESSAGE',
        messages: responses.map(
          ({ text, card, calendarGraphCard, carousel, widget }: any) => {
            if (widget) {
              return {
                widgetData: widget,
                type: 'widget',
              };
            } else if (text) {
              return {
                author: 'bot',
                message: text,
                type: 'message',
                buttons: (lastMessage.buttons || [])
                  .filter((button: any) => button.type !== 'quick_reply')
                  .map(mapButton),
              } as Message;
            } else if (card) {
              return mapCard(card);
            } else if (calendarGraphCard) {
              return mapCalendarGraphCard(calendarGraphCard);
            } else {
              if (carousel.cards[0].subject != null) {
                return {
                  cards: carousel.cards.map(mapCalendarGraphCard),
                  type: 'carousel',
                } as Carousel;
              } else {
                return {
                  cards: carousel.cards.map(mapCard),
                  type: 'carousel',
                } as Carousel;
              }
            }
          },
        ),
      });
  };

  const handleBotResponseIfSseDisabled: (botResponse: any) => void = (
    botResponse: any,
  ) => {
    if (!Sse.isEnable()) {
      handleBotResponse(botResponse);
    
      //adding the owner of the responsebot
      //Send the data to the database
      botResponse["owner"] = userId
      doFetchPost(endpointMessage, botResponse)
    }
  };

  const addMessage: (
    message: string,
    author: 'bot' | 'user',
    buttons?: Button[],
  ) => void = useCallback(
    (message: string, author: 'bot' | 'user', buttons?: Button[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [{ author, message, type: 'message', buttons }],
      }),
    [],
  );
  
  const sendMessage: (
    message: string,
    payload?: string,
  ) => Promise<void> = useCallback((message: string, payload?: string) => {
    dispatch({
      type: 'ADD_MESSAGE',
      messages: [{ author: 'user', message, type: 'message' }],
    });
    startLoading();
    const body = payload
      ? {
        payload,
        userId,
      }
      : {
        query: message,
        userId,
        code: AccessToken.accessToken
      };
    const msg: Object = {
      message: {
        type: "text",
        content: body.query,
      },
      owner: body.userId,
      datetime: new Date(),
    }

    doFetchPost(endpointMessage, msg, payload).then(response => response.text());
    return doFetchPost(
      tockEndPoint,
      body,
      payload)
      .then((res) => res.json())
      .then(handleBotResponseIfSseDisabled)
      .finally(stopLoading);
  }, []);

  const sendReferralParameter: (referralParameter: string) => void = useCallback((referralParameter: string) => {
    startLoading();

    const msg: Object = {
        ref: referralParameter,
        userId,
      }
      
    doFetchPost(endpointMessage, msg)
    .then((res) => res.json())
      .then(handleBotResponseIfSseDisabled)
      .finally(stopLoading);
  }, []);

  const sendQuickReply: (label: string, payload?: string) => Promise<void> = (
    label: string,
    payload?: string,
  ) => {
    if (payload) {
      setQuickReplies([]);
      addMessage(label, 'user');
      startLoading();

      let body = {
        payload,
        userId,
      }

      return doFetchPost(tockEndPoint, body)
        .then((res) => res.json())
        .then(handleBotResponseIfSseDisabled)
        .finally(stopLoading);
    } else {
      return sendMessage(label);
    }
  };

  const sendAction: (button: Button) => Promise<void> = (button: Button) => {
    if (button instanceof UrlButton) {
      window.open(button.url, '_blank');
    } else if (button instanceof UrlButtonGraphLogin) {
      // Open popup for user login
      getAccessToken()
      console.log(AccessToken.accessToken)
    } else {
      return sendMessage(button.label, button.payload);
    }
    return Promise.resolve();
  };

  /**
   * Method doFetchPost permise using one method to send post 
   * @param endpoint mandatory
   * @param body data to be sent
   * @param payload optional
   * @returns Promise<Response>
   */
  const doFetchPost: (
    endpoint: string, 
    body: Object, 
    payload?: string,
  ) => Promise<Response> = useCallback((endpoint: string, body: Object, payload?: string) => {
    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }, []);

  const addCard: (
    title: string,
    imageUrl?: string,
    subTitle?: string,
    buttons?: Button[],
  ) => void = useCallback(
    (title: string, imageUrl?: string, subTitle?: string, buttons?: Button[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            title,
            imageUrl,
            subTitle,
            buttons,
            type: 'card',
          },
        ],
      }),
    [],
  );

  const addCalendarGraphCard: (
    subject?: string,
    bodyPreview?: string,
    start?: string,
    end?: string,
    location?: string,
  ) => void = useCallback(
    (
      subject?: string,
      bodyPreview?: string,
      start?: string,
      end?: string,
      location?: string,
    ) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            subject,
            bodyPreview,
            start,
            end,
            location,
            type: 'calendarGraphCard',
          },
        ],
      }),
    [],
  );

  const addCarousel: (cards: Card[]) => void = useCallback(
    (cards: Card[]) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: 'carousel',
            cards,
          },
        ],
      }),
    [],
  );

  const addWidget: (widgetData: WidgetData) => void = useCallback(
    (widgetData: WidgetData) =>
      dispatch({
        type: 'ADD_MESSAGE',
        messages: [
          {
            type: 'widget',
            widgetData,
          },
        ],
      }),
    [],
  );

  const setQuickReplies: (quickReplies: QuickReply[]) => void = useCallback(
    (quickReplies: QuickReply[]) =>
      dispatch({
        type: 'SET_QUICKREPLIES',
        quickReplies,
      }),
    [],
  );

  const onSseStateChange: (state: number) => void = useCallback(
    (state: number) =>
      dispatch({
        type: 'SET_SSE_INITIALIZING',
        sseInitializing: state === EventSource.CONNECTING,
      }),
    [],
  );

  const sseInitPromise = Sse.init(
    tockEndPoint,
    userId,
    handleBotResponse,
    onSseStateChange,
  );

  return {
    messages,
    quickReplies,
    loading,
    addCard,
    addCalendarGraphCard,
    addCarousel,
    addMessage,
    addWidget,
    sendMessage,
    setQuickReplies,
    sendQuickReply,
    sendAction,
    sendReferralParameter,
    loadMessages,
    sseInitPromise,
    sseInitializing,
  };
};

export default UseTock;