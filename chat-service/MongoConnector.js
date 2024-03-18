const { MongoClient,ObjectId  } = require('mongodb');

class MongoConnector {
    static client = new MongoClient('mongodb://localhost:27017/');
    static dbName = 'KTMSChatDb';
    static db;
    static async init() {
       this.db = await this.client.connect();
    }
    static async connect() {
      return this.db.db('KTMSChatDb')
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

        const pipeline = [
          {
            $match: {
              participants: { $in: [new ObjectId(participantId)] } // Filtering chats by participant
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'participants',
              foreignField: '_id',
              as: 'participantDetails'
            }
          },
          {
            $lookup: {
              from: 'messages',
              let: { chatId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$chatId', '$$chatId'] } // Match messages where the chatId equals the chat's _id
                  }
                },
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                {
                  $lookup: {
                    from: 'users', 
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'senderDetails'
                  }
                },
                {
                  $project: {
                    _id: 1,
                    chatId: 1,
                    sender: 1,
                    text: 1,
                    createdAt: 1,
                    username: { $arrayElemAt: ["$senderDetails.name", 0] } // Flatten to get the userName of the sender
                  }
                }
              ],
              as: 'lastMessage'
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


    static async insertNewChat(chatName,persons){
      try {
        const db = await this.connect();
        const collection = db.collection("chats");
        // Query to find chats with the participantId in the participants array
        console.log(persons)
      const pipeline = [
        {
          $match: {
            person_id: { $in: persons } // Фильтрация чатов по участнику
          }
        },
      ];

      const chatPersons = await db.collection("users").aggregate(pipeline).toArray();
     if(chatName === ""){
        chatName = chatPersons.map(item=>item.name).split(",");
     }
      const chat =  { name:chatName,
        participants:chatPersons.map(item=>new ObjectId(item._id)),
        createdAt:new Date()
        }
      const result = await collection.insertOne(chat);
        console.log("inserted",result);
        const search = await collection.findOne({_id:result.insertedId})
        console.log(search);
        return search;
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
        messageData.chatId = new ObjectId(messageData.chatId);
        messageData.sender = new ObjectId(messageData.sender);
        if (!messageData.createdAt) {
          messageData.createdAt = new Date();
        } else {
          messageData.createdAt = new Date(messageData.createdAt);
        }
        const result = await collection.insertOne(messageData); 
        const insertedId = result.insertedId;
           
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
      {
        $lookup: {
          from: "chats",
          let: { chatId: "$chatId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$chatId"] } } },
            { $project: { participants: 1 } }
          ],
          as: "chatDetails"
        }
      },
      {
        $unwind: "$chatDetails"
      },
      {
        $addFields: {
          participants: "$chatDetails.participants"
        }
      },
      {
        $project: {
          chatDetails: 0 
        }
      }
    ]).toArray();
        return res; // Возвращаем первый элемент массива, который должен содержать только одно сообщение
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