import React from "react";
import socketIOClient from 'socket.io-client';
const ENDPOINT = "http://192.168.100.26:4000";
export const socket =  socketIOClient(ENDPOINT,{reconnectionAttempts:2});
export const SocketContext = React.createContext(null);

export const SocketProvider =({children}:any)=>{
        return(
            <SocketContext.Provider value={socket}>
                        {children}
            </SocketContext.Provider>
        )
}