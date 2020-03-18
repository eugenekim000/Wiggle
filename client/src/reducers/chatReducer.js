import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();

const initState = {
  general: [
    { from: 'aaron', msg: 'hey' },
    { from: 'aaron1', msg: 'hey1' },
    { from: 'aaron2', msg: 'hey2' }
  ],
  topic2: [
    { from: 'aaron', msg: 'hey' },
    { from: 'aaron4', msg: 'hey7' },
    { from: 'aaron5', msg: 'hey7' }
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

  const user = 'Erwin' + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
