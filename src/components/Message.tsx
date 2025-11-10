import { memo } from 'react';

export type MessageProps = {
  text: string;
  sent: boolean;
};

const Message = ({ text, sent }: MessageProps) => {
  return <div className={`message ${sent ? "sent" : ""}`}>{text}</div>;
};

export default memo(Message);


