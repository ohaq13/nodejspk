"use strict";

const CustomerDao = require(requireConfig.paths.customerDao);

class  Services {
    constructor(app) {
        this.app = app;
    }

    initServices(){
        // let customerService = new Customer();

        this.app.get('/api/customer/getCustomerByName', CustomerDao.getCustomerByName1);
        
        this.app.get('/api/customer/getCustomerByName', (req, res)=>{
            let param = "%" +req.query.q + "%";  
                
            CustomerDao.getCustomerByName([param], (err, data, count)=>{
                if (err) {
                return res.send(err.message);
                }
                res.json(data);
            });   
        });

    }
}

module.exports = Services; 


// define(['customerDao'], function (CustomerDao) {
//     "use strict";
    
//     class  Services {
//         constructor(app) {
//             this.app = app;
//         }

//         initServices(){
//             // let customerService = new Customer();

//             this.app.get('/api/customer/getCustomerByName', CustomerDao.getCustomerByName1);
            
//             this.app.get('/api/customer/getCustomerByName', (req, res)=>{
//                 let param = "%" +req.query.q + "%";  
                  
//                 CustomerDao.getCustomerByName([param], (err, data, count)=>{
//                   if (err) {
//                     return res.send(err.message);
//                   }
//                   res.json(data);
//                 });   
//             });

//         }
//     }


//     return Services;
// });


