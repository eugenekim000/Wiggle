import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

const initState = {
  general: [
    { from: 'user', msg: 'hey' },
    { from: 'user2', msg: 'hey1' },
    { from: 'user3', msg: 'hey2' }
  ],
  topic2: [
    { from: 'user4', msg: 'hey' },
    { from: 'user5', msg: 'hey7' },
    { from: 'user6', msg: 'hey7' }
  ]
};

const CREATE_CHAT = 'CREATE_CHAT';
function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    case CREATE_CHAT: {
      return {
        ...state,
        [action.payload.id]: [...state[topic], { from, msg }]
      };
    }
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit('chat message', value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);

  if (!socket) {
    socket = io(':3002');
    socket.on('chat message', function(msg) {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    });
  }

  const user = 'User' + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
