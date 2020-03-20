const CREATE_CHAT = 'CREATE_CHAT';
const FETCH_CHAT = 'FETCH_CHAT';
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

export default (state = initState, action) => {
  console.log(action.payload, 'from the chat reducer');
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [action.payload.topic]: [
          ...state[action.payload.topic],
          action.payload.from,
          action.payload.msg
        ]
      };
    case CREATE_CHAT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case FETCH_CHAT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    default:
      return state;
  }
};
