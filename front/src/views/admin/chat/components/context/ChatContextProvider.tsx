import React, { useState, useContext } from 'react';
import ChatContext from './ChatContext';

export const ChatProvider = ({ children }:any) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [chatUser,setChatUser] = useState(null);
  const selectChat = (chatId:any) => {
    setCurrentChat(chatId);
  };

  return (
    <ChatContext.Provider value={{ currentChat, selectChat,chatUser,setChatUser }}>
      {children}
    </ChatContext.Provider>
  );
  
};