import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CTX } from '../../reducers/chatReducer';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '50px',
    width: '30%',
    height: '100%',
    float: 'left',
    '@media (max-width: 727px)': {
      width: '80%'
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  //1238x727
  chatWindow: {
    width: '70%',
    height: '450px',
    padding: '20px'
  },
  chatBox: { width: '85%', maxHeight: '100%' },
  button: { width: '15%' },
  chatSend: {
    marginLeft: '50px',
    marginBottom: '40px',
    padding: theme.spacing(3, 2),
    width: '30%',
    height: 'auto',
    float: 'left',
    '@media (max-width: 727px)': {
      width: '80%'
    },
    '@media (max-width: 1238x)': {
      clear: 'both'
    }
  }
}));

export default function SimplePaper() {
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const topics = Object.keys(allChats);
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState('');

  const classes = useStyles();

  return (
    <div>
      <Paper
        className={classes.root}
        style={{ maxHeight: '100%', overflowY: 'scroll' }}
      >
        <Typography variant='h5' component='h5' style={{ padding: '20px' }}>
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} />
                <Typography variant='p'>{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>
      </Paper>
      <div style={{ clear: 'both' }}>
        <Paper className={classes.chatSend}>
          <div className={classes.flex}>
            <TextField
              className={classes.chatBox}
              value={textValue}
              onChange={e => changeTextValue(e.target.value)}
              label='Send a chat'
            />

            <Button
              variant='contained'
              color='Primary'
              onClick={() => {
                sendChatAction({
                  from: user,
                  msg: textValue,
                  topic: activeTopic
                });
                changeTextValue('');
              }}
            >
              Send
            </Button>
          </div>
        </Paper>{' '}
      </div>
    </div>
  );
}
