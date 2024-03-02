import Card from 'components/card';
import React, { useContext, useEffect, useState } from 'react'
import { FaEthereum } from 'react-icons/fa';
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import ChatContext from './context/ChatContext';
import { $chatApi } from 'http/chatAxios';
export default function ChatsList() {
  const {currentChat,selectChat} = useContext(ChatContext);
  const HistoryData = [
    {
      image: Nft1,
      title: "Colorful Heaven",
      owner: "Mark Benjamin",
      price: 0.4,
      time: "30s",
    },
    {
      image: Nft2,
      title: "Abstract Colors",
      owner: "Esthera Jackson",
      price: 2.4,
      time: "50m",
    },
    {
      image: Nft3,
      title: "ETH AI Brain",
      owner: "Nick Wilson",
      price: 0.3,
      time: "20s",
    },
    {
      image: Nft4,
      title: "Swipe Circles",
      owner: " Peter Will",
      price: 0.4,
      time: "4h",
    },
    {
      image: Nft5,
      title: "Mesh Gradients",
      owner: "Will Smith",
      price: 0.4,
      time: "30s",
    },
    {
      image: Nft6,
      title: "3D Cubes Art",
      owner: " Manny Gates",
      price: 0.4,
      time: "2m",
    },
  ];
  const[chats,setChats] = useState([]);
  useEffect(()=>{
    const fetch = async()=>{
      const response = await $chatApi.get("/chatsbyuserId/65dca3490aa1bf5ee4392240");
      console.log(response);
      if(response != null && response.data != null){
        setChats(response.data);
      }
    }
    fetch();
  },[])

  useEffect(()=>{
    console.log(currentChat)
  },[currentChat])
  return (
    <Card extra={"mt-3 !z-5 overflow-hidden p-4"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-5">
        <div className="text-2xl font-bold text-navy-700 dark:text-white">
          ChatList
        </div>
      </div>

      {/* History CardData */}

      {chats.length > 0 && chats.map((data, index) => (
        <div 
        onClick={()=>selectChat(data._id)}
        style={{
          backgroundColor:currentChat === data._id ?"#422afb" : ""
        }}
        className="
        transition-colors duration-300 ease-in-out hover:bg-brand-400 cursor-pointer
        mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center">
              {/* <img
                className="h-full w-full rounded-xl"
                src={data.image}
                alt=""
              /> */}
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {" "}
                {data.name}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {" "}
                Last Message from someone...
              </p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
