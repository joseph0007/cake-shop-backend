const Redis = require('ioredis');

async function main() {
  // Use connect method to connect to the server
  clientConn = new Redis();
  console.log('Connected successfully to redis server');

  return clientConn;
}

exports.redisClient = main;