import { useEffect, useRef, useState } from 'react';
import classes from './AutoComplete.module.css';

interface AutoCompleteProps {
  possibleValues: Array<string>;
  selectValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  className: string;
}

function AutoComplete({
  possibleValues,
  selectValue,
  value,
  className
}: AutoCompleteProps) {
  const [text, setText] = useState<string>('');
  const [suggestValues, setSuggestValues] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setText(e.target.value);
    setSuggestValues(!!e.target.value);

    if (!e.target.value) {
      selectValue('');
    }
  };

  const chooseItem = (newValue: string) => {
    setText(newValue);
    selectValue(newValue);
    setSuggestValues(false);
  };

  const shownValues = possibleValues.filter(item => item.startsWith(text));

  return (
    <div className={`${classes.autocomplete} ${className}`}>
      <input
        ref={inputRef}
        value={text}
        onChange={onValueChange}
        type='text'
        placeholder='Year...'
      />
      {suggestValues && (
        <ul className={classes.list}>
          {shownValues.map(item => (
            <li
              className={classes.item}
              key={item}
              onClick={() => {
                chooseItem(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
