import {useState, createContext, useContext, JSX} from 'react'
import {io, Socket} from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null;
  connectSocket: () => void;
}

type SocketProviderProps = {
  children: JSX.Element
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const SocketProvider = ({children}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = () => {
    if(!socket) {
      const newSocket: Socket = io("http://localhost:3001")
      setSocket(newSocket)
      return
    }
    socket.connect()
  }

  return (
    <SocketContext.Provider value={{socket, connectSocket}}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext)
  if(!context) {
    throw new Error('Something went wrong!')
  }
  return context
}