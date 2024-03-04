const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://192.168.8.206:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
	origin: "http://192.168.8.206:3000",
}
));

const MongoConnector = require('./MongoConnector');
MongoConnector.init();
async function run(userId) {
  try {
	console.log(userId);
    // You can insert into another collection as needed
    const chats = await MongoConnector.getChatsByParticipantId('chats', userId);
    // const messageData = {
    //     "chatId": "65dca3d20aa1bf5ee4392244",
    //     "sender": "65dca3490aa1bf5ee4392241",
    //     "text": "Привет! Нормально, у тебя как?",
    //     "createdAt": "2024-02-26T14:45:00.305Z"
    //   };
    //   await MongoConnector.insertMessage('messages', messageData);
    const page = 1; // Example page number
    const limit = 15; // Example limit of documents per page
    // const messages = await MongoConnector.getMessagesByChatId('messages', "65dca3d20aa1bf5ee4392244", page, limit);
    // console.log(JSON.stringify(messages));
    console.log(chats);
	return chats;
    // await MongoConnector.insertIntoCollection('anotherCollection', { b: 2 });
  } catch (error) {
    console.error('Error running the MongoDB operations:', error);
	// return null;
  } finally {
  }
}
async function getMessageMongo(chatId,page,limit) {
	try {
	  
	  // You can insert into another collection as needed
	  const messages = await MongoConnector.getMessagesByChatId('messages', chatId,page,limit);
	  console.log(messages);
	  return messages;
	  // await MongoConnector.insertIntoCollection('anotherCollection', { b: 2 });
	} catch (error) {
	  console.error('Error running the MongoDB operations:', error);
	  // return null;
	} finally {
	}
  }
  
// run().catch(console.error);
app.get("/api/chatsbyuserId/:userId", (req, res) => {
    const userId = req.params.userId;
	
    // Используйте userId для получения чатов пользователя
   run(userId).then(items=>res.json(items));
});

app.post("/api/chat/messages", (req, res) => {
	console.log(req);
    const chatId = req.body.chatId;
	const page = req.body.page;
	const limit = req.body.limit;
	
    // Используйте userId для получения чатов пользователя
	getMessageMongo(chatId,page,limit).then(items=>res.json(items));
});

async function SetMongoDbUserToUser(user){
	try {
		// You can insert into another collection as needed
		const mongoUser = await MongoConnector.insertOrGetUser(user);
		
		console.log(mongoUser);
		return mongoUser;
	  } catch (error) {
		console.error('Error running the MongoDB operations:', error);
		// return null;
	  } finally {
	  }
}
const generateID = () => Math.random().toString(36).substring(2, 10);
let ConnectedUsersInMoment = [];


socketIO.on("connection",  (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('userConnected',  (user) => {
		console.log(`⚡: ${socket.id} user just connected!`);
		console.log(user);
		 SetMongoDbUserToUser(user).then(item=>{socket.emit("chatUser",item)});
		// socketIO.sockets.socket(socket.id).emit(user);
	
    });
  
    socket.on('disconnect', () => {
		ConnectedUsersInMoment = ConnectedUsersInMoment.filter(user => user.socketId !== socket.id);
		socketIO.emit('onlineUsers', ConnectedUsersInMoment);
    });
	
	socket.on("createRoom", (name) => {
		socket.join(name);
		chatRooms.unshift({ id: generateID(), name, messages: [] });
		socket.emit("roomsList", chatRooms);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		// console.log(chatRooms);
		socket.emit("foundRoom", result[0].messages);
		// console.log("Messages Form", result[0].messages);
	});

	socket.on("newMessage", (data) => {
		const { room_id, message, user, timestamp } = data;
		let result = chatRooms.filter((room) => room.id == room_id);
		const newMessage = {
			id: generateID(),
			text: message,
			user,
			time: `${timestamp.hour}:${timestamp.mins}`,
		};
		console.log("New Message", newMessage);
		socket.to(result[0].name).emit("roomMessage", newMessage);
		result[0].messages.push(newMessage);

		socket.emit("roomsList", chatRooms);
		socket.emit("foundRoom", result[0].messages);
	});
	socket.on("join-chat",(data)=>{
		console.log("chatJoined",data)
			socket.join(data.chatId);	
	})
	socket.on("messageSend",(data)=>{
		console.log("messagedSender",data);
		MongoConnector.insertMessage("messages",{chatId:data.chatId,sender:data.userId,text:data.message}).then(items=>{
				console.log("suka",items)
				console.log(data);
				socketIO.to(data.chatId).emit("message",items)
		})
		
	})
});

app.get("/api", (req, res) => {
	res.json(chatRooms);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});