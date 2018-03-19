define(['db'], function (db) {
    "use strict";
    
    const FIELDS = {
        id:"id",
        name:"name",
        type:"type",
        phone:"phone",
        phone2:"id",
        address:"address",
        comments:"comments",
    };
        
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
 
        getCustomerByName1 (req, res){
            let param = "%" +req.query.q + "%";                  
            db.select(`SELECT id ${FIELDS.id}, name ${FIELDS.name} FROM customer where name like ?`, [param], done); 

            function done(err, data, count){
                if (err) {
                    return res.send(err.message);
                }
                res.json(data);
            }
        }
               
        getCustomerByName (params, done){
            db.select(`SELECT id ${FIELDS.id}, name ${FIELDS.name} FROM customer where name like ?`, params, done); 
        }

     }

    


    return Customer;
});


