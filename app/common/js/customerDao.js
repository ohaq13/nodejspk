"use strict";

const db = require(global.__dirname + "/common/js/db");
const Customer = require(global.__dirname + "/common/js/customer");


class  CustomerDao {
    constructor() {
    }

    static getCustomerByName1 (req, res){
        let param = "%" +req.query.q + "%";                  
        db.select(`SELECT id ${Customer.FIELDS.id}, name ${Customer.FIELDS.name}, name text FROM customer where name like ?`, [param], done); 

        function done(err, data, count){
            if (err) {
                return res.send(err.message);
            }
            
            res.json(data);
        }
    }
            
    static getCustomerByName(params, done){
        db.select(`SELECT id ${Customer.FIELDS.id}, name ${Customer.FIELDS.name} FROM customer where name like ?`, params, done); 
    }

    static get ffff(){return 'd'}
    
}


module.exports = CustomerDao;



