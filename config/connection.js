const { mongoClient } = require('./mongo');
const { redisClient } = require('./redis');

class Connections {
    static connections = new Map();

    static async mongoConnection() {
        let mongoConnection = Connections.connections.get('mongo');
        if( mongoConnection ){
            return mongoConnection;
        }

        mongoConnection = await mongoClient();
        Connections.connections.set('mongo', mongoConnection);

        return mongoConnection;
    }

    static async redisConnection() {
        let redisConnection = Connections.connections.get('redis');
        if( redisConnection ){
            return redisConnection;
        }

        redisConnection = await redisClient();

        await redisConnection.set('hello', 'world');

        Connections.connections.set('redis', redisConnection);

        return redisConnection;
    }
}

module.exports = Connections