define(['db'], function (db) {
    "use strict";
    
    class  Customer {
        constructor() {
            this.id       = '';
            this.name     = '';
            this.type     = '';
            this.phone    = '';
            this.phone2   = '';
            this.address  = '';
            this.comments = '';

            this.dao = {
                getCustomerByName: function (params, done){
                    db.select("SELECT id, name FROM customer where name like ?", params, done); 
                }
            }
            
        }
     }

    


    return Customer;
});


