import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//chip
import Chip from '@material-ui/core/Chip';

//button
import Button from '@material-ui/core/Button';

//text field
import TextField from '@material-ui/core/TextField';

import { CTX } from './store';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey'
  },
  chatWindow: { width: '70%', height: '300px', padding: '20px' },
  chatBox: { width: '85%' },
  button: { width: '15%' }
}));

export default function SimplePaper() {
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  console.log(allChats);

  const topics = Object.keys(allChats);

  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState('');

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant='h4' component='h4'>
          Chat app
        </Typography>
        <Typography variant='h5' component='h5'>
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem
                  onClick={e => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip label={chat.from} />
                <Typography variant='p'>{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>
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
      </Paper>
    </div>
  );
}
