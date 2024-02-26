const { MongoClient } = require('mongodb');

class MongoConnector {
    static client = new MongoClient('mongodb://localhost:27017');
    static dbName = 'chatdb';
  
    static async connect() {
        console.log('Connected successfully to MongoDB server');
      return this.client.db(this.dbName);
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
  
    static async closeConnection() {
        await this.client.close();
        console.log('MongoDB connection closed');
    }
  }
  
  module.exports = MongoConnector;