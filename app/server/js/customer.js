"use strict";

const FIELDS = {
        id:"id",
        name:"name",
        type:"type",
        phone:"phone",
        phone2:"id",
        address:"address",
        comments:"comments",
    }

class  Customer {
    constructor() {
        this[FIELDS.id]       = '';
        this[FIELDS.name]     = '';
        this[FIELDS.type]     = '';
        this[FIELDS.phone]    = '';
        this[FIELDS.phone2]   = '';
        this[FIELDS.address]  = '';
        this[FIELDS.comments] = '';
    }

    static get FIELDS() {
        return FIELDS;
    }
}

module.exports =  Customer;



