import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import streamsReducer from './streamReducer';
import chatReducer from './chat2Reducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamsReducer,
  chats: chatReducer
});
