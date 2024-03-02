import Card from 'components/card'
import React, { useEffect, useState } from 'react'

export type HeaderProps={
  chatName:string
}

function Header({chatName}:HeaderProps) {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    <div className="relative flex items-center space-x-4">
       <div className="relative">
        
       {/* <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"> */}
       </div>
       <div className="flex flex-col leading-tight">
          <div className="text-2xl font-bold text-navy-700 dark:text-white flex items-center">
             <span className="text-black mr-3">{chatName}</span>
          </div>
       </div>
    </div>
  
 </div>
  );
}
function InputArea() {
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    <div className="relative flex">
       <span className="absolute inset-y-0 flex items-center">
          <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
             </svg>
          </button>
       </span>
       <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
       <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
             </svg>
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
             </svg>
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
             </svg>
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
             <span className="font-bold">Send</span>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
             </svg>
          </button>
       </div>
    </div>
 </div>
  );
}

export type MessageListProps={
  messages:any[]
}
function MessageList({messages}:MessageListProps) {



  return (
    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch" style={{ maxHeight: '500px' }}>
      {messages.map(message => (
        <Message key={message.id} isOwnMessage={message.isOwnMessage} text={message.text} />
      ))}
    </div>
  );
}
function Message({ isOwnMessage, text }:any) {
  const messageClass = isOwnMessage
  ? "flex items-end justify-end"
  : "flex items-end";
const messageBubbleClass = isOwnMessage
  ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
  : "px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600";

return (
  <div className={`${messageClass} gap-2.5`}>
    {!isOwnMessage && <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Profile" />}
    <div className={`flex flex-col gap-1 w-full max-w-[320px] ${isOwnMessage ? 'items-end' : ''}`}>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <div className={`${messageBubbleClass}`}>
        <p className="text-sm font-normal">{text}</p>
      </div>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
    </div>
    {isOwnMessage && (
      <>
      <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
        </svg>
      </button>
         <div id="dropdownDots" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
         <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
           </li>
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
           </li>
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
           </li>
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
           </li>
           <li>
             <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
           </li>
         </ul>
       </div>
       </>
    )}
  </div>
);
}
export default function Chat() {
  const [messages,setMessages] = useState([]);


  useEffect(()=>{
    
  },[])
  
  return (



    <Card extra={"w-full h-full mt-3 !z-5 overflow-hidden"}>
<div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen ">
      <Header chatName={"test"} />
      <MessageList messages={messages} />
      <InputArea />
    </div>
  </Card>
  )
}
