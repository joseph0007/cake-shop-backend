exports.tryCatchWrapper = ( fn ) => {
    return async ( ...args ) => {
        const argumentArr = args || [];

        try {
            return await fn(...argumentArr);
        } catch(error) {
            return error;
        }
    }
}