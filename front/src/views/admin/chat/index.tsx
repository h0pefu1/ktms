import React, { useContext, useEffect, useRef, useState } from 'react'
import tableDataTopCreators from '../marketplace/variables/tableDataTopCreators'
import HistoryCard from '../marketplace/components/HistoryCard'
import General from '../profile/components/General'
import Chat from './components/Chat'
import ChatsList from './components/ChatsList'
import { ChatProvider } from './components/context/ChatContextProvider'
import socketIOClient from 'socket.io-client';
import { IPerson } from 'types/types'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import ChatContext from './components/context/ChatContext'
import { SocketProvider } from './components/context/SocketConnection'



function ChatWrapper(){
  const ENDPOINT = "http://192.168.100.26:4000";
  const {user} = useSelector((state:RootState)=>state);
const {chatUser,setChatUser,currentChat} = useContext(ChatContext);
const socketRef = useRef(null)
  useEffect(()=>{
    socketRef.current = socketIOClient(ENDPOINT,{reconnectionAttempts:2});
    socketRef.current.emit('userConnected', user);
    socketRef.current.on("chatUser",(item:any)=>{
        setChatUser(item);
      })
    
      return () => {
        socketRef.current.disconnect();
      };

  },[])
  useEffect(()=>{
    if(chatUser && currentChat){
    socketRef.current.emit("join-chat",{userId:chatUser._id,chatId:currentChat._id});
  }
  },[,chatUser,currentChat])
    return(
      <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-full w-full  2xl:col-span-1">
      <ChatsList />
    </div>
    <div className="col-span-1 h-full w-full xl:col-span-1 2xl:col-span-2">
    <Chat socket={socketRef}/>
      </div>
  </div>
  
    )
}
function ChatPage() {
 

  return (
    <ChatProvider>
      <ChatWrapper/>
 </ChatProvider>
  )
}

export default ChatPage