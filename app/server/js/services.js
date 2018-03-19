define(['customer'], function (Customer) {
    "use strict";
    
    class  Services {
        constructor(app) {
            this.app = app;
        }

        initServices(){
            let customerService = new Customer();

            this.app.get('/api/customer/getCustomerByName', customerService.getCustomerByName1);
            
            this.app.get('/api/customer/getCustomerByName', (req, res)=>{
                let param = "%" +req.query.q + "%";  
                  
                customerService.getCustomerByName([param], (err, data, count)=>{
                  if (err) {
                    return res.send(err.message);
                  }
                  res.json(data);
                });   
            });

        }
    }

    


    return Services;
});


