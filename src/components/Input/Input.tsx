import { useState } from 'react';
import classes from './Input.module.css';

interface InputProps {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onClick: () => void;
  className: string;
  disabled: boolean;
  type: React.HTMLInputTypeAttribute;
}

// The border will change according to whether or not the user has submitted the value
// in order to prevent confusion when submiting a mass and changing the value.
// and then changing the year again only for a serach to happen on the last submitted.
// value instead of the written value. ANother UX solution would probably be better.
// But I believe int his case it will suffice.
const borderStateToClass = {
  empty: '',
  submitted: classes.submitted,
  changed: classes.changed
};

function Input({
  placeholder,
  value,
  setValue,
  onClick,
  className,
  disabled,
  type
}: InputProps) {
  const [borderState, setBorderState] = useState<
    'empty' | 'submitted' | 'changed'
  >('empty');
  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setBorderState('changed');
    setValue(event.target.value);
  };

  const onBtnClick = () => {
    setBorderState('submitted');
    onClick();
  };

  return (
    <div
      className={`${classes.container} ${className} ${borderStateToClass[borderState]}`}
    >
      <input
        type={type}
        className={classes.input}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      <button
        disabled={disabled}
        className={classes.btn}
        onClick={onBtnClick}
      />
    </div>
  );
}

export default Input;
