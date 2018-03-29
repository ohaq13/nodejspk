"use strict";

const Db = require(requireConfig.paths.db);
const Customer = require(requireConfig.paths.customer);


class  CustomerDao {
    constructor() {
    }

    static getCustomerByName1 (req, res){
        let param = "%" +req.query.q + "%";                  
        Db.select(`SELECT id ${Customer.FIELDS.id}, name ${Customer.FIELDS.name}, name text FROM customer where name like ?`, [param], done); 

        function done(err, data, count){
            if (err) {
                return res.send(err.message);
            }
            
            res.json(data);
        }
    }
            
    static getCustomerByName(params, done){
        Db.select(`SELECT id ${Customer.FIELDS.id}, name ${Customer.FIELDS.name} FROM customer where name like ?`, params, done); 
    }    
}


module.exports = CustomerDao;



