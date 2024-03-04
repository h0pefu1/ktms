const { MongoClient,ObjectId  } = require('mongodb');

class MongoConnector {
    static client = new MongoClient('mongodb://localhost:27017');
    static dbName = 'chatdb';
    static db;
    static async init() {
       this.db = await this.client.connect();
    }
    static async connect() {
      return this.db.db('chatdb')
  }
    static async insertIntoCollection(collectionName, document) {
      try {
        const db = await this.connect();
        const collection = db.collection(collectionName);
        const insertResult = await collection.insertOne(document);
        console.log('Insert result:', insertResult);
        return insertResult;
      } catch (error) {
        console.error('Error inserting document:', error);
      }
    }

    static async getChatsByParticipantId(collectionName, participantId) {
      try {
        const db = await this.connect();
        const collection = db.collection(collectionName);
        // Query to find chats with the participantId in the participants array
        const pipeline = [
          {
            $match: {
              participants: { $in: [new ObjectId(participantId)] } // Фильтрация чатов по участнику
            }
          },
          {
            $lookup: {
              from: 'users', // Название коллекции, с которой нужно выполнить "join"
              localField: 'participants', // Поле в текущей коллекции
              foreignField: '_id', // Поле в коллекции, с которой делаем "join"
              as: 'participantDetails' // Название нового поля, в котором будут храниться данные об участниках
            }
          }
        ];
  
        const chats = await collection.aggregate(pipeline).toArray();
        // console.log(JSON.stringify(chats, null, 2));
        return chats;
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }


    static async insertOrGetUser(user){
      const db = await this.connect();
      const collection = db.collection("users");
      const filter = { email: user.person.email }; 

      const update = {
          $setOnInsert: { email: user.person.email, name:user.person.firstName +" " +user.person.lastName,
             person_id:user.person.id
            },
      };

      // Options to return the new document and upsert
      const options = { new: true, upsert: true,returnDocument: "after",returnNewDocument:true };

      // Find one document and update it or insert it if it doesn't exist
      const result = await collection.findOneAndUpdate(filter, update, options);
      console.log(result);
      return result;
      // Output the result
    }
    static async getMessagesByChatId(collectionName, chatId, page = 1, limit = 10) {
      try {
        const db = await this.connect();
        const collection = db.collection(collectionName);
    
        const chatObjectId = typeof chatId === 'string' ? new ObjectId(chatId) : chatId;
    
        const skip = (page - 1) * limit;
    
        const messages = await collection.aggregate([
          {
            $match: { chatId: chatObjectId }
          },
          {
            $lookup: {
              from: "users",
              localField: "sender",
              foreignField: "_id",
              as: "senderDetails"
            }
          },
          {
            $unwind: "$senderDetails"
          },
          {
            $sort: { createdAt: -1 }
          },
          {
            $skip: skip
          },
          {
            $limit: limit
          }
        ]).toArray();
    
        console.log('Found messages:', messages);
        console.log(JSON.stringify(messages, null, 2));
        return messages;
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }


    static async insertMessage(collectionName, messageData) {
      try {
        const db = await this.connect();
        const collection = db.collection(collectionName);
        // Преобразование chatId и sender в ObjectId
        messageData.chatId = new ObjectId(messageData.chatId);
        messageData.sender = new ObjectId(messageData.sender);
        // Добавление поля createdAt, если его нет
        if (!messageData.createdAt) {
          messageData.createdAt = new Date();
        } else {
          // Преобразование строки в дату, если она представлена строкой
          messageData.createdAt = new Date(messageData.createdAt);
        }
        const result = await collection.insertOne(messageData); // Вставляем запись
        const insertedId = result.insertedId; // Получаем ID только что вставленной записи
        const res = await collection.aggregate([
          {
            $match: { _id: insertedId }
          },
          {
            $lookup: {
              from: "users",
              localField: "sender",
              foreignField: "_id",
              as: "senderDetails"
            }
          },
          {
            $unwind: "$senderDetails"
          },
        ]).toArray(); // Находим запись по ID и подтягиваем данные о отправителе
        return res[0]; // Возвращаем первый элемент массива, который должен содержать только одно сообщение
      } catch (error) {
        console.error('Error inserting message:', error);
      }
    }
  



    static async closeConnection() {
        await this.client.close();
        console.log('MongoDB connection closed');
    }
  }
  
  module.exports = MongoConnector;