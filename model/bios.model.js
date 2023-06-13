const Connections = require('../config/connection');
const { checkIfRedisExists, setRedis } = require('../helper/utils');

async function findBios( skip = 0, limit = 10 ){
    const mongoClient = await Connections.mongoConnection();
    const db = mongoClient.db('test');
    const collection = db.collection('bios');

    const biosDataRedis = await checkIfRedisExists('biosData', `skip:${skip}:limit:${limit}`);

    console.log("biosDataRedis ", biosDataRedis);
    if( biosDataRedis && !biosDataRedis instanceof Error ){
        console.log("Redis data found!!");

        return JSON.parse(biosDataRedis);
    }
    
    const documents = 
        await collection
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();

    await setRedis('hset', 'biosData', `skip:${skip}:limit:${limit}`, JSON.stringify(documents));
  
    return documents;
}

exports.findBios = findBios;