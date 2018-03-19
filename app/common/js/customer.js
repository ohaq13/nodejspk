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
                getValue: function (){
                    console.log("~~~~~: " + db.select("%Emerita%"));
                }
            }
            
        }
     }

    


    return Customer;
});


