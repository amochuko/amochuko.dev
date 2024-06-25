'use client';
import { useState } from 'react';
import MessageList from './message-list';

type NewMessageFormProps = {
  onSend?: (arg: string) => void;
};

export default function NewMessageForm(props: NewMessageFormProps) {
  const [messages, setMessages] = useState<string[]>([]);

  const [inputTxt, setInputTxt] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTxt(e.target.value);
  };

  const sendMsg = (str: string) => {
    setMessages([...messages, str])
  }

  const handleSend = () => {
    sendMsg(inputTxt);
    setInputTxt('');
  };

  return (
    <>
      <label htmlFor="message-txt">
        Message
        <input
          id="message-txt"
          type="text"
          name="message-txt"
          onChange={handleChange}
          value={inputTxt}
        />
      </label>
      <br />
      <button name="send-btn" onClick={handleSend}>
        Send
      </button>

      {messages.length > 0 && <MessageList data={messages} />}
    </>
  );
}
