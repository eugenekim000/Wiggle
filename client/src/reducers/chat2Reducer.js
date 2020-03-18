const CREATE_CHAT = 'CREATE_CHAT';
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
    default:
      return state;
  }
};
