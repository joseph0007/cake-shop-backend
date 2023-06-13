const EventEmiiter = require('events');

class EventWrapper extends EventEmiiter {
    constructor(){
        super();
    }
}

module.exports = EventWrapper;