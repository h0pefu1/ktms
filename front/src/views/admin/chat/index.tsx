import React, { useEffect } from 'react'
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
function ChatPage() {
  const ENDPOINT = "http://127.0.0.1:4000";
  const {user} = useSelector((state:RootState)=>state);
  useEffect(()=>{
      const socket = socketIOClient(ENDPOINT,{reconnectionAttempts:2});
      socket.emit('userConnected', user.person);
      socket.on('onlineUsers', (users: any[]) => {
        console.log(users);
        console.log(users.filter(u=>u.id != user.person.id));
      
      });
      
      return () => {
        socket.disconnect();
      };

  },[])

  return (
    <ChatProvider>
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        <div className="col-span-1 h-full w-full  2xl:col-span-1">
        <ChatsList />
      </div>
      <div className="col-span-1 h-full w-full xl:col-span-1 2xl:col-span-2">
      <Chat />
        </div>
    </div>
    </ChatProvider>
  )
}

export default ChatPage