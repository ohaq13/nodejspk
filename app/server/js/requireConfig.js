"use strict";

const PATHS = {
    services      : global.__dirname + '/server/js/services',
    customer      : global.__dirname + '/server/js/customer',
    customerDao   : global.__dirname + '/server/js/customerDao',
    db            : global.__dirname + '/server/js/db',
}

class  RequireConfig {
    constructor() {
        
    }

    static get paths() {
        return PATHS;
    }
    
}

module.exports =  RequireConfig;
