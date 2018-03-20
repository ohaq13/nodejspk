var LAST_LOAD_TIME = (new Date()).getTime(); //no cache, get time only once on application load.
requirejs.config({
    urlArgs: "=_" + LAST_LOAD_TIME, // no-cache on page refresh
    baseUrl: '../../',
    paths: {
        // Third Party
        'jquery'                  :'client/thirdparty/jquery-3.3.1.min',
        'bootstrap'               :'client/thirdparty/bootstrap-4.0.0/bootstrap.bundle.min',
        'moment'                  :'client/thirdparty/moment-2.21-0..min',
//         'datetimepicker'          :'oss/bootstrap-datetimepicker-4.17.47/bootstrap-datetimepicker.min',
//         'datatables.net'          :'oss/jquery-plugins/DataTables/DataTables-1.10.13/js/jquery.dataTables.min',
//         'datatables.select'       :'oss/jquery-plugins/DataTables/Select-1.2.1/dataTables.select.min',
//         'datatables.scroller'     :'oss/jquery-plugins/DataTables/Scroller-1.4.2/dataTables.scroller.min',
//         'dataTable_bootstrap'     :'oss/jquery-plugins/DataTables/DataTables-1.10.13/js/dataTables.bootstrap.min',
        'select2'                 :'client/thirdparty/select2-4.0.5/js/select2.full',
        //'areYouSure'              :'oss/jquery-plugins/jquery.are-you-sure-1.9.0',
        'common'                                      :'client/js/common',
        // Custom Plugins
        'customer'                   :'common/js/customer',
        
    },
    shim: {
        'bootstrap'            : { deps: ['jquery']},      
//         'datetimepicker'       : { deps: ['bootstrap', 'moment'], exports:'$.fn.datetimepicker'},
//         'datatables.net'       : { deps: ['jquery']},
//         'datatables.select'    : { deps: ['datatables.net']},
//         'datatables.scroller'  : { deps: ['datatables.net']},
//         'dataTable_bootstrap'  : { deps: ['datatables.net']},
//         'areYouSure'           : { deps: ['jquery'], exports:'$.fn.areYouSure'},
    },

});