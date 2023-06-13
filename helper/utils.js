const Connections = require('../config/connection');
const { tryCatchWrapper } = require('./tryCatchWrapper');

exports.checkIfRedisExists = tryCatchWrapper( async ( hash, key ) => {
    const redisClient = await Connections.redisConnection();

    // check type of redis key
    const typeOfKey = await redisClient.type(hash);

    console.log("typeOfKey ", typeOfKey);

    if( typeOfKey === 'string' ){
        return await redisClient.get(hash);
    }

    // throw new Error('shitss');

    if( typeOfKey === 'hash' ){
        const result = await redisClient.hget(hash, key);
        console.log("result ", result);

        return result;
    }

    if( typeOfKey === 'null' ){
        return false;
    }

    return false;
} );

exports.setRedis = tryCatchWrapper( async ( type, hash, key, data ) => {
    const redisClient = await Connections.redisConnection();

    console.log("type, hash, key, data ", type, hash, key, data)

    if( type === 'set' ){
        await redisClient.set( hash, data);
        return true;
    }

    console.log(type === 'hset');
    if( type === 'hset' ){
        const result = await redisClient.hset( hash, key, data);
        console.log("result ", result);
        return true;
    }

    return false;
} );