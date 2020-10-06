import React, {
  Dispatch,
  ReactNode,
  Reducer,
  useReducer,
  createContext,
  Context,
  useContext,
} from 'react';
import { retrieveUserId } from './utils';
import * as actionTypes from './actionTypes';

export const TockStateContext: Context<TockState | undefined> = createContext<
  TockState | undefined
>(undefined);

export const TockStateDispatch: Context<
  Dispatch<TockAction> | undefined
> = createContext<Dispatch<TockAction> | undefined>(undefined);

export const useTockState: () => TockState = () => {
  const state: TockState | undefined = useContext(TockStateContext);
  if (!state) {
    throw new Error('useTockState must be used in a TockContext');
  }
  return state;
};

export const useTockDispatch: () => Dispatch<TockAction> = () => {
  const dispatch: Dispatch<TockAction> | undefined = useContext(
    TockStateDispatch,
  );
  if (!dispatch) {
    throw new Error('useTockDispatch must be used in a TockContext');
  }
  return dispatch;
};

export class QuickReply {
  label: string;
  payload?: string;

  constructor(label: string, payload: string) {
    this.label = label;
    this.payload = payload;
  }
}

export class PostBackButton {
  label: string;
  payload?: string;

  constructor(label: string, payload: string) {
    this.label = label;
    this.payload = payload;
  }
}

export class UrlButton {
  label: string;
  url: string;

  constructor(label: string, url: string) {
    this.label = label;
    this.url = url;
  }
}

export class UrlButtonGraphLogin{
  label: string;
  login: string;

  constructor(label: string, login: string) {
    this.label = label;
    this.login = login;
  }
}

export type Button =
  | QuickReply
  | PostBackButton
  | UrlButton
  | UrlButtonGraphLogin;

export class SenderMail {
  name: string;
  address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }
}

export class RecipientsMail {
  name: string;
  address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }
}

export interface Message {
  author: 'bot' | 'user';
  message: string;
  type: 'message';
  buttons?: Button[];
}

export interface Card {
  imageUrl?: string;
  title: string;
  subTitle?: string;
  buttons?: Button[];
  type: 'card';
}

// Graph
export interface CalendarGraphCard {
  subject?: string;
  bodyPreview?: string;
  organizer?: string;
  start?: string;
  end?: string;
  location?: string;
  type: 'calendarGraphCard';
}

export interface ProfileGraph {
  displayName?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  surname?: string;
  userPrincipalName?: string;
}

export interface MailGraph {
  subject?: string;
  bodyPreview?: string;
  sender?: SenderMail;
  toRecipients: RecipientsMail;
}

export interface Carousel {
  cards: (Card | CalendarGraphCard)[];
  type: 'carousel';
}

export interface Widget {
  widgetData: WidgetData;
  type: 'widget';
}

export interface WidgetData {
  data: any;
  type: string;
}

export interface BehaviorState {
  showChat: boolean;
}

export interface TockState {
  quickReplies: QuickReply[];
  messages: (Message | Card | CalendarGraphCard | Carousel | Widget)[];
  userId: string;
  codeUser?: boolean;
  loading: boolean;
  sseInitializing: boolean;
  behavior: BehaviorState;
}

export interface TockAction {
  type:
    | 'SET_QUICKREPLIES'
    | 'ADD_MESSAGE'
    | 'SET_LOADING'
    | 'SET_SSE_INITIALIZING'
  quickReplies?: QuickReply[];
  messages?: (Message | Card | CalendarGraphCard | Carousel | Widget)[];
  loading?: boolean;
  sseInitializing?: boolean;
}

export const tockReducer: Reducer<TockState, TockAction> = (
  state: TockState,
  action: TockAction,
): TockState => {
  switch (action.type) {
    case 'SET_QUICKREPLIES':
      if (action.quickReplies) {
        return {
          ...state,
          quickReplies: action.quickReplies,
        };
      }
      break;
    case 'ADD_MESSAGE':
      if (action.messages) {
        return {
          ...state,
          messages: [...state.messages, ...action.messages],
        };
      }
      break;
    case 'SET_LOADING':
      if (action.loading != undefined) {
        return {
          ...state,
          loading: action.loading,
        };
      }
      break;
    case 'SET_SSE_INITIALIZING':
      if (action.sseInitializing != undefined) {
        return {
          ...state,
          sseInitializing: action.sseInitializing,
        };
      }
      break;
    default:
      break;
  }
  return state;
};

const TockContext: (props: { children?: ReactNode }) => JSX.Element = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [state, dispatch]: [TockState, Dispatch<TockAction>] = useReducer(
    tockReducer,
    {
      quickReplies: [],
      messages: [],
      userId: retrieveUserId(),
      loading: true,
      sseInitializing: false,
      behavior: {
        showChat: true,
      },
    
    },

  );
  return (
    <TockStateContext.Provider value={state}>
      <TockStateDispatch.Provider value={dispatch}>
        {children}
      </TockStateDispatch.Provider>
    </TockStateContext.Provider>
    )
  }


export default TockContext;