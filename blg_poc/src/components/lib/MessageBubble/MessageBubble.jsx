import React from 'react';
import messageBubbleStyles from './messageBubble.styles';

const MessageBubble = ({ time, user, children }) => {
  const classes = messageBubbleStyles();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        {user} / {time}
      </div>
      <div
        className={`${classes.bubble} ${
          user === 'You' ? classes.youBubble : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

MessageBubble.defaultProps = {
  time: '',
  user: '',
};

export default MessageBubble;
