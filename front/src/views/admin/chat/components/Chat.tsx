import Card from "components/card";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import ChatContext from "./context/ChatContext";
import { $chatApi } from "http/chatAxios";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Input } from "@mui/material";
import { useSocket } from "./context/SocketConnection";
import { IncrementChatBadges } from "store/notification/notifcationBadgesSlice";
import { useDispatch } from "react-redux";
export type HeaderProps = {
  chatName: string;
};

function Header() {
  const { currentChat } = useContext(ChatContext);
  return (
    <div className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"> */}
        </div>
        <div className="flex flex-col leading-tight">
          <div className="flex items-center text-2xl font-bold text-navy-700 dark:text-white">
            <span className="text-black mr-3">{currentChat.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function InputArea({ handleInput }: any) {
  const [message, setMessage] = useState("");
  const searchInput = useRef(null);

  const handleSubmit = useCallback(() => {
    if (message.trim() !== "") {
      handleInput(message);
      setMessage("");
    }
  }, [message, handleInput]); // handleInput should also be stable, consider wrapping it with useCallback in the parent component
  const keyDownHandler = (event:any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
  // useEffect(() => {
    

  //   // Since the handler is stable, it's safe to add and remove it without causing re-registrations
  //   document.addEventListener('keydown', keyDownHandler);
  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, [handleSubmit]);





  return (
    <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
      <div className="relative flex">
     
        <Input
          multiline
          name="messageInput"
          autoFocus
          onKeyDown={keyDownHandler}
          ref={searchInput}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          sx={{
            padding:1
          }}
          type="text"
          placeholder="Write your message!"
          className="w-full rounded-md  py-5 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
        />
        <div className="">
          <button
            onClick={handleSubmit}
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
          >
            <span className="font-bold">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-2 h-6 w-6 rotate-90 transform"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export type MessageListProps = {
  messages: any[];
  isLoading: boolean;
  fetchData: any;
  hasMore:boolean;
};
function MessageList({ messages, fetchData,hasMore }:any) {
  useEffect(()=>{
    console.log(messages);
  },[messages])
  return (
    <div
  id="scrollableDiv"
  style={{
    maxHeight: "45rem",
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  }}
>
    <InfiniteScroll
    height={500}
    inverse={true}
      dataLength={messages.length}
      style={{ display: "flex", flexDirection: "column-reverse" }}
      loader={<h4>Loading...</h4>}
      next={()=>fetchData()}
      scrollableTarget="scrollableDiv"
      hasMore={hasMore} 
    >
      {messages.map((message:any) => (
        <>
        <Message key={message.id} isOwnMessage={message.isOwnMessage} text={message.text} 
        userName={message.senderDetails} timestamp = {message.createdAt}
        
        />
        </>
      ))}
      {/* Пустой div, к которому будет выполнена прокрутка */}
    </InfiniteScroll>
    </div>
  );
}
function Message({ isOwnMessage, text,userName,timestamp }: any) {
  const messageClass = isOwnMessage
    ? "flex items-end justify-end"
    : "flex items-end";
    const messageBubbleClass = isOwnMessage
    ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white break-words"
    : "px-4 py-2 rounded-lg inline-block bg-gray-300 text-navy-700 break-words";

 
  return (
    <div className={`${messageClass} gap-2.5`}>
      {!isOwnMessage && (
        <img
          className="h-8 w-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Profile"
        />
      )}
       <div
        className={`flex w-full max-w-[320px] flex-col gap-1 ${
          isOwnMessage ? "items-end" : ""
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {userName != undefined ? userName.name : ""}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
           {moment(timestamp).format('HH:mm')}
          </span>
        </div>
        <div className={`${messageBubbleClass}`}>
          <p className="text-sm font-normal">{text}</p>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      {isOwnMessage && (
        <>
          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            data-dropdown-placement="bottom-start"
            className="inline-flex items-center self-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
          <div
            id="dropdownDots"
            className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reply
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Forward
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Copy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default function Chat({ socket1 }:any) {

  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const { currentChat, chatUser } = useContext(ChatContext);
  const [page, setPage] = useState(1);
  const limit = 7;
  const previousChat = useRef(currentChat);
 const {socket} = useSocket();
  const handleInput = (text:any) => {
    console.log(text);
    socket.emit("messageSend", {
      chatId: currentChat._id,
      message: text,
      userId: chatUser._id,
    });
  };
  
  useEffect(() => {
    if (socket && chatUser) {
      socket.on("new_message",(notification:any)=>{
        dispatch(IncrementChatBadges())
        console.log(1);
      })
      socket.on("message", (item:any) => {
        
        console.log(chatUser);
        console.log(item);
        const message = {
          sender: item[0].sender,
          text: item[0].text,
          senderDetails:item[0].senderDetails,
          isOwnMessage: item[0].sender === chatUser._id,
          chatId: item[0].chatId,
          createdAt: item[0].createdAt,
        };
        setMessages((prev) => [message,...prev]);
      });
    }
  }, [socket,chatUser]);

  const [hasMore,setHasMore] = useState(true);

  const handlePageChange = ()=>{
    console.log("ME,HERE")
    setPage(prev=>prev+1);
  }
  useEffect(() => {
    if (currentChat) {
      $chatApi.post("/chat/messages", { chatId: currentChat._id, page, limit })
        .then((response) => {
          if (response.data != null) {
            console.log(response.data);
            if(response.data.length > 0){
              setHasMore(true);
            }
            else{
              setHasMore(false);
            }
            if (previousChat.current !== currentChat) {
              
              setMessages([...response.data.map((item:any)=>{
                return {
                  sender: item.sender,
                  text: item.text,
                  senderDetails:item.senderDetails,
                  isOwnMessage: item.sender === chatUser._id,
                  chatId: item.chatId,
                  createdAt: item.createdAt,
                }
              })]);

              setPage(1);
            } else {
              setMessages((prevMessages) => [ ...prevMessages,...response.data.map((item:any)=>{
                return {
                  sender: item.sender,
                  senderDetails:item.senderDetails,
                  text: item.text,
                  isOwnMessage: item.sender === chatUser._id,
                  chatId: item.chatId,
                  createdAt: item.createdAt,
                }
              })]);
            }
            previousChat.current = currentChat; 
          }
        });
    }
  }, [currentChat, page]);

  return (
    <Card extra={"w-full  mt-3 !z-5"}
    
    >
      {currentChat ? (
           <div className="p-2 flex flex-col" style={{
            
           }}>
          <Header  />
          <MessageList messages={messages} isLoading={false} fetchData={handlePageChange} hasMore={hasMore}/>
          <InputArea handleInput={handleInput} />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center font-bold">Select chat to start conversation
        </div>
      )}
    </Card>
  );
}

