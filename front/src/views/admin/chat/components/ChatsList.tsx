import Card from "components/card";
import React, { useContext, useEffect, useState } from "react";
import { FaEthereum } from "react-icons/fa";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import ChatContext from "./context/ChatContext";
import { $chatApi } from "http/chatAxios";
import { Chat } from "types/types";
import AddChatModal from "./modal/AddModal";
import { CircularProgress, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChartIcon from "components/icons/WidgetIcon/ChartIcon";
export default function ChatsList() {
  const { currentChat, selectChat, chatUser } = useContext(ChatContext);
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const response = await $chatApi.get(`/chatsbyuserId/${chatUser._id}`);
      console.log(response);
      if (response != null && response.data != null) {
        setChats(response.data);
      }
      setIsLoading(false);
    };

    if (chatUser) {
      fetch();
    }
    console.log(chatUser);
    console.log(chats);
  }, [chatUser]);

  const [openChatModal, setChatModal] = useState(false);
  return (
    <>
      <Card extra={"mt-3 !z-5 overflow-hidden p-4"}>
        {/* HistoryCard Header */}
        <div className="flex items-center justify-between rounded-t-3xl p-5">
          <div className="text-2xl font-bold text-navy-700 dark:text-white">
            Chats
          </div>
          <IconButton
            onClick={() => setChatModal(true)}
            aria-label="add new chat"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div
          className=" flex flex-col  gap-2 overflow-y-auto overflow-x-hidden"
          style={{
            maxHeight: "40rem",
          }}
        >
          {chats.map((item) => (
            <div
              onClick={() => selectChat(item)}
              
              className="
   
        "
            >
              <Card
              style={{
                backgroundColor:
                  currentChat && currentChat._id === item._id ? "#422afb" : "",
              }}
                extra={`!flex-row flex-grow items-center rounded-[20px] px-5
                   cursor-pointer 
                 rounded-2xl bg-white  shadow-3xl shadow-shadow-500 transition-colors duration-300 ease-in-out hover:bg-brand-400 dark:!bg-navy-700 dark:shadow-none
                `}
              >
                <div className="ml-3">
                  <ChartIcon />
                </div>

                <div className="h-50 ml-1 mr-5 flex w-full flex-col  p-6">
                  <div className="text-lg font-bold">{item.name}</div>
                  <div className="text-sm">
                    {item.lastMessage != undefined &&
                    item.lastMessage.length > 0 ? (
                      <div className="flex">
                        <div>{item.lastMessage[0].username}:</div>
                        <div className="truncate">
                          {item.lastMessage[0].text}
                        </div>
                      </div>
                    ) : (
                      <>No messages</>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Card>
      <AddChatModal
        open={openChatModal}
        handleClose={() => setChatModal(false)}
      />
    </>
  );
}
