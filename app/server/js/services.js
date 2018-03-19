define(['customer'], function (Customer) {
    "use strict";
    
    class  Services {
        constructor(app) {
            this.app = app;
        }

        initServices(){
            let c = new Customer();

            this.app.get('/api/getval', (req, res)=>{
                let param = "%" +req.query.q + "%";  
                  
                c.dao.getCustomerByName([param], (err, data, count)=>{
                  res.json(data);
                });   
            });

        }
    }

    


    return Services;
});


