import { ReactNode } from 'react';
import classes from './MessagePopup.module.css';

interface MessagePopupProps {
  children: ReactNode;
  isOpen: boolean;
  closePopup?: () => void;
}
function MessagePopup({ children, isOpen, closePopup }: MessagePopupProps) {
  return (
    <div className={`${classes.popup} ${isOpen && classes.open}`}>
      {children}
    </div>
  );
}

export default MessagePopup;
