define(['common', 'select2' /*'moment','bootstrap', 'areYouSure','datetimepicker'*/],function(common){
    
    "use strict";

    function init()
    {
        initWidgets()
    }

    function initWidgets(){
        $(document).ready(function() {

            $('#btnAddNew').on("click", () => {common.Dialog.confirm("New "+ window.const.customer,"<b>New </b>")})
            $('.js-example-basic-single').select2({width:"100%"});
    
            
    
            $('.js-data-example-ajax').select2({
                width:"100%",
                minimumInputLength:1,
                ajax: {
                delay: 100,
                url: '/api/customer/getCustomerByName',
                dataType: 'json',
                cache:false
                // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                }
            });
        });
    }

    return {
        init: init,
    };
});