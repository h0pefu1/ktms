import Card from "components/card";
import React, { useCallback, useContext, useEffect, useState } from "react";
import ChatContext from "./context/ChatContext";

export type HeaderProps = {
  chatName: string;
};

function Header({ chatName }: HeaderProps) {
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
function InputArea({handleInput}:any) {
  const [message,setMessage] = useState("");
    useEffect(()=>{
        console.log(message);

    },[message])
  const handleSubmit=()=>{
    handleInput(message);
    setMessage("");
  }
  return (
    <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
      <div className="relative flex">
        <span className="absolute inset-y-0 flex items-center">
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
        </span>
        <input
        onChange={(e)=>setMessage(e.target.value)}
        value={message}
          type="text"
          placeholder="Write your message!"
          className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
        />
        <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
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
};
function MessageList({ messages }: MessageListProps) {
  return (
    <div
      id="messages"
      className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      style={{ maxHeight: "500px" }}
    >
      {messages.map((message) => (
        <Message
          key={message.id}
          isOwnMessage={message.isOwnMessage}
          text={message.text}
        />
      ))}
    </div>
  );
}
function Message({ isOwnMessage, text }: any) {
  const messageClass = isOwnMessage
    ? "flex items-end justify-end"
    : "flex items-end";
  const messageBubbleClass = isOwnMessage
    ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
    : "px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600";

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
            Bonnie Green
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
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
export default function Chat({socket}:any) {
  const [messages, setMessages] = useState([]);
  const { currentChat,chatUser } = useContext(ChatContext);
  
  const handleInput = (text:string)=>{
    console.log(text);
      socket.current.emit("messageSend",{chatId:currentChat._id,message:text,userId:chatUser._id})
  }
   useEffect(()=>{
    console.log(socket);
    if(socket.current){
      socket.current.on("message",(data:any)=>{
        console.log(data);
      })
    }
   
      return () => {
        socket.current.disconnect();
      };
   },[])


  // useEffect(() => {
  //     return () => {
  //       socket.current.disconnect();
  //     };

  // }, []);

  return (
    <Card extra={"w-full h-full mt-3 !z-5 overflow-hidden"}>
      {currentChat ? (
        <div className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6 ">
          <Header chatName={"test"} />
          <MessageList messages={messages} />
          <InputArea handleInput={handleInput}/>
        </div>
      )
    :(
      <div>
        Select Chat
      </div>
    )
    }
    </Card>
  );
}
