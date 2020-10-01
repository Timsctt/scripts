import * as actionTypes from '../useTock/actionTypes';

//import storeParams from 'useTock'

export default function (
  inputTextFieldHint,
  docViewer = false,
  action = actionTypes
) {
    /*
    const initialState = {
        connected: false,
        initialized: false,
        isChatVisible: true,
        isChatOpen: false,
        disabledInput: true,
        docViewer,
        inputTextFieldHint,
        connectingText,
        unreadCount: 0,
        messageDelayed: false,
    );
    */
    
    /*
    switch(action.type) {
      // Each change to the redux store's behavior Map gets recorded to storage
      case actionTypes.TOGGLE_CHAT: {
        this.setState({
            showChat: !this.state.showChat
          });
        return false;
      }
      */

      /*
      case actionTypes.SHOW_CHAT: {
        if (onWidgetEvent.onChatVisible) onWidgetEvent.onChatVisible();
        return storeParams(state.update('isChatVisible', () => true));
      }
      case actionTypes.HIDE_CHAT: {
        if (onWidgetEvent.onChatHidden) onWidgetEvent.onChatHidden();
        return storeParams(state.update('isChatVisible', () => false));
      }
      case actionTypes.TOGGLE_CHAT: {
        if (state.get('isChatOpen', false) && onWidgetEvent.onChatClose) {
          onWidgetEvent.onChatClose();
        } else if (onWidgetEvent.onChatOpen) {
          onWidgetEvent.onChatOpen();
        }

        return storeParams(state.update('isChatOpen', isChatOpen => !isChatOpen).set('unreadCount', 0));
      }
      case actionTypes.OPEN_CHAT: {
        if (onWidgetEvent.onChatOpen) onWidgetEvent.onChatOpen();
        return storeParams(state.update('isChatOpen', () => true).set('unreadCount', 0));
      }
      case actionTypes.CLOSE_CHAT: {
        if (onWidgetEvent.onChatClose) onWidgetEvent.onChatClose();
        return storeParams(state.update('isChatOpen', () => false));
      }
      case actionTypes.TOGGLE_FULLSCREEN: {
        if (onWidgetEvent.onChatFullScreen) onWidgetEvent.onChatFullScreen();
        return storeParams(state.update('fullScreenMode', fullScreenMode => !fullScreenMode));
      }
      case actionTypes.TOGGLE_INPUT_DISABLED: {
        const disable = action.disable;
        if (disable !== undefined && disable !== null) {
          return storeParams(state.update('disabledInput', () => disable));
        }

        return storeParams(state.update('disabledInput', disabledInput => !disabledInput));
      }
      case actionTypes.CHANGE_INPUT_FIELD_HINT: {
        return storeParams(state.set('inputTextFieldHint', action.hint));
      }
      case actionTypes.CONNECT: {
        return storeParams(state.set('connected', true).set('disabledInput', false));
      }
      case actionTypes.DISCONNECT: {
        return storeParams(state.set('connected', false).set('disabledInput', true));
      }
      case actionTypes.INITIALIZE: {
        return storeParams(state.set('initialized', true));
      }
      case actionTypes.NEW_UNREAD_MESSAGE: {
        return storeParams(state.set('unreadCount', state.get('unreadCount', 0) + 1));
      }
      case actionTypes.TRIGGER_MESSAGE_DELAY: {
        return storeParams(state.set('messageDelayed', action.messageDelayed));
      }
      case actionTypes.SET_PAGECHANGE_CALLBACKS: {
        return storeParams(state.set('pageChangeCallbacks', fromJS(action.pageChangeCallbacks)));
      }
      */

}
