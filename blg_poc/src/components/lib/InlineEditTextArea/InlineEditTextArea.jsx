import React, { useState, useRef, useEffect } from 'react';
import { useOnClickOutside, useKeypress } from 'hooks';

const InlineEditTextArea = ({ value = '', onChange, renderEmpty }) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [localVal, setLocalVal] = useState(value);
  const textRef = useRef(null);
  const inputRef = useRef(null);
  const esc = useKeypress('Escape');

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  useEffect(() => {
    if (isInputActive) {
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setLocalVal(value);
        setIsInputActive(false);
      }
    }
  }, [esc]); // watch the Enter and Escape key presses

  useOnClickOutside(inputRef, () => {
    if (isInputActive) {
      onChange(localVal);
      setIsInputActive(false);
    }
  });

  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  let renderValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  let viewProps = {
    ref: textRef,
    onClick: e => {
      e.stopPropagation();
      setIsInputActive(true);
    },
    className: `inline-text_copy inline-text_copy--${
      !isInputActive ? 'active' : 'hidden'
    }`,
  };

  return (
    <>
      <span className="inline-text multiline">
        {renderValue.length ? (
          <div {...viewProps}>{renderValue}</div>
        ) : (
          <div {...viewProps}>{renderEmpty()}</div>
        )}
      </span>

      <textarea
        onClick={e => {
          e.stopPropagation();
        }}
        ref={inputRef}
        table={true}
        rows={6}
        value={localVal}
        onChange={({ target }) => setLocalVal(target.value)}
        className={`multiline-text inline-text_input inline-text_input--${
          isInputActive ? 'active' : 'hidden'
        }`}
      />
    </>
  );
};

InlineEditTextArea.defaultProps = {
  renderEmpty: () => <span>-</span>,
};

export default InlineEditTextArea;
