const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const MongoConnector = require('./MongoConnector');

async function run() {
  try {
  
    // You can insert into another collection as needed
    const chats = await MongoConnector.getChatsByParticipantId('chats', "65dca3490aa1bf5ee4392240");
    // const messageData = {
    //     "chatId": "65dca3d20aa1bf5ee4392244",
    //     "sender": "65dca3490aa1bf5ee4392241",
    //     "text": "Привет! Нормально, у тебя как?",
    //     "createdAt": "2024-02-26T14:45:00.305Z"
    //   };
    //   await MongoConnector.insertMessage('messages', messageData);
    const page = 1; // Example page number
    const limit = 1; // Example limit of documents per page
    const messages = await MongoConnector.getMessagesByChatId('messages', "65dca3d20aa1bf5ee4392244", page, limit);
    console.log(JSON.stringify(messages));
    console.log(chats);
    // await MongoConnector.insertIntoCollection('anotherCollection', { b: 2 });
  } catch (error) {
    console.error('Error running the MongoDB operations:', error);
  } finally {
    await MongoConnector.closeConnection();
  }
}

run().catch(console.error);


const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

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
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

app.get("/api", (req, res) => {
	res.json(chatRooms);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});