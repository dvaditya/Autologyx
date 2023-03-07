import React, { useState, useEffect, useRef } from 'react';
import { useKeypress, useOnClickOutside } from 'hooks';

const InlineEdit = ({ onSetText, text, renderText, type }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  const castType = () => (type === 'number' ? +inputValue : inputValue);

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      onSetText(castType());
      setIsInputActive(false);
    }
  });

  // If text is updated, then we should capture this
  useEffect(() => {
    setInputValue(text);
  }, [text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        onSetText(castType());
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(text);
        setIsInputActive(false);
      }
    }
  }, [enter, esc]); // watch the Enter and Escape key presses

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={e => {
          e.stopPropagation();
          setIsInputActive(true);
        }}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? 'active' : 'hidden'
        }`}
      >
        {renderText(text)}
      </span>
      <input
        ref={inputRef}
        type={type}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        style={{ width: Math.ceil(inputValue.length * 0.9) + 3 + 'ex' }}
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
        className={`inline-text_input inline-text_input--${
          isInputActive ? 'active' : 'hidden'
        }`}
      />
    </span>
  );
};

InlineEdit.defaultProps = {
  renderText: text => text,
  type: 'text',
  text: '',
  onSetText: () => true,
};
export default InlineEdit;
