const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  // Use connect method to connect to the server
  clientConn = await client.connect();
  console.log('Connected successfully to server');

  return clientConn;
}

exports.mongoClient = main;