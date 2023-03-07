import { MessageBubble, SolidButton, TextInput } from 'components/lib';
import React, { useEffect, useState } from 'react';

import { Fade } from '@material-ui/core';
import { addNote, addTaskNote } from 'store/actions/matterActions';
import { useDispatch, useSelector } from 'react-redux';
import dateChecker from 'functions/dateChecker';
import moment from 'moment';
import notesStyles from './notes.styles';

const Notes = ({ matterId }) => {
  const [message, setMessage] = useState('');
  const [submit, setSubmit] = useState(false);
  const classes = notesStyles();
  const notesRef = React.createRef();

  useEffect(() => {
    if (submit) {
      if (objectType === 'matter') {
        addNote(matterId, message, user, moment().format('MMMM Do, h:mma'));
      } else {
        addTaskNote(matterId, message, user, moment().format('MMMM Do, h:mma'));
      }
      setMessage('');
      setSubmit(false);
    }
  }, [submit]);

  useEffect(() => {
    scrollToBottom();
  }, [matterId]);

  const onClickHandler = () => {
    if (message.length) {
      setSubmit(true);
    }
    return;
  };

  const scrollToBottom = () => {
    notesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const notesSelector = () => {
    return notes.map(note => {
      if (note.user === user) {
        return (
          <div
            className={classes.bubbleContainer}
            style={{ justifyContent: 'flex-end' }}
          >
            <MessageBubble
              key={currentMatter.id}
              user={'You'}
              time={`${dateChecker(note.date, moment().format('MMMM Do'))}`}
            >
              {note.note}
            </MessageBubble>
          </div>
        );
      } else {
        return (
          <div
            className={classes.bubbleContainer}
            style={{ justifyContent: 'flex-start' }}
          >
            <MessageBubble
              key={currentMatter.id}
              user={note.user}
              time={dateChecker(note.date, moment().format('MMMM Do'))}
            >
              {note.note}
            </MessageBubble>
          </div>
        );
      }
    });
  };

  return (
    <Fade in={true}>
      <div className={classes.root}>
        <div className={readOnly ? !classes.notesChatReadOnly : classes.notesChat}>
          {currentMatter && notes ? notesSelector() : null}
        </div>
        { !readOnly ?
        <div className={classes.SubmissionContainer}>
          <div className={classes.text}>
            <TextInput
              large={true}
              value={message}
              setValue={e => setMessage(e.target.value)}
            />
          </div>
          <div className={classes.button}>
            <SolidButton onClick={onClickHandler}>Save</SolidButton>
          </div>
        </div>
        : null }
      </div>
    </Fade>
  );
};

Notes.defaultProps = {
  matterId: 0,
  currentMatter: null,
  notes: [],
  user: '',
  readOnly: false,
  objectType: 'matter',
};

const mapStateToProps = state => {
  if (state.matters.currentMatter !== null) {
    return {
      currentMatter: state.matters.currentMatter,
      notes: state.matters.currentMatter.field_notes,
      user: `${state.user.firstName} ${state.user.lastName}`,
    };
  } else if (state.tasks.currentTask !== null) {
    return {
      currentMatter: state.tasks.currentTask,
      notes: state.tasks.currentTask.task_notes,
      user: `${state.user.firstName} ${state.user.lastName}`,
    };
  }
  return {};
};

export default connect(mapStateToProps, { addNote, addTaskNote })(Notes);
