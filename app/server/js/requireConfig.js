"use strict";

const PATHS = {
    services      : global.__dirname + '/server/js/services',
    customer      : global.__dirname + '/common/js/customer',
    customerDao   : global.__dirname + '/common/js/customerDao',
    db            : global.__dirname + '/common/js/db',
}

class  RequireConfig {
    constructor() {
        
    }

    static get paths() {
        return PATHS;
    }
    
}

module.exports =  RequireConfig;
