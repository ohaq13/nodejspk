define(['moment','bootstrap', 'const'/*, 'areYouSure','datetimepicker'*/],function(moment){

	"use strict"
	var now=new Date().getTime();
	var common =
	{
		UNAUTHORIZED: 'You are not authorized to perform this action.',
		loadCount:0,
		alertTimeout: 0,
		init:function(noOfAjaxCall, callbackInitDone)
		{
			if ($.isNumeric(noOfAjaxCall))
			{
				this.loadCount = noOfAjaxCall;
			}
			
			this.showWait();

			this.checkInitLoadingComplete(callbackInitDone);
		},
		checkInitLoadingComplete: function(callbackInitDone)
		{
			if (common.loadCount >= 0) 
			{
				var initLoadWaitInterval = setInterval(function()
				{
					if (common.loadCount <= 0) 
					{
						clearInterval(initLoadWaitInterval);
	
						common.loadCount = 0;
						common.hideWait();

						// New page loaded reset areyousure
						// .not("[data-areyousure=false]") allows you to add attribute (data-areyousure=false) 
						// so that 'are you sure' is not attached to the form
						$("form").not("[data-areyousure=false]").areYouSure();
						
						$("form").on('dirty.areYouSure', function() {
							// Enable save button only as the form is dirty.
							if ($(this).find('button[data-type="save"][data-permission]').length > 0)
							{
								$(this).find('button[data-type="save"][data-permission=true]').removeAttr('disabled');
							}
							else
							{
								$(this).find('button[data-type="save"]').removeAttr('disabled');
							}
							
						});
						
						$('form').on('clean.areYouSure', function() {
							// Form is clean so nothing to save - disable the save button.
							$(this).find('button[data-type="save"]').attr('disabled', 'disabled');
						});
						
						// show main page
						$('#mainContainer').show();
						
						// Show subpage: Example: Admin: Manage Users page:
						if ($('#mainContainerSubPage').length > 0) 
						{
							$('#mainContainerSubPage').show()
						}

						// Call the callback function
						// This is called when initial ajax
						// call complete loading i.e. noOfAjaxCall completed
						if ($.isFunction(callbackInitDone))
						{
							callbackInitDone();
						}
					}
				}, 300);
			}
		},
		showWait:function()
		{
			$('#loadingPage').modal('show');
		},
		hideWait: function(all, keepBackDrop)
		{
			$('#loadingPage').modal('hide');
			
			if(keepBackDrop == true)
			{
				// do not remove as most probably it was called from a dialog example media management update files mediaManagementUpdateFiles.js
			}
			else
			{
				$('.modal-backdrop').remove() // Caution: Sometimes there might be multiple backdrops, so remove all				
			}
			
			
			if (all)
			{
				$('.modal .fade').modal('hide'); //https://github.com/twbs/bootstrap/issues/11793
				$('.modal').modal('hide');
			}
			
		},
		Dialog:{
			gethtmlObj: function()
			{
				
				var uniqueId = "modalCommon" + new Date().getTime();
				var buildDialogHTML=[];
				
				buildDialogHTML.push('<div class="modal" id="' + uniqueId + '" tabindex="-1" role="modal-dialog"                                                                                                            ');
				buildDialogHTML.push('	aria-labelledby="modalCommonLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">                                                                                ');
				buildDialogHTML.push('	<div class="modal-dialog">                                                                                                                                                         ');
				buildDialogHTML.push('		<div class="modal-content">                                                                                                                                                    ');
				buildDialogHTML.push('			<div class="modal-header">                                                                                                                                                 ');
				buildDialogHTML.push('				<h5 class="modal-title">Modal title</h5>                                                                                                                               ');
				buildDialogHTML.push('			</div>                                                                                                                                                                     ');
				buildDialogHTML.push('			<div class="modal-body"></div>                                                                                                                                             ');
				buildDialogHTML.push('			<div class="modal-footer">                                                                                                                                                 ');
				buildDialogHTML.push('			</div>                                                                                                                                                                     ');
				buildDialogHTML.push('		</div>                                                                                                                                                                         ');
				buildDialogHTML.push('	</div>                                                                                                                                                                             ');
				buildDialogHTML.push('</div>                                                                                                                                                                               ');

				return {id:uniqueId, html:buildDialogHTML.join("")};
			},
			newButton:function (name, isPrimary, callback)
			{
				function done()
				{
					var me = this;
					var closeDialogFunc = function() {$(me).closest('[role="modal-dialog"]').modal('hide');}
					var keepDialogOpen = false;
					
					if (callback)
					{
						// once cancel or close button is clicked call the callback function
						// pass the close dialog as callback which should be called by the caller
						// once done with processing to close the dialog
						keepDialogOpen = callback(closeDialogFunc);
					}
					
					// if call back returns true then keep it open, let user close it.
					// Example in dataSuppliersOutCust
					if (!keepDialogOpen)
					{
						closeDialogFunc();
					}
				}
				return {text: name, id: "dlg_"+name.toLowerCase().replace(/\s/g, ''), class:(isPrimary) ? "btn btn-primary": "btn btn-secondary", click: done}
			},
			showCustom: function(title, htmlMessage, buttonsArray )
			{
				var obj = this.gethtmlObj();
				var dialogID = obj.id;

				$('body').append(obj.html); // Eventually to support multiple dialog

				$('#'+dialogID).find(".modal-title" ).text(title);
				$('#'+dialogID).find(".modal-body" ).html(htmlMessage);
				
				// remove the dialog from the dom,
				// timeout added so tha transition 
				// can complete before element is removed.
				$('#'+dialogID).on('hidden.bs.modal', function (e) 
				{
					// only remove modal dialog not show wait page loading
					if ($(e.target).attr('role') == "modal-dialog")
					{
						$(e.target).remove();
					}
				});

				var buttons = [];
				$.each(buttonsArray, function( i, v)
				{
					var button;
					button = $('<button/>', v);
					buttons.push(button);
				});
	
				$('#'+dialogID).find(".modal-footer").html(buttons);
				
				// When multiple dialogs dialog dont stack/align properly
				// This happens when multiple dialog and page has scrollbar
				// the class is not added before the dialog is shown DE60517 
				$('body').addClass("modal-open"); 
				
				return $('#'+dialogID).modal('show');
			}
			,confirm: function(title, htmlMessage, okCallback, cancelCallback, type )
			{
				var okString = "OK";
				var cancelString = "Cancel";
				
				switch(type) 
				{
					case "ny":
						okString = "Yes";
						cancelString = "No";
						break;
					case "cs":
						okString = "Save";
						cancelString = "Cancel";
						break;
					case "ne":
						okString="Extend Session";
						cancelString = "Logout";
						break;
					default:
						okString = "OK";
						cancelString = "Cancel";
				}
				
				var buttonsArray = 
					[
							this.newButton(cancelString, false, cancelCallback),
							this.newButton(okString, true, okCallback),
					];
			
				return this.showCustom(title, htmlMessage, buttonsArray )
			}
			,alert: function(title, htmlMessage, okCallback )
			{
				var buttonsArray = 
				[
					this.newButton("OK", true, okCallback),
				];
			
				return this.showCustom(title, htmlMessage, buttonsArray);
			}
		},
		formDirty: function(callbackLeavePage, callbackStayOnPage, callbackFormNotDirty)
		{
			function leavePage() {  
				$('form').trigger('reinitialize.areYouSure');
				
				if (callbackLeavePage){
					callbackLeavePage();
				}
			};
			
			function stayOnPage(){
				if (callbackStayOnPage){
					callbackStayOnPage();
				}
			}
			
			if ($('form').hasClass('dirty'))
			{
				var title = "Unsaved Changes";
				var message = "<p>You have unsaved changes!</p><p>Are you sure you want to leave this page?</p>";
				var buttons = [
							   this.Dialog.newButton("Leave this Page", false , leavePage),
							   this.Dialog.newButton("Stay on this Page", true, stayOnPage),
							   ];
			
				this.Dialog.showCustom(title, message, buttons);
			
				return true;
			}
			else{
				if (callbackFormNotDirty){
					callbackFormNotDirty();
				}
				
				return false;
			}
			
		},
		isFormDirty: function()
		{
			return $('form').hasClass('dirty')? true:false;
		},
		select2: {
			init:function($element, options)
			{
				return $element.each(function() {
					options.theme = "bootstrap";
					
					if (!options.minimumResultsForSearch)
					{
						options.minimumResultsForSearch = 10;
					}
					
					$(this).select2(options);
					
					// scroll top before every search so that the first match is shown
					$(this).on("select2:open", function(e){$('.select2-results > ul').scrollTop(0)});
				});

			},
			ajax:function($element, url, options)
			{
				function select2InputSearchFix(jqXHR, settingsOrStatus){
					// If minimum char search is 2 and user hits backspace 
					// quickly to 1 char it shows results for 2 chars
					// does not abort the previous  ajax call
					// https://github.com/select2/select2/pull/4447
					var $select2Element    = $element.data("select2");
					var $inputSearch       = $select2Element.$dropdown.find("input");
					var inputSearchLength  = $inputSearch.val().length;
					var minimumInputLength = $select2Element.options.options.minimumInputLength;

					// Abort request if ajax request is made for less than the set minimumInputLength char limit
					if (inputSearchLength < minimumInputLength){
						// use time out as sequence of js calls is failing
						setTimeout(function(){
							jqXHR.abort();                            // abort request as it does not match minimumInputLength
							$inputSearch.trigger('input');            // so that the content under search says 'Please enter ## or more chars' instead of 'The results can not be loaded'
						}, 50);
					}
				}
				
				options.ajax = {
					url            : url,
					delay          : 300,
					cache          : false,
					contentType    : 'application/json;  charset=UTF-8',
					dataType       : 'json',
					processData    : true,
					processResults : function (data) {return {results: data, pagination:  {"more": false} }},
					beforeSend     : select2InputSearchFix, // if in some cases beforeSend does not catch it do it in complete
					complete       : select2InputSearchFix, // doing this only in complete shows some flicker, so keeping both beforeSend and complete
				}
				
				return this.init($element, options )
			},
		},
		showAlert: function($id, type, message, insertAt, scrollTop, keepAlertCount)
		{
			var LAST_ALERT_TIMEOUT = 10 * 1000;
			var ALERT_TIMEOUT = 3 * 1000;
			var me = this;
			var alertClass ="";
			var iconClass ="";
			var heading ="";
			var alertsToKeep = 1;
			var c = this;
			
			switch (type) {
			case 's':
				alertClass = 'alert alert-success alert-dismissible';
				heading = 'Success';
				break;
			case 'i':
				alertClass = 'alert alert-info alert-dismissible';
				heading = 'Information';
				break;
			case 'w':
				alertClass = 'alert alert-warning alert-dismissible';
				heading = 'Warning';
				break;
			case 'e':
				alertClass = 'alert alert-danger alert-dismissible';
				heading = 'Error';
				break;
			}
			
			var $html = $.parseHTML(
						"<div class='" +alertClass+"' role='alert'> " +
						"  <button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
						"  <span aria-hidden='true'>&times;</span></button>" +
						"  <h1>" + heading + "</h1>" +
						"  <span>" +message +"</span>"+
						"</div>"
					);
			
			// Option argument to decide where to show the alert.
			if (insertAt == 'o') // replace / overwrite
			{
				$id.html($html);
			}
			else if (insertAt == 'a') // append
			{
				$id.append($html);
			}
			else if (insertAt == 'p') // prepend
			{
				$id.prepend($html);
			}
			else 
			{
				$id.append($html); //append
			}
			
			// scroll
			if(scrollTop != false)
			{
				window.scrollTo(0, 0); // scroll to top so that user can see the message
			}
			
			// When alert is closed using close button then fade out. 
			$($html).on('close.bs.alert', function (){
				$($html).addClass("fade out");
			})
				
			// Only show last error, close others
			// using nth selector does not work as expected with class's
			// n+2 works where as n+1 would if .class not used
			
			if($.isNumeric(keepAlertCount))
			{
				alertsToKeep = keepAlertCount;
			}
						
			var $alerts = $($.grep($("div.alert"), function (value, index){return index < $("div.alert").length - alertsToKeep})); // get all except the no passed in
			
			// keep messages other than the last one up for couple of seconds then hide
			$alerts.delay(ALERT_TIMEOUT).slideUp('slow', 
				function()
				{
					// reset timer for last alert, so that it 
					// closes when it reaches LAST_ALERT_TIMEOUT
					_showAlertRemoveLast(); 
					$alerts.alert("close");
				}
			);
			
			// If only one message then hide the alert one after LAST_ALERT_TIMEOUT
			_showAlertRemoveLast();
			
			function _showAlertRemoveLast()
			{
				clearTimeout(me.alertTimeout);
				
				me.alertTimeout = setTimeout(function()
				{
					// if a select2 drop down is open the position gets misaligned 
					// as regular select elements can not be re positioned 
					// hide the drop down for all
					c.util.hideDropDown();
					
					// for popovers close all 
					$("[data-toggle='popover']").popover('destroy');
					
					// hide the banner
					$alerts = $("div.alert:nth-last-child(n+" + (1) + ")"); // get all except the last
					$alerts.slideUp('slow', function(){$alerts.alert("close");});
				}, LAST_ALERT_TIMEOUT);
			}
		},
		hideAlerts:function()
		{
			$("div.alert").alert("close");
		},
		ajaxCall: function(obj) {
			return jQuery.ajax({
				'url': obj.url,
				'success': obj.success,
				'data': (obj.data) ? JSON.stringify(obj.data) : obj.data,
				'method': obj.method,
				'async': (obj.hasOwnProperty("async")) ? obj.async: true,
				'crossDomain': true,
				'cache': false,
				'contentType': 'application/json;  charset=UTF-8',
				'dataType': 'json',
				'processData': false
			})
		},
		postJSON: function(url, data, callback) {
			return this.ajaxCall({
				'url': encodeURI(url),
				'success': callback,
				'data': data,
				'method': 'POST',
			})
		},
		getJSON: function(url, data, callback) {
			return this.ajaxCall({
				'url': encodeURI(url),
				'success': callback,
				'data': data,
				'method': 'GET',
			})
		},
		util: 
		{
		    initShowHideNav: function ()
			{
				var showHideClass= "nav-closed";
				
				if ($("#navigationResizeBar" ).hasClass(showHideClass))
				{
					$("#navigationResizeBar" ).removeClass(showHideClass);
					$("#subContainer" ).removeClass("col-sm-12").addClass("col-sm-9");
					$(".toc-nav").show("fast");
				}
				else
				{
					$("#navigationResizeBar" ).addClass(showHideClass);
					$("#subContainer" ).removeClass("col-sm-9").addClass("col-sm-12");
					$(".toc-nav").hide("fast");
				}
			},
			hideDropDown: function hideDropDown(){
				// if a select2 drop down is open the position gets misaligned 
				// as regular select elements can not be re positioned 
				// hide the drop down for all
				$.each($("select"), function () 
				{
					this.blur(); // hides regular select elements
					
					// for select elements
					var select2 = $(this).data("select2");
					if (select2 && select2.isOpen())
					{
						// select2.dropdown._positionDropdown(); // reposition
						select2.close();
					}
				});
			}
		}
	}
	
	$(document).ready( function () 
	{
		$('#loadingPage').modal({backdrop: 'static', keyboard: false, show: false});
		$('#loadingSection').modal({backdrop: 'static', keyboard: false, show: false});
	});

	return common;
})