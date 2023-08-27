var $=jQuery.noConflict();

//////added by Turbo
function showHide(currdiv)
{
	if($('#override_wh').attr('checked'))
	{
		$('#extend_div').show('slow');
	}
	else 
	{
		$('#extend_div').hide('slow');
	}
}


function PrintElem(elem)
{
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

/////////////// Generic Script ////////////////////////

function chkpasswordExp(opt){
	//alert('yes');
	if($("#userpassword").val()!= $("#confirm_userpassword").val())
	{
		$('#display_message').html('');
	    $('#display_message').show('fast');
		$("#display_message").html('Passwords do not match');
		$("#display_message").show('slow');
		$("#display_message").click();
		//$('#postbtn').attr("disabled","disabled");
		return false;
	}else{
		$("#display_message").html('');
		$("#display_message").show('slow');
		callpage(opt);
		$('#display_message').html('');
	    $('#display_message').show('fast');
		return true;
	}
}

function getValuetoHidden(str)
	{
	var data = $('#'+str).val();
	$('#'+str+'-fd').attr('value',data);
		if(data == 'Others')
		{
			//alert(data);
		$('#'+str+'-div').attr('style','display:;');
		}
		else
		{
		$('#'+str+'-div').attr('style','display:none;');
		}
	}
	
 function callPageEdit(str,pgload,divd)
{
	var operation = $("#operation").html();
	//alert(operation);
	var i = 0;
	var inpname = [];
	$("#form1").serialize();
	$.each($("input, select, textarea"), function(i,v) {
    var theElement = $(v);
	var theName = escape(theElement.attr('name'));
	inpname[i] = theName;
	i += 1;
	});
	var data = getdata();
	//alert(data);
	if(data!='error')
	{
		$.ajax({
			async: true,
	   		type: "POST", 
	   		url: "utilities.php", 
	   		data: "op=editTrans&operation="+operation+"&tableName="+str+'&'+data+"&inputs="+inpname,
	   		success: function(msg){
		 	//alert(msg);
			var myMsgTest = msg.split("::||::");
			if(myMsgTest[0]=='1')
			{ 
				$('#display_message').removeClass('alert alert-success');
				$('#display_message').removeClass('alert alert-danger');
				$('#display_message').addClass('alert alert-success');
				$("#display_message").html(myMsgTest[1]);
			 	$("#display_message").show('fast');
				
			}else
			{
				$('#display_message').removeClass('alert alert-danger');
				$('#display_message').removeClass('alert alert-success');
				$('#display_message').addClass('alert alert-danger');
				$("#display_message").html(msg);
			 	$("#display_message").show('fast');
			}
			
			if(pgload!='' && myMsgTest[0]=='1')
			 {
				setTimeout("getpage('"+pgload+"','"+divd+"')",3000);
			 }			 
	   } 
	     
  });
	}
}

function checkboxVal(obj){
	if(obj.checked){
		//alert('yes');
		$('#subbtn').attr('disabled','');
		$('#subbtn').attr('value','Register').show('slow');
	}else{
		$('#subbtn').attr('disabled','disabled');
		$('#subbtn').attr('value','Read the Terms Before Proceeding!').show('slow');
	}
	
}
function cal_amt(){
				var nfemale = parseFloat(removecomma($("#nfemale").val()));
				var nmale = parseFloat(removecomma($("#nmale").val()));
				var child = parseFloat(removecomma($("#child").val()));
				
				var tot_attend = nfmale + nmale + child ;
				$("#tot_attend").html(tot_attend);
				alert (tot_attend);
	
	}
	
function cal_attendance2()
{
				var children = parseFloat(($("#children").val()));
				var no_female = parseFloat(($("#no_female").val()));
				var no_male = parseFloat(($("#no_male").val()));
				
				var attendance = children + no_female + no_male ;
				$("#total_no").html(attendance);
				alert (attendance);
	
}


// function checklogin(asw){		
// 		$('#display_message_login').ajaxStart(function(){
// 		//$('#display_message').css({background-image: "url(../images/progress_bar.gif)"});
// 		$('#display_message_login').html('<img src="images/loading.gif" alt="" />loading please wait . . .');
// 		});
	
// 		var data = $("#youremail").val();
// 		var data2 = $("#yourpassword").val();
// 		//var data3 = $("#agent_radio").val();
// 		//alert(data+":"+data2);
// 		//display_message
// 		$.ajax({ 
// 		   type: "POST", 
// 		   url: "utilities.php", 
// 		   data: "op=checklogin&username="+data+"&password="+data2, 
// 		   success: function(respo){ 
//                var myMsgTest = respo.split("::||::");
//                msg = myMsgTest[0];
// 			 msg = jQuery.trim(msg);
// 			//console.log(msg);
// 			//$("#display_message").html('logging you in ...').show();
// 			 $("#send").html('Sign In').show();

// 				if(msg==''){
// 					$("#display_message_login").html('<div class=\' alert alert-danger \'>Please enter a valid Username and Password</div>').show();
// 				}
// 				else if(msg=='0'){
//                     msg = "<br/> You have "+myMsgTest[1]+" login attempt remaining";
// 					$("#display_message_login").html('<div class=\' alert alert-danger \'>Invalid username or password.'+msg+'</div>').show();
// 				}
// 				else if(msg=='1'){
// 					$('#display_message_login').removeClass('alert alert-success');
// 					$('#display_message_login').removeClass('alert alert-danger');
// 					$('#display_message_login').addClass('alert alert-success');
// 					$("#display_message_login").html("Login Successful");
// 					$("#display_message_login").show("fast");
// 					$("#form1").attr("action","admin");
// 					$("#form1").submit();
// 				}
// 				else if(msg=='111'){
// 					$('#display_message_login').removeClass('alert alert-success');
// 						$('#display_message_login').removeClass('alert alert-danger');
// 						$('#display_message_login').addClass('alert alert-success');
// 						$("#display_message_login").html("Login Successful to payment Option");
// 						$("#display_message_login").show("fast");
// 					$("#form1").attr("action","payment_option.php");
// 					$("#form1").submit();
// 				}

// 				else if(msg=='101'){
//                     msg = "<br/> Your registration is incomplete<br /> Kindly, <a href='driving_school_info.php'>click here</a> to complete your registration<br /> Thank You!";
// 					$("#display_message_login").html('<div class=\' alert alert-danger \'>'+msg+'</div>').show();
// 				}

// 				else if(msg=='113'){
// 					$("#form1").attr("action","driving_school_form.php");
// 					$("#form1").submit();
// 				}
				
// 				else if(msg=='2'){
// 					$('#display_message_login').removeClass('alert-danger');
// 						$('#display_message_login').removeClass('alert-success');
// 						$('#display_message_login').addClass('alert-danger');
// 					$("#display_message_login").html('Your user profile has been disabled').show();
					
// 					// $("#display_message").html("Error Check your form and Correct it");
// 					$("#display_message_login").show("fast");
// 				}
// 				else if(msg=='3'){
// 					$("#display_message_login").html('<div class="alert alert-danger">Your user profile has been locked</div>').show();
// 				}
// 				else if(msg=='4'){
// 					$("#display_message_login").html('You are not allowed to login on Sunday').show();
// 				}
// 				else if(msg=='5'){
// 					$("#display_message_login").html('You are not allowed to login on Monday').show();
// 				}
// 				else if(msg=='6'){
// 					$("#display_message_login").html('You are not allowed to login on Tuesday').show();
// 				}
// 				else if(msg=='7'){
// 					$("#display_message_login").html('You are not allowed to login on Wednesday').show();
// 				}
// 				else if(msg=='8'){
// 					$("#display_message_login").html('You are not allowed to login on Thursday').show();
// 				}
// 				else if(msg=='9'){
// 					$("#display_message_login").html('You are not allowed to login on Friday').show();
// 				}
// 				else if(msg=='10'){
// 					$("#display_message_login").html('You are not allowed to login on Saturday').show();
// 				}
// 				else if(msg=='11'){
// 					$("#display_message_login").html('You are not allowed to login at this time <br> The time is not within the working hours').show();
// 				}
//                else if(msg=='17'){
// 					$("#display_message_login").html('Your account has not been approved. <br/> Kindly contact admin').show();
// 				}
// 				else if(msg=='12'){
// 					$("#display_message_login").html('<div class="alert alert-danger">Your profile has been Locked, please contact Administrator</div>').show();
// 				}
// 				else if(msg=='13'){
//                     swal({
//                         icon: 'warning',
//                         text: 'Your password has expired',
//                       }).then((value)=>{
//                             swal({
//                                 text: "You need to change password , please wait..",
//                                 icon: "img/loader.gif",
//                               });
//                            $(".swal-button--confirm").hide();
//                            setTimeout(function(){
//                                window.location = 'change_password_logon.php?id='+data;
//                            },5000);
// 						});
// 					}
// 				else if(msg=='14'){
//                     swal({
//                         icon: 'warning',
//                         text: 'You are required to change your password',
//                       }).then((value)=>{
//                             swal({
//                                 text: "You need to change password , please wait..",
//                                 icon: "img/loader.gif",
//                               });
//                            $(".swal-button--confirm").hide();
//                            setTimeout(function(){
//                                window.location = 'change_password_logon.php?id='+data;
//                            },5000);
//                         });
                    
                    
// 					$("#display_message_login").html("You are required to change your password, <br><a href='change_password_logon.php?id="+data+"'> click here to change password </a>").show();
// 				}else if(msg=='15'){
// 					$("#display_message_login").html("Your account is presently logged into. To logout the current user, <a href='logout_curr.php?id="+data+"'> click here </a>").show();
// 				}else if(msg=='20'){
// 					$("#display_message_login").html("Your account is not confirm,").show();
// 				}
// 				else{
//                     msg = "<br/> you have login attempt remaining";
// 					$("#display_message_login").html('Invalid username or password '+msg).show();
// 				}
// 		   } 
// 		 });
// 		//alert(data);
// 		return false;
// }

function checklogin(asw){		
		$('#display_message_login').ajaxStart(function(){
		//$('#display_message').css({background-image: "url(../images/progress_bar.gif)"});
		$('#display_message_login').html('<img src="images/loading.gif" alt="" />loading please wait . . .');
		});
	
		var data = $("#youremail").val();
		var data2 = $("#yourpassword").val();
		//var data3 = $("#agent_radio").val();
		//alert(data+":"+data2);
		//display_message
		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op=checklogin&username="+data+"&password="+data2, 
		   success: function(respo){ 
               var myMsgTest = respo.split("::||::");
               msg = myMsgTest[0];
			 msg = jQuery.trim(msg);
			//console.log(msg);
			//$("#display_message").html('logging you in ...').show();
			 $("#send").html('Sign In').show();

				if(msg==''){
					$("#display_message_login").html('<div class=\' alert alert-danger \'>Please enter a valid Username and Password</div>').show();
				}
				else if(msg=='0'){
                    msg = "<br/> You have "+myMsgTest[1]+" login attempt remaining";
					$("#display_message_login").html('<div class=\' alert alert-danger \'>Invalid username or password.'+msg+'</div>').show();
				}
				else if(msg=='1'){
					$('#display_message_login').removeClass('alert alert-success');
					$('#display_message_login').removeClass('alert alert-danger');
					$('#display_message_login').addClass('alert alert-success');
					$("#display_message_login").html("Login Successful");
					$("#display_message_login").show("fast");
					$("#form1").attr("action","admin");
					$("#form1").submit();
				}
				else if(msg=='111'){
					$('#display_message_login').removeClass('alert alert-success');
						$('#display_message_login').removeClass('alert alert-danger');
						$('#display_message_login').addClass('alert alert-success');
						$("#display_message_login").html("Login Successful to payment Option");
						$("#display_message_login").show("fast");
					$("#form1").attr("action","payment_option.php");
					$("#form1").submit();
				}

				else if(msg=='101'){
                    msg = "<br/> Your registration is incomplete<br /> Kindly, <a href='driving_school_info.php'>click here</a> to complete your registration<br /> Thank You!";
					$("#display_message_login").html('<div class=\' alert alert-danger \'>'+msg+'</div>').show();
				}

				else if(msg=='113'){
					$("#form1").attr("action","driving_school_form.php");
					$("#form1").submit();
				}
				
				else if(msg=='2'){
					$('#display_message_login').removeClass('alert-danger');
						$('#display_message_login').removeClass('alert-success');
						$('#display_message_login').addClass('alert-danger');
					$("#display_message_login").html('Your user profile has been disabled').show();
					
					// $("#display_message").html("Error Check your form and Correct it");
					$("#display_message_login").show("fast");
				}
				else if(msg=='3'){
					$("#display_message_login").html('<div class="alert alert-danger">Your user profile has been locked</div>').show();
				}
				else if(msg=='4'){
					$("#display_message_login").html('You are not allowed to login on Sunday').show();
				}
				else if(msg=='5'){
					$("#display_message_login").html('You are not allowed to login on Monday').show();
				}
				else if(msg=='6'){
					$("#display_message_login").html('You are not allowed to login on Tuesday').show();
				}
				else if(msg=='7'){
					$("#display_message_login").html('You are not allowed to login on Wednesday').show();
				}
				else if(msg=='8'){
					$("#display_message_login").html('You are not allowed to login on Thursday').show();
				}
				else if(msg=='9'){
					$("#display_message_login").html('You are not allowed to login on Friday').show();
				}
				else if(msg=='10'){
					$("#display_message_login").html('You are not allowed to login on Saturday').show();
				}
				else if(msg=='11'){
					$("#display_message_login").html('You are not allowed to login at this time <br> The time is not within the working hours').show();
				}
               else if(msg=='17'){
					$("#display_message_login").html('Your account has not been approved. <br/> Kindly contact admin').show();
				}
				else if(msg=='12'){
					$("#display_message_login").html('<div class="alert alert-danger">Your profile has been Locked, please contact Administrator</div>').show();
				}
				else if(msg=='13'){
                    swal({
                        icon: 'warning',
                        text: 'Your password has expired',
                      }).then((value)=>{
                            swal({
                                text: "You need to change password , please wait..",
                                icon: "img/loader.gif",
                              });
                           $(".swal-button--confirm").hide();
                           setTimeout(function(){
                               window.location = 'change_password_logon.php?id='+data;
                           },5000);
						});
					}
				else if(msg=='14'){
					$("#display_message_login").html('<div class="alert alert-danger">You are required to change your password, <br><a href="change_password_logon.php?id='+data+'"> click here to change password </a></div>').show();
					
					//$("#display_message_login").html("You are required to change your password, <br><a href='change_password_logon.php?id="+data+"'> click here to change password </a>").show();
				}else if(msg=='15'){
					$("#display_message_login").html("Your account is presently logged into. To logout the current user, <a href='logout_curr.php?id="+data+"'> click here </a>").show();
				}else if(msg=='20'){
					$("#display_message_login").html("Your account is not confirm,").show();
				}
				else{
                    msg = "<br/> you have login attempt remaining";
					$("#display_message_login").html('Invalid username or password '+msg).show();
				}
		   } 
		 });
		//alert(data);
		return false;
}


function geteodstatus(){
   $.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	   data: "op=geteodstatus",
	   success: function(msg){ 
		//alert(msg);
		msg = jQuery.trim(msg);
		//////////////ERROR//////////////
		$("#eodst").get(0).value = msg;
		
	   } 
  });
}

function chkpassword(opt)
{
//	alert($("#userpassword").val());
//	alert($("#confirm_userpassword").val());
	if($("#userpassword").val()!= $("#confirm_userpassword").val())
	{
		$("#display_message").html('Passwords do not match');
		$("#display_message").show('slow');
		$("#display_message").click();		
		return false;
	}
	else
	{
		$("#display_message").html('');
		$("#display_message").show('slow');
		callpage(opt);
		return true;
	}
}



function getdata(formID)
{
	var data = "";
	$(formID).serialize();
	$.each($("input, select, textarea"), function(i,v) {
	    var theTag = v.tagName;
	    var theElement = $(v);
		var theName = theElement.attr('name');
	    var theValue = escape(theElement.val());
		var classname = theElement.attr('class');
		var elementType = theElement.attr('type');

		if(theElement.hasClass('required-text'))
		{
			//console.log('name : '+theName+"   value :"+theValue+"  class :"+classname);
			if(!check_textvalues(theElement)) data = "error";
		}

		if(theElement.hasClass("required-number"))
		{
			if(!check_numbers(theElement)) data = "error";
		}
		if(theElement.hasClass("required-phone"))
		{
			if(!check_phone(theElement)) data = "error";
		}
		if(theElement.hasClass('required-email'))
		{
			if(!check_email(theElement)) data = "error";
		}
		if(theElement.hasClass('not-required-email'))
		{
			if(!check_email(theElement)) data = "error";
		}
		if(theElement.hasClass('required-alphanumeric'))
		{
			if(!check_password_aplhanumeric(theElement)) data = "error";
		}
		if(theElement.hasClass('required-password'))
		{
			if(!check_password(theElement)) data = "error";
		}
		if(theElement.hasClass('required-captcha'))
		{
			if(!check_captcha(theElement)) data = "error";
		}
		if(theElement.hasClass('required-multiple-select'))
		{
			if(!check_multiselectvalues(theElement)) data = "error";
		}
		if(data!='error')
		{
			if(elementType == 'radio') {
                if(theElement.is(":checked")) {
                    if(theValue.length != 0) {
                        data = data+theName+"="+theValue+"&";
                    }
                    else {
                        data = data+theName+"="+1+"&";
                    }
                }
            }
            else if(elementType == 'checkbox') {
                if(theElement.is(":checked")) {
                    if(theValue.length != 0) {
                        data = data+theName+"="+theValue+"&";
                    }
                    else {
                        data = data+theName+"="+1+"&";
                    }
                }
                else {
                    data = data+theName+"="+0+"&";
                }
            }
            else {
                data = data+theName+"="+theValue+"&";
            }

            $("#display_message").removeClass('alert alert-danger').hide('fast');
		}
	});
	//alert(data);
	return data;
}

replace:




function callpage(page)
{ 
	
	$("#display_message").html("");
	var data = getdata();
	//alert(data);
	if(data!='error')
	{
		
		//console.log("Go to payment page :::: "+data);
		//$("#display_message").ajaxStart(function(){
			$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;processing request please wait . . .'});
		//});

        var url = "../utilities.php"; //$("#name").val();
        if ($("#msg").val() == "out") {

             url = "utilities.php"; //$("#name").val();
        }

		$.ajax({ 
		   type: "POST", 
		   url: url, 
		   data: "op="+page+"&"+data, 
		   success: function(msg){ 
		  // alert(data);
			// console.log( msg ); 
			 //alert(msg);
			  $("#display_message").show("fast");
			  msg = jQuery.trim(msg)
			  //alert(msg);
				$.unblockUI();
               if(page == "save_user")
				{
					var myMsgTest = msg.split("::||::");
					if(myMsgTest[0]==1){
					// $("#display_message").html(myMsgTest[1]);
					$('#display_message').removeClass('alert alert-success');
					$('#display_message').removeClass('alert alert-danger');
					$('#display_message').addClass('alert alert-success');
					$("#display_message").html(myMsgTest[1]);
					$("#display_message").show('fast');
					 setTimeout(function() {
						getpage('user_list.php','page');
					}, 2000);
					}else{
						$('#display_message').removeClass('alert alert-danger');
						$('#display_message').removeClass('alert alert-success');
						$('#display_message').addClass('alert alert-danger');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show('fast');
					}
					//location.reload();
				}
				else if(msg == 1 && page == "checklogin")
				 { 
					$('#display_message').removeClass('alert alert-success');
					$('#display_message').removeClass('alert alert-danger');
					$('#display_message').addClass('alert alert-success');
					$("#display_message").html("Login Successful");
			 		$("#display_message").show("fast");
					 //getpage('reg_confirmation.php','main_body');
					 $("#form1").attr("action","home.php");
				 	$("#form1").submit();
				}else if(page == "save_menu")
				 { 
					var myMsgTest = msg.split("::||::");
					if(myMsgTest[0]==1){
					// $("#display_message").html(myMsgTest[1]);
					$('#display_message').removeClass('alert alert-success');
					$('#display_message').removeClass('alert alert-danger');
					$('#display_message').addClass('alert alert-success');
					$("#display_message").html(myMsgTest[1]);
					$("#display_message").show('fast');
					 setTimeout(function() {
						getpage('menu_form.php','page');
					}, 2000);
					}else{
					
////
						$('#display_message').removeClass('alert alert-danger');
						$('#display_message').removeClass('alert alert-success');
						$('#display_message').addClass('alert alert-danger');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show('fast');
					}

				}
				
				else if(page == "contact_save")
				 { 
					var myMsgTest = msg.split("::||::");
					if(myMsgTest[0]==1){
						console.log("")
					// $("#display_message").html("Save Successful");
					//  $("#display_message").show("fast");
					
						$('#display_message').removeClass('alert alert-success');
						$('#display_message').removeClass('alert alert-danger');
						$('#display_message').addClass('alert alert-success');
						$("#display_message").html("Save Successful");
						$("#display_message").show('fast');

						$("#fullname").val("");
						$("#email").val("");
						$("#Message").val("");
					 
					}else{ 
						$('#display_message').removeClass('alert alert-danger');
						$('#display_message').removeClass('alert alert-success');
						$('#display_message').addClass('alert alert-danger');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show('fast');

					}

				}
				else if(page == "number_plate")
				 {
					 msg = JSON.parse(msg);
					 if(msg['status']=="102"){
						// $("#error_load").text(msg['message']);
						$("#genuine_load").text(msg['genuine']);
						$("#make_load").text(msg['make']);
						$("#model_load").text(msg['model']);
						$("#type_load").text(msg['type']);
						$("#colour_load").text(msg['colour']); 
						$("#display_message").html(msg['status']);
						$("#display_message").show("fast");
						var htmlString = $('#numberplateload').html();
						$('#number_plate_load').html(htmlString);  
					 }
					 else if(msg['status']=="00"){
						// $("#error_load").text(msg['message']);
						$("#validity_load").text(msg['validity']);
						$("#expiry_date").text(msg['expiry_date']);
						$("#genuine_load1").text(msg['genuine']);
						 
						var htmlString = $('#numberplateloadv').html();
						$('#number_plate_load').html(htmlString);  
					 }else if(msg['status']=="500"){
						 
						
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else if(msg['status']=="200"){
						 
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else if(msg['status']=="100"){
						
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else{

					 } 	
				}
				
				else if(page == "number_platew")
				 {
					 msg = JSON.parse(msg);
					 if(msg['status']=="102" || msg['status']=="200"){
						$("#validity_loadw").text(msg['validity']);
						$("#expiry_datew").text(msg['expiry_date']);
						$("#genuine_loadw").text(msg['genuine']);

						$("#display_message").html(msg['status']);
						$("#display_message").show("fast"); 
						var htmlString = $('#numberplateloadw').html();
						$('#number_plate_load').html(htmlString);  
					 }else if(msg['status']=="500"){
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else if(msg['status']=="20220"){
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else if(msg['status']=="100"){
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else if(msg['status']=="101"){
						 
						$('#display_message').removeClass('error'); 
						$('#display_message').addClass('error');
						$("#display_message").html(msg['message']);
						$("#display_message").show("fast");
					 }else{

					 } 	
				}
				 
				else if(page == "save_password")
				 { 
					 var myMsgTest = msg.split("::||::");
					if(myMsgTest[0]==1){
						$('#display_message').removeClass('alert alert-success');
					$('#display_message').removeClass('alert alert-danger');
					$('#display_message').addClass('alert alert-success');
					$("#display_message").html(myMsgTest[1]);
					 $("#display_message").show("fast");
					 
					 //getpage('reg_confirmation.php','main_body');
					//  $("#form1").attr("action","home.php");
				 	// $("#form1").submit();	
					}else{
						
						$('#display_message').removeClass('alert-danger');
						$('#display_message').removeClass('alert-success');
						$('#display_message').addClass('alert-danger');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show("fast");
					}
				 		
				}
				else if(page=="drts")
				{ 
					var myMsgTest = msg.split("::||::");
					
					// console.log("Go to payment page >>>>>"+myMsgTest[0].trim()+"<<<<");
					if(myMsgTest[0]==1)
					{
						/*$('#display_message').removeClass('alert alert-success');
						$('#display_message').removeClass('alert alert-danger');
						$('#display_message').addClass('alert alert-success');
						$("#display_message").html("Registration Successful");
						$("#display_message").show("fast");
						setTimeout(function() {
							 $("#display_message").html("Thank You");
							 
						}, 1500);*/
						// console.log("Go to payment page :::: ");
						swal({
							title: "Data Saved",
							text: myMsgTest[1],
							icon: "success",
							button: {
								cancel: true,
								confirm: "Submit"
							}
						});
						
						setTimeout(function() {
							$("#personalInfoForm").attr("action","payment_option.php");
							$("#personalInfoForm").submit();
							 
						}, 3000);
						
					
					}else{
						swal({
							title: "Warning",
							text: myMsgTest[1],
							icon: "warning",
							button: {
								cancel: true,
								confirm: "Submit"
							}
						});
						/*
						$('#display_message').removeClass('alert-danger');
						$('#display_message').removeClass('alert-success');
						$('#display_message').addClass('alert-danger');
						$("#display_message").html("Error Check your form and Correct it");
						$("#display_message").show("fast");*/
					} 
				}
				else if(page=="save_password_logon")
				{ 
					var myMsgTest = msg.split("::||::");
					
					if(myMsgTest[0]==1)
					{
				
						$('#display_message').removeClass('alert-danger');
						$('#display_message').removeClass('alert-success');
						$('#display_message').removeClass('alert-warning');
						$('#display_message').addClass('alert-success');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show("fast");
						
						setTimeout(function() {
							window.location='login.php';
							 
						}, 3000);
						
					
					}else{
						$('#display_message').removeClass('alert-success');
						$('#display_message').removeClass('alert-warning');
						$('#display_message').removeClass('alert-danger');
						$('#display_message').addClass('alert-danger');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show("fast");
					} 
				}
				else if(page=="password_recovery")
				{ 
					var myMsgTest = msg.split("::||::");
					
					if(myMsgTest[0]==1)
					{
				
						$('#display_message').removeClass('alert-danger');
						$('#display_message').removeClass('alert-success');
						$('#display_message').removeClass('alert-warning');
						$('#display_message').addClass('alert-success');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show("fast");
						
						setTimeout(function() {
							window.location='login.php';
							 
						}, 3000);
						
					
					}else{
						$('#display_message').removeClass('alert-success');
						$('#display_message').removeClass('alert-warning');
						$('#display_message').removeClass('alert-danger');
						$('#display_message').addClass('alert-danger');
						$("#display_message").html(myMsgTest[1]);
						$("#display_message").show("fast");
					} 
				}
				else if(page == "continue_registration")
				{ 
					var myMsgTest = msg.split("::||::");

					//console.log(myMsgTest);
						if(myMsgTest[0]=='1')
						{
							$('#display_message').removeClass('alert alert-success');
							$('#display_message').removeClass('alert alert-danger');
							$('#display_message').removeClass('alert-warning');
							$('#display_message').addClass('alert alert-success');
							$("#display_message").html("Login Successful");
							$("#display_message").show("fast");
							$("#form1").attr("action","driving_school_form.php");
							$("#form1").submit();
						}else if(myMsgTest[0]=='112'){
							$("#form1").attr("action","driving_school_form.php");
							$("#form1").submit();
						}else if(myMsgTest[0]=='20'){
							$('#display_message').removeClass('alert-danger');
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-warning');
							$('#display_message').addClass('alert-warning');
							$("#display_message").html("Your account is yet to be confirmed.<br /> Kindly check your inbox for the confirmation email that was sent to you.<br /> Thank you!");
							$("#display_message").show("fast");
							// $("#form1").attr("action","payment_option.php");
							// $("#form1").submit();
						}else if(myMsgTest[0]=='111'){
							$('#display_message').removeClass('alert alert-success');
							$('#display_message').removeClass('alert alert-danger');
							$('#display_message').removeClass('alert-warning');
							$('#display_message').addClass('alert alert-success');
							$("#display_message").html("Login Successful");
							$("#display_message").show("fast");
							$("#form1").attr("action","payment_option.php");
							$("#form1").submit();
						}else if(myMsgTest[0]=='114'){
							$('#display_message').removeClass('alert-danger');
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-warning');
							$('#display_message').addClass('alert-danger');
							$("#display_message").html("Registration Completed!<br /> Kindly, login to the portal by clicking the login button above or <a href='javascript:void(0)' data-toggle='modal' data-target='#loginModal'>click here</a> <br /> Thank You!");
							$("#display_message").show("fast");
							
						}else{
							
							$('#display_message').removeClass('alert-danger');
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-warning');
							$('#display_message').addClass('alert-danger');
							$("#display_message").html("Invalid Username or Password");
							$("#display_message").show("fast");
						}
						
						/////

						// else if(msg=='111'){
						// 	$("#form1").attr("action","payment_option.php");
						// 	$("#form1").submit();
						// }
						// else if(msg=='113'){
						// 	$("#form1").attr("action","driving_school_form.php");
						// 	$("#form1").submit();
						// }
					
				}
				else 
				{
					 var myMsgTest = msg.split("::||::");
						if(myMsgTest[0]=='1')
						{ 
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-danger');
							$('#display_message').addClass('alert-success');
							$("#display_message").html(myMsgTest[1]);
							$("#display_message").show('fast');
							$("#display_message").show('fast');
							$("#display_message").html(myMsgTest[1]);
					 		$("#display_message").show("fast");
							
						}else
						{
                           // alert("here");
							$('#display_message').removeClass('alert-danger');
							$('#display_message').removeClass('alert-success');
							$('#display_message').addClass('alert-danger');
							$("#display_message").html(myMsgTest[1]);
							$("#display_message").show('fast');
							$("#display_message").show('fast');
							$("#addopt").show('fast');
							$("#display_message").html(myMsgTest[1]);
					 		$("#display_message").show("fast");
						}
					
					
				if(msg.indexOf("Error")<0)
				{
				
					if(page=='save_role')
					{
					getpage('role_list.php','page');
					}
					
					if(page=='save_user')
					{
						// alert(msg);
						var idss = $("#email").val();
						var role_id_pix = $("#role_id").val();
						if(msg == 1) // check if it's a superAgent Registration, if so upload RC certificate
						{
							if(role_id_pix == 002)
							{
								uploadFiles(idss,role_id_pix);
							} 
							else
							{
								$('#display_message').removeClass('alert-success');
								$('#display_message').removeClass('alert-danger');
								$('#display_message').addClass('alert-success');
								$("#display_message").html("User record saved successfully");
							}
						}elseif(msg != 1)
						{
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-danger');
							$('#display_message').addClass('alert-danger');
							$("#display_message").html("Failed to save user details");
							// setTimeout(function() {
							// 	getpage('agents_list.php','page');
							// }, 7000);
						}
					}
					
					
				
				}
			}
		  }
 	  });
		//alert('yes');
	} else {
		$('#display_message').removeClass('alert-danger');
		$('#display_message').removeClass('alert-success');
		$('#display_message').addClass('alert-danger');
		$("#display_message").html('There was an error on the form');
		$("#display_message").show("fast");
	}
}


function callpagenew(page)
{
	
	//alert(page);
	var data = getdata();
	//alert(data);
	if(data!='error')
	{
		
		//$("#display_message").ajaxStart(function(){
			$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;processing request please wait . . .'});
		//});

		$.ajax({ 
		   type: "POST", 
		   url: "../utilities.php", 
		   data: "op="+page+"&"+data, 
		   success: function(msg){ 
		  // alert(data);

			 console.log( msg ); 
			 //alert(msg);
			  $("#display_message").show("fast");
			  msg = jQuery.trim(msg)
			  //alert(msg);
			$.unblockUI();
               if(page == "save_user")
                   {
                       location.reload();
				   }
				   else if(msg == 1 && page == "checklogin")
				 { 
					$("#display_message").html("Login Successful");
			 		$("#display_message").show("fast");
					 //getpage('reg_confirmation.php','main_body');
					 $("#form1").attr("action","home.php");
				 $("#form1").submit();
				} else if(page == "save_lp")
				{ 
					var myMsg = msg.split("::||::");

					if (myMsg[0] == 200) {

						
						doFilesUpload(myMsg[1], myMsg[2]);
						//showPaymentModal('paymentModalLP', 'paymentModalLP-modal', myMsg[1], myMsg[2]);
						//$("#display_message").removeClass('alert alert-danger').addClass('alert alert-success').html("Application detail has been successfully saved. Please, wait to make payment");
						//getpage("../admin/payment_page.php?payer_id="+myMsg[1]+"&trans_type="+myMsg[2], "page");
						
					} else if (myMsg[0] == 400){
						//$("#display_message").removeClass('alert alert-success').addClass('alert alert-danger').html(myMsg[1]); 
						swal({
							title: "Warning",
							text: myMsg[1],
							icon: "warning",
							button: {
								cancel: true
								//confirm: "Submit"
							}
						});
					}
					$("#display_message").show("fast");
					 
			    } else if(page == "save_contactus")
				{ 
					var myMsg = msg.split("::||::");
					if(myMsg[0]=='-9')  {
						$("#display_message").html("Application already exist, please enter an application name"); 
					} else if (myMsg[0] > 0) { 
						$("#display_message").html("Application detail has been successfully saved"); 
						setTimeout(function(){
							// getpage('fctevreg_lp_receipt.php?appl_id='+myMsg[1],'page');
							getpage('payment_option.php?appl_id='+myMsg[1],'page');
						}, 2000);
					} else {
						$("#display_message").html("Error : Please check Application detail"); 
					}
					$("#display_message").show("fast"); 
						
							
					 
			   }
				else 
				{
					 var myMsgTest = msg.split("::||::");
						if(myMsgTest[0]=='1')
						{ 
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-danger');
							$('#display_message').addClass('alert-success');
							$("#display_message").html(myMsgTest[1]);
							$("#display_message").show('fast');
							$("#display_message").show('fast');
							$("#display_message").html(myMsgTest[1]);
					 		$("#display_message").show("fast");
							
						}else
						{
                           // alert("here");
							$('#display_message').removeClass('alert-danger');
							$('#display_message').removeClass('alert-success');
							$('#display_message').addClass('alert-danger');
							$("#display_message").html(myMsgTest[1]);
							$("#display_message").show('fast');
							$("#display_message").show('fast');
							$("#addopt").show('fast');
							$("#display_message").html(myMsgTest[1]);
					 		$("#display_message").show("fast");
						}
					
					
				if(msg.indexOf("Error")<0)
				{
				
					if(page=='save_role')
					{
					getpage('role_list.php','page');
					}
					
					if(page=='save_user')
					{
						// alert(msg);
						var idss = $("#email").val();
						var role_id_pix = $("#role_id").val();
						if(msg == 1) // check if it's a superAgent Registration, if so upload RC certificate
						{
							if(role_id_pix == 002)
							{
								uploadFiles(idss,role_id_pix);
							} 
							else
							{
								$('#display_message').removeClass('alert-success');
								$('#display_message').removeClass('alert-danger');
								$('#display_message').addClass('alert-success');
								$("#display_message").html("User record saved successfully");
							}
						}elseif(msg != 1)
						{
							$('#display_message').removeClass('alert-success');
							$('#display_message').removeClass('alert-danger');
							$('#display_message').addClass('alert-danger');
							$("#display_message").html("Failed to save user details");
							// setTimeout(function() {
							// 	getpage('agents_list.php','page');
							// }, 7000);
						}
					}
					
					if(page=='save_menu')
					{
					getpage('menu_list.php','page');
					}
				
				}
			}
		  }
 	  });
		//alert('yes');
	}
}


function openInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
  }

function FilesUpload(id)
{
  // alert(id);
   //event.stopPropagation(); // Stop stuff happening
   //event.preventDefault(); // Totally stop stuff happening

	// START A LOADING SPINNER HERE

	// Create a formdata object and add the files
	//var j = jQuery.noConflict();
	var data = new FormData();
	  $.each(files, function(key, value)
	  {
		  //console.log(id);
		  data.append(key, value);
		  //alert (data);
	  });
    /*var fields = $( ":file" ).serializeArray();
	alert(fields);
    	jQuery.each( fields, function( i, field ) {
     	data.append( field.value);
    });*/
	//alert(id);
	$.ajax({
		url: 'drts_fileupload.php?filess&id='+id,
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false, // Don't process the files
		contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		success: function(data, textStatus, jqXHR)
		{
			//alert(data);
			if(typeof data.error === 'undefined')
			{
				// Success so call function to process the form
				//submitForm(event, data);
				console.log(data);
//                    alert("done");
			}
			else
			{
				//alert('not undefined yet failed');
				// Handle errors here
				console.log('ERRORS: ' + data.error);
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			//alert ('errorThrown is '+jqXHR + '  and text status is '+ textStatus);
			// Handle errors here
 	
			$("#ticker").html(msg);
			 $("#ticker").show("fast");

							   } 
		 });
	//}
}

function check_textvalues(formElement)
{
	if(triminput(formElement.val())==''){
		$("#display_message").html('please enter value for :'+formElement.attr('title')+"");
		$("#display_message").addClass('alert alert-danger').show('fast');
		$(formElement).addClass('has-error');
		formElement.focus();
		$("#display_message").click();
		return false;
	}
	else {
		$(formElement).removeClass('has-error');
		return true;
	}
}

function check_numbers(formElement)
{
		if(triminput(formElement.val())==''){
			$("#display_message").html('please enter number for : '+formElement.attr('title')+"");
			$("#display_message").addClass('alert alert-danger').show('fast');
			$(formElement).addClass('has-error');
			formElement.focus();
			$("#display_message").click();
			return false;
		}
		else if(isNaN(formElement.val())){
			$("#display_message").html('please enter number for : '+formElement.attr('title')+"");
			$("#display_message").show('fast');
			formElement.focus();
			$("#display_message").click();
			return false;
		}
		else {
			$(formElement).removeClass('has-error');
			return true;
		}
}

function check_email(formElement)
{
	var emails = formElement.val();
	emailRegEx = /^[^@]+@[^@]+.[a-z]{2,}$/i;
	if (emails=="")return true;
	if((formElement.val()).search(emailRegEx) == -1)
	{
		$("#display_message").html('<div class="alert alert-danger">please enter valid email for : '+formElement.attr('title')+"</div>");
		$("#display_message").addClass('alert alert-danger').show('fast');
		$(formElement).addClass('has-error');
		formElement.focus();
		$("#display_message").click();
		return false;
	}
	else {
		$(formElement).removeClass('has-error');
		return true;
	}
}

function check_captcha(formElement)
{
	var captcha = formElement.val();
	var captcha_sess = $('#captcha_sess').val();
	//alert(captcha);
	//alert(captcha_sess);
	if(captcha != captcha_sess)
	{
		$("#display_message").html('<div class="alert alert-danger">Please Enter Figures Displayed in ImageCaptcha into textbox above</div>');
		$("#display_message").show('fast');
		formElement.focus();
		$("#display_message").click();
		return false;
	}
	else return true;
}

function check_password_aplhanumeric(formElement)
{
		var f1 = /[A-Z]/
		var f2 = /[a-z]/
		var f3 = /[0-9]/
		
		if((f1.test(formElement.val()) || f2.test(formElement.val())) && f3.test(formElement.val())){
		//alert('passed');
        return true;
		}else {
		$("#display_message").html('<div class="alert alert-danger">please enter alphanumeric as password</div>');
		$("#display_message").show('fast');
		//alert('failed');
		formElement.focus();
		$("#display_message").click();
		return false;
		}
		
}



function doFilesUpload(id, trans_type)
{
  
	var formdata = new FormData();
	  $.each(files, function(key, value)
	  {
		formdata.append(key, value);
	  });

	jQuery.ajax({
		type: "POST",
		url: 'drts_fileupload.php?filess&id='+id,
		processData: false,
		contentType: false,
		cache:false,
		data: formdata,
		success: function (responses) {

			var resp = JSON.parse(responses);
			//alert(responses);
			if(resp['code'] == '200')
			{
				$('#paymentPageLoading').modal({
					backdrop: 'static',
					keyboard: false
				})

				$('#btn_exampleWizardFormContainer').attr("disabled", "disabled");
				setTimeout(function(){
					getpage("../admin/payment_page.php?payer_id="+id+"&trans_type="+trans_type, "page");
				}, 3000);

			}
			else
			{
				swal({
					title: "Warning",
					text: resp['msg'],
					icon: "warning",
					button: {
						cancel: true
						//confirm: "Submit"
					}
				});
			}
		}
		
	});
}


function check_password(formElement)
{
var password = formElement.val();
var errorval = '';
var passed = validatePassword(password, {
	length:   [6, 8],
	lower:    0,
	upper:    0,
	numeric:  0,
	special:  0,
	badWords: ["password", "steven", "levithan"],
	badSequenceLength: 4
});
	if((!chkpassword()) || (!passed)) 
	{
		$("#display_message").html(errorval);
		$("#display_message").show('fast');
		//alert('failed');
		formElement.focus();
		$("#display_message").click();
		return false;
	}
}

function triminput(inputString) 
{
	return $.trim(inputString);
}

function checkOption(obj)
{
	if(obj.checked){
		obj.value='1';
	}else{
		obj.value='0';
		obj.checked=false;
		//alert(obj.value);
	}
}

function ttoggleOption()
{
	$.each($('input:checkbox'), function(i,v) {
		  if ($(this).is(':checked')){
			   $(this).val('1');
		  }else{
			   $(this).val('0');
		  }
	});
}

function callpagepost(str,divid){
//	 $("#form1").attr("target","");
	// $("#form1").attr("action",returnpage);
	 //$("#form1").submit();
 
	var data = getdata();
	
	if(data!='error')
	{		
		//$("#display_message").ajaxStart(function(){
			$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
		//});

	//alert(data);
			/*
			$(divid).ajaxStart(function(){
			$(divid).html('');
			$(divid).html('<img src="images/loading.gif" alt="" />loading please wait . . .');
			});
			*/
			if(str!='#'){
				//trapSession();
				
				
				$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'});
				//$("#display_message").html('<img src="images/loading.gif" alt="" />loading please wait . . .');
				
			$.ajax({ 
			   type: "POST", 
			   url: str, 
			   data: data, 
			   success: function(msg){ 
				 //alert( "Data Saved: " + msg ); 
				 //alert(msg);
				 
				 
				 
				 $('#'+divid).html(msg);
				 $.unblockUI();
				 //$("#display_message").html("");
			   } 
			 });
			/*	
			 $(divid).ajaxComplete(function(){ 
				$(divid).html(""); 
			 });
			*/
			}// end if


	}

}

function getpage(str,divid) 
{
	var data = getdata();
	if(str!='#'){
		$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'});
			$.ajax({ 
			   type: "POST", 
			   url: str, 
			   data: data,
			   error: function(x, t, m) {
				  $.unblockUI();
				   $.blockUI({ message:'Error Loading Page'});
				   setTimeout(function(){$.unblockUI()},2000);
				   },
			   success: function(msg){
				 $('#'+divid).html(msg).animate();
				 $.unblockUI();
				 $("#display_message").html("");
			   } 
			 });
			 
			}// end if
}

function doSearch(url)
{
	//alert('Got here');
	//$("#form1").submit();
	var data = getdata();
	//alert("@ Search : "+data);
	//loadpage('branch_list.php',data,'page');
	getpage(url+'?'+data,'page');
}
function doSearch1(url,divid)
{
	//alert('Got here');
	//$("#form1").submit();
	var data = getdata();
	//alert("@ Search : "+data);
	//loadpage('branch_list.php',data,'page');
	getpage(url+'?'+data,divid);
}



function goFirst(dpage)
{
	var lpage = parseInt($("#tpages").val());
	var fpage = parseInt($("#fpage").val());
	if(fpage!=1){
		$("#fpage").get(0).value = '1';
		$("#pageNo").get(0).value = 1;
		doSearch(dpage);
	}else{
		return false;
	}
}

function goLast(dpage)
{
	var lpage = parseInt($("#tpages").val());
	var fpage = parseInt($("#fpage").val());
	if(lpage!=fpage){
		$("#fpage").get(0).value = lpage;
		$("#pageNo").get(0).value = lpage;
		doSearch(dpage);
	}else{
		return false;
	}

}

function goPrevious(dpage)
{
	var lpage = parseInt($("#tpages").val());
	var fpage = parseInt($("#fpage").val());
	if(fpage !=1){
		$("#fpage").get(0).value = fpage-1;
		$("#pageNo").get(0).value = fpage-1;
		doSearch(dpage);
	}else{
		return false;
	}

}

function goNext(dpage)
{
	var lpage = parseInt($("#tpages").val());
	var fpage = parseInt($("#fpage").val());
	if((lpage > fpage)){
		$("#fpage").get(0).value = fpage+1;
		$("#pageNo").get(0).value = fpage+1;
		doSearch(dpage);
	}else{
		return false;
	}

}

function doClickAll(form) 
{
	var form = document.getElementById("form1");
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].type == "checkbox") {
			if ( !form.elements[i].checked ) { form.elements[i].click();
			}
		}
    }
	return true;
}

function doUnClickAll(form) 
{
	for (var i = 0; i < form.elements.length; i++) {
		if ( form.elements[i].type == "checkbox") {
			if (  form.elements[i].checked ) { form.elements[i].checked = false;
			}
		}
	}
	return true;
  }

 
function checkSelected(form, url)
{
  //var form = document.forms[0];
  var parString = "";
  var delcount = 0;
  for(var i = 0; i < form.elements.length; ++i)
   if(form.elements[i].type == "checkbox" & form.elements[i].name == 'chkopt')
    if(form.elements[i].checked == true){
    	delcount++;
      parString =  parString + "-" + form.elements[i].value+"-, ";
      }

  if(parString == "") {
   window.alert("Select record(s) to continue...");
   return (false);
  }
  else {
	//delcount = delcount - 1;
	form.var1.value = parString;
	form.op.value = 'del';
  	ans=window.confirm("You have selected " + delcount + " record(s), Are your sure ?")
  	if (ans == 1){doSearch(url);
	return false;
	}
	else return false;
   }
  }
function checkSelected1(form, url, divid)
{
  //var form = document.forms[0];
  var parString = "";
  var delcount = 0;
  for(var i = 0; i < form.elements.length; ++i)
   if(form.elements[i].type == "checkbox" & form.elements[i].name == 'chkopt')
    if(form.elements[i].checked == true){
    	delcount++;
      parString =  parString + "-" + form.elements[i].value+"-, ";
      }

  if(parString == "") {
   window.alert("Check Friend(s) to continue...");
   return (false);
  }
  else {
	//delcount = delcount - 1;
	form.var1.value = parString;
	form.op.value = 'del';
  	ans=window.confirm("You have selected " + delcount + " Friend(s), Are your sure ?")
  	if (ans == 1){doSearch1(url,divid);
	return false;
	}
	else return false;
   }
  }
  
function printDiv(seldiv)
{
  var divToPrint=document.getElementById(seldiv);
  var newWin=window.open();
  newWin.document.open();
  newWin.document.write('<html><link rel="stylesheet" type="text/css" href="css/stylesheets.css"></link><link rel="stylesheet" type="text/css" href="css/printcss.css"></link><body><div class="block-fluid clearfix">'+divToPrint.innerHTML+'</div></body></html>');
  newWin.document.close();
  //setTimeout(function(){newWin.close();},20);
}

function printReceipt(seldiv)
{
  var divToPrint=document.getElementById(seldiv);
  var newWin=window.open();
  /*newWin.document.open();*/
  newWin.document.write('<html><link rel="stylesheet" type="text/css" href="css/style.css"><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
  newWin.document.close();
  //setTimeout(function(){newWin.close();},20);
}


function blockUIDiv(divid)
{
	//$('#'+divid).click(function() { 
        $.blockUI({ message: $('#'+divid) }); 
 
        //setTimeout($.unblockUI, 2000); 
    //}); 
}
function calldialog(divid){
//$('#'+divid).dialog();
$.blockUI({ message: $('#'+divid) });
setTimeout($.unblockUI, 2000);
}

function loadroles(){
	var data = escape($('#menu_id').val());
   $.ajax({ 
	   type: "POST", 
	   url: "../utilities.php", 
	   data: "op=getnonexistrole&menu_id="+data, 
	   success: function(msg){ 
		 //alert( "Data Saved: " + msg ); 
		 //alert(data);
		 $("#non_exist_role").html(msg);
		 //$("#display_message").show("fast");
	   } 
  });
   // for existing roles
   $.ajax({ 
	   type: "POST", 
	   url: "../utilities.php", 
	   data: "op=getexistrole&menu_id="+data, 
	   success: function(msg){ 
		 //alert( "Data Saved: " + msg ); 
		 //alert(data);
		 $("#exist_role").html(msg);
		 //$("#display_message").show("fast");
	   } 
  });  
}

function moveuprole() {
   var listField = document.getElementById('exist_role');
   if ( listField.length == -1) {  // If the list is empty
      alert("There are no values which can be moved!");
   } else {
      var selected = listField.selectedIndex;
      if (selected == -1) {
         alert("You must select an entry to be moved!");
      } else {  // Something is selected
         if ( listField.length == 0 ) {  // If there's only one in the list
            alert("There is only one entry!\nThe one entry will remain in place.");
         } else {  // There's more than one in the list, rearrange the list order
            if ( selected == 0 ) {
               alert("The first entry in the list cannot be moved up.");
            } else {
               // Get the text/value of the one directly above the hightlighted entry as
               // well as the highlighted entry; then flip them
               var moveText1 = listField[selected-1].text;
               var moveText2 = listField[selected].text;
               var moveValue1 = listField[selected-1].value;
               var moveValue2 = listField[selected].value;
               listField[selected].text = moveText1;
               listField[selected].value = moveValue1;
               listField[selected-1].text = moveText2;
               listField[selected-1].value = moveValue2;
               listField.selectedIndex = selected-1; // Select the one that was selected before
            }  // Ends the check for selecting one which can be moved
         }  // Ends the check for there only being one in the list to begin with
      }  // Ends the check for there being something selected
   }  // Ends the check for there being none in the list
}//endmoveuprole() 
  
  
  
  function movedownrole() {
	var listField = document.getElementById('exist_role');
   if ( listField.length == -1) {  // If the list is empty
      alert("There are no values which can be moved!");
   } else {
      var selected = listField.selectedIndex;
      if (selected == -1) {
         alert("You must select an entry to be moved!");
      } else {  // Something is selected
         if ( listField.length == 0 ) {  // If there's only one in the list
            alert("There is only one entry!\nThe one entry will remain in place.");
         } else {  // There's more than one in the list, rearrange the list order
            if ( selected == listField.length-1 ) {
               alert("The last entry in the list cannot be moved down.");
            } else {
               // Get the text/value of the one directly below the hightlighted entry as
               // well as the highlighted entry; then flip them
               var moveText1 = listField[selected+1].text;
               var moveText2 = listField[selected].text;
               var moveValue1 = listField[selected+1].value;
               var moveValue2 = listField[selected].value;
               listField[selected].text = moveText1;
               listField[selected].value = moveValue1;
               listField[selected+1].text = moveText2;
               listField[selected+1].value = moveValue2;
               listField.selectedIndex = selected+1; // Select the one that was selected before
            }  // Ends the check for selecting one which can be moved
         }  // Ends the check for there only being one in the list to begin with
      }  // Ends the check for there being something selected
   }  // Ends the check for there being none in the list
}// endmovedown
 
  
  
function addrole(){
	return !$('#non_exist_role option:selected').remove().appendTo('#exist_role'); 
}
function removerole(){
	return !$('#exist_role option:selected').remove().appendTo('#non_exist_role');
}
function selectalldata(){
	$("#exist_role *").attr("selected","selected");
}

function toggleOption(){
	$("input[type=checkbox]").each(
		  function() {
		   if($(this).is(':checked')){
		   var idname = $(this).attr('id');
		    $(this).val(idname);
			//alert($(this).val());
		   }else{
		   		$(this).val('');
		   }
		  }
	);
	
}

function Resize(imgId,division_1, division_2)
{
  var img = document.getElementById(imgId);
  var w = img.width, h = img.height;
  w /= division_1; h /= division_2;
  img.width = w; img.height = h;
}


function selectalllist(list){
	$("#"+list+" *").attr("selected","selected");
}
/////////////////

function pageloader(str,divid) 
{ 
	var data = getdata();
	//alert(data);
	if(data!='error') {
	$.ajax({ 
	   type: "POST", 
	   url: str, 
	   data: data, 
	   success: function(msg){ 
		 //alert( "Data Saved: " + msg ); 
		 alert(data);
		 $('#'+divid).html(msg);
		 //$("#display_message").fadeIn("slow");
	   } 
	 });
	}
}
///////////////////////////////////
function moveUpList(listField) {
   if ( listField.length == -1) {  // If the list is empty
      alert("There are no values which can be moved!");
   } else {
      var selected = listField.selectedIndex;
      if (selected == -1) {
         alert("You must select an entry to be moved!");
      } else {  // Something is selected 
         if ( listField.length == 0 ) {  // If there's only one in the list
            alert("There is only one entry!\nThe one entry will remain in place.");
         } else {  // There's more than one in the list, rearrange the list order
            if ( selected == 0 ) {
               alert("The first entry in the list cannot be moved up.");
            } else {
               // Get the text/value of the one directly above the hightlighted entry as
               // well as the highlighted entry; then flip them
               var moveText1 = listField[selected-1].text;
               var moveText2 = listField[selected].text;
               var moveValue1 = listField[selected-1].value;
               var moveValue2 = listField[selected].value;
               listField[selected].text = moveText1;
               listField[selected].value = moveValue1;
               listField[selected-1].text = moveText2;
               listField[selected-1].value = moveValue2;
               listField.selectedIndex = selected-1; // Select the one that was selected before
            }  // Ends the check for selecting one which can be moved
         }  // Ends the check for there only being one in the list to begin with
      }  // Ends the check for there being something selected
   }  // Ends the check for there being none in the list
   return false;
}

function moveDownList(listField) {
   if ( listField.length == -1) {  // If the list is empty
      alert("There are no values which can be moved!");
   } else {
      var selected = listField.selectedIndex;
      if (selected == -1) {
         alert("You must select an entry to be moved!");
      } else {  // Something is selected 
         if ( listField.length == 0 ) {  // If there's only one in the list
            alert("There is only one entry!\nThe one entry will remain in place.");
         } else {  // There's more than one in the list, rearrange the list order
            if ( selected == listField.length-1 ) {
               alert("The last entry in the list cannot be moved down.");
            } else {
               // Get the text/value of the one directly below the hightlighted entry as
               // well as the highlighted entry; then flip them
               var moveText1 = listField[selected+1].text;
               var moveText2 = listField[selected].text;
               var moveValue1 = listField[selected+1].value;
               var moveValue2 = listField[selected].value;
               listField[selected].text = moveText1;
               listField[selected].value = moveValue1;
               listField[selected+1].text = moveText2;
               listField[selected+1].value = moveValue2;
               listField.selectedIndex = selected+1; // Select the one that was selected before
            }  // Ends the check for selecting one which can be moved
         }  // Ends the check for there only being one in the list to begin with
      }  // Ends the check for there being something selected
   }  // Ends the check for there being none in the list
   return false;
}

function validatePassword (pw, options) {
	// default options (allows any password)
	var o = {
		lower:    0,
		upper:    0,
		alpha:    0, /* lower + upper */
		numeric:  0,
		special:  0,
		length:   [0, Infinity],
		custom:   [ /* regexes and/or functions */ ],
		badWords: [],
		badSequenceLength: 0,
		noQwertySequences: false,
		noSequential:      false
	};

	for (var property in options)
		o[property] = options[property];

	var	re = {
			lower:   /[a-z]/g,
			upper:   /[A-Z]/g,
			alpha:   /[A-Z]/gi,
			numeric: /[0-9]/g,
			special: /[\W_]/g
		},
		rule, i;

	// enforce min/max length
	if (pw.length < o.length[0] || pw.length > o.length[1]) {
		errorval = 'Password Minimum Length is '+o.length[0]+' While Maximum Lenght Should not exceed '+o.length[1]; 
		return false;
	}

	// enforce lower/upper/alpha/numeric/special rules
	for (rule in re) {
		if ((pw.match(re[rule]) || []).length < o[rule])
		errorval = 'Password Should contain lower/upper/alpha/numeric/'; 
			return false;
	}

	// enforce word ban (case insensitive)
	for (i = 0; i < o.badWords.length; i++) {
		if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1)
		
			return false;
	}

	// enforce the no sequential, identical characters rule
	if (o.noSequential && /([\S\s])\1/.test(pw))
		return false;

	// enforce alphanumeric/qwerty sequence ban rules
	if (o.badSequenceLength) {
		var	lower   = "abcdefghijklmnopqrstuvwxyz",
			upper   = lower.toUpperCase(),
			numbers = "0123456789",
			qwerty  = "qwertyuiopasdfghjklzxcvbnm",
			start   = o.badSequenceLength - 1,
			seq     = "_" + pw.slice(0, start);
		for (i = start; i < pw.length; i++) {
			seq = seq.slice(1) + pw.charAt(i);
			if (
				lower.indexOf(seq)   > -1 ||
				upper.indexOf(seq)   > -1 ||
				numbers.indexOf(seq) > -1 ||
				(o.noQwertySequences && qwerty.indexOf(seq) > -1)
			) {
				return false;
			}
		}
	}

	// enforce custom regex/function rules
	for (i = 0; i < o.custom.length; i++) {
		rule = o.custom[i];
		if (rule instanceof RegExp) {
			if (!rule.test(pw))
				return false;
		} else if (rule instanceof Function) {
			if (!rule(pw))
				return false;
		}
	}

	// great success!
	return true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////js by SAMABOS//////////////////////////////////

function callpagepost2(page,opt,returnpage,divid)
{
	var data = getdata();
	//alert(data);
	var poststatus = true;
		if(data!='error') 
		{
			//$('#display_message').css({background-image: "url(../images/progress_bar.gif)"});
			$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'});
		//alert(poststatus);
		if(poststatus==true)
		{
			$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op="+page+"&"+data, 
			   success: function(msg){ 
				 //alert( "Data Saved: " + msg ); 
				 //alert(data);
				 $.unblockUI();
				 $("#display_message").html(msg);
				 $("#display_message").show("fast");
				 $("#display_message").click();
				 setTimeout("callresponse('"+returnpage+"','"+divid+"','"+msg+"')",2000);	

		   } 
		 });
		} // end poststatus
	}
}
function josh(page, returnpage, divid) {
    data = $("#form1").serialize();
    // console.log("this is " + data);
    var poststatus = true;
    if (data != "error") {
      $.blockUI({
        message:
          '<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'
      });
      if (poststatus == true) {
        $.ajax({
          type: "POST",
          url: "../utilities.php",
          data: "op=" + page + "&" + data,
          success: function(msg) {
            $.unblockUI();
            $("#display_message").html(msg);
            $("#display_message").show("fast");
			$("#display_message").click();
			pageloader("fctevreg_lp_receipt.php","page");
            setTimeout(
              "callresponse('" + returnpage + "','" + divid + "','" + msg + "')",
              2000
            );
          }
        });
      } // end poststatus
    }
  }
function callresponse(returnpage,divid,msg)
{
	var resp = msg.split("/");
	if(resp[1]=='1')
	{
		$("#display_message").html(resp[0]);
		$("#display_message").show("fast");
		$.unblockUI();
		doSubmit(returnpage,divid);
	}
	else
	{
		$("#display_message").html(resp[0]);
		$("#display_message").show("fast");
		$.unblockUI();
	}
}

function doSubmit(url,pgdiv)
{
	//alert('Got here');
	//$("#form1").submit();
	var data = getdata();
	//alert("@ Search : "+data);
	//loadpage('branch_list.php',data,'page');
	getpage(url+'?'+data,pgdiv);
}








function doTransEntry(page,divd){
//callPageEdit('transaction_extension','','');
	var trans_ext_id = $('#trans_ext_id-fd').val();
	//alert(trans_ext_id);
	//var page = page+"?transId="+trans_ext_id;
	var i = 0;
	var inpname = [];
	$("#form1").serialize();
	$.each($("input, select, textarea"), function(i,v) {
    var theElement = $(v);
	var theName = escape(theElement.attr('name'));
	inpname[i] = theName;
	i += 1;
	});
	
	var data = getdata();
	//alert(data);
	if(data!='error')
	{
		$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'});
		$.ajax({
			async: true,
	   		type: "POST", 
	   		url: "utilities.php", 
	   		data: "op=doTransEntry&"+data+"&inputs="+inpname,
	   		success: function(msg){
				var msgarr = msg.split(':');
				if(msgarr[0]=='SUCCESSFUL' && page != ''){
				$("#display_message").html(msg);
				$("#display_message").show();
				setTimeout("getpage('"+page+"','"+divd+"')",2000);	
					}else{
				$("#display_message").html(msg);
				$("#display_message").show();	
					}
//				setTimeout("getpage('"+pgload+"','"+divd+"')",3000);

			 $.unblockUI();
			}
	     
  		});
  	
  	}
	
}




function callGenMOPTPG(mid){
//generic_merchant_option_page.php
if(mid!=''){
			//	$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'});
				//$("#display_message").html('<img src="images/loading.gif" alt="" />loading please wait . . .');
			$.ajax({ 
			   type: "POST", 
		   		url: "utilities.php", 
		  		data: "op=GenMOPTPG&mid="+mid, 
		  		success: function(msg){ 
				if(msg==1){
						window.location='generic_merchant_option_page.php';
					}
					else{
						//alert("Invalid Merchant Code");
						}
				// $.unblockUI();
				 //$("#display_message").html("");
			   } 
			 });
			
			}// end if

}

function getmerchantcat(str,divid) 
{ 
	//var data = getdata();
	//alert(data);
			/*
			$(divid).ajaxStart(function(){
			$(divid).html('');
			$(divid).html('<img src="images/loading.gif" alt="" />loading please wait . . .');
			});
			*/
			if(str!='#'){
				$('#'+divid).html('<div class="loading"><center><img src="images/285.gif" alt=""/><br>loading please wait . . .</center></div>').animate({ top: 0 }, 500, 'swing')
				//$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;loading please wait . . .'});
				//$("#display_message").html('<img src="images/loading.gif" alt="" />loading please wait . . .');
			//var $dw = $('#nav-dropdown');
			//$dw.animate( 800, 'swing').removeClass('open').addClass('closed');
			$.ajax({ 
			   type: "POST", 
			   url: str, 
			   data: '', 
			   success: function(msg){ 
				 //alert( "Data Saved: " + msg ); 
				 //alert(msg);
				 $('#'+divid).html(msg).animate();
				  var $dw = $('#nav-dropdown');
		 		$dw.removeClass('closed').addClass('open').animate( 800, 'swing');
				 $dw.show();
				 $dw.attr('display','');
				 $('#'+divid).animate({ top: 0 }, 3000, 'swing');
				 //$.unblockUI();
				 //$("#display_message").html("");
			   } 
			 });
			/*	
			 $(divid).ajaxComplete(function(){ 
				$(divid).html(""); 
			 });
			*/
			}// end if
}


function getGenid(data){
	
	   	$.ajax({ 
		   		type: "POST", 
		   		url: "utilities.php", 
		  		data: "op=getGenId&"+data, 
		  		success: function(msg){ 
		   		$("#item_code-whr").get(0).value = msg;
				}
		});
	
	}
function getTbRows(page){
	var data = "merchant_id-whr="+$("#merchant_id-whr").val();
		//alert(data);
		$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});

		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op="+page+"&"+data, 
		  
		   success: function(msg){ 
		  // alert(msg);
		  // if(page=='getItemlist'){
		//	getGenid(data);
		//	   };
		   $("#innertd tbody").html(msg).show('fast');
			//$("#bankname").html(msg);
			//$("#bankname").show("fast");
		   $.unblockUI();
		   }
		 });
	}

function delRow(data,page){
			$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});

		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op="+page+"&"+data, 
		  
		   success: function(msg){ 
		   //alert(msg);
		   //$("#innertd tbody").html(msg).show('fast')
			$("#display_message").html(msg);
			$("#display_message").show('slow');
			if(page=='delRowTransCol'){
			getTbRows('getTransCol');
			}else if(page=='delRowItemlist'){
			getTbRows('getItemlist');
			}
			//$("#bankname").html(msg);
			//$("#bankname").show("fast");
		   $.unblockUI();
		   }
		 });
	}

function getBankname(page)
{
	
	//alert(page);
//var data = getdata();

	//if(data!='error')
	//{
		
		//$("#display_message").ajaxStart(function(){
			//$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
		//});\
		var data = "sort_code-fd="+$("#sort_code-fd").val();
		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op="+page+"&"+data, 
		  
		   success: function(msg){ 
			$("#bankname").html(msg);
			$("#bankname").show("fast");
		   }
		 });
		//alert('yes');
	}
//}


//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////js by Isaiah//////////////////////////////

function doClickAllRef(frmid,obj,str) 
{
	var frm = document.getElementById(frmid);
	if(obj.checked)
	{
		$("#"+str).html("Un-Check All");
		for (var i = 0; i < frm.elements.length; i++)
		{
			if (frm.elements[i].type == "checkbox" && frm.elements[i].name.search(obj.value)!=-1)
			{
				if ( !frm.elements[i].checked )
				{ 
					frm.elements[i].click();
				}
			}
    	}
		return true;
	}else
	{
		obj.checked=true;
		$("#"+str).html("Check All");
		for (var i = 0; i < frm.elements.length; i++)
		{
			if ( frm.elements[i].type == "checkbox" && frm.elements[i].name.search(obj.value)!=-1)
			{
				if (  frm.elements[i].checked ) 
				{ 
					frm.elements[i].checked = false;
				}
			}
		}
		return true;
	}
}

function getItemDetails(str)
{
	//alert(str);
	$("#meti").get(0).value=str;
	
}

function updateUser(strr,str)
{
	//alert('yes');
	//$("#resu").css("text-align", "center");
	if(strr=='101' && str!="")
	{
		$("#resu").html('Welcome '+str+' <font color="#009900">You are now logged in</font>');
		$(".rerun").show();
		$("#resu_recharge").show(); 
		$("#resu_balance").show();	
		$("#error_label_loginn").hide(); 
		$("#sresu").hide();
		return true;
	}else
	{
		$("#display_message").html('Invalid Username or Password');
		$("#display_message").show('fast');
		return false;
	}
}

function validateCustomer(errlb,lgn,formurl,mid)
{
		$('#display_message').ajaxStart(function(){
		});
		if(lgn=='gn1')
		{
			var data = $("#customer_name").val();
			var data2 = $("#customer_pswd").val();
		}else if(lgn=='gn')
		{
			var data = $("#custname").val();
			var data2 = $("#custpswd").val();
		}
		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op=checkCustomerlogin&username="+data+"&password="+data2, 
		   success: function(msg){  
			 msg = jQuery.trim(msg);
			 var retstr = msg.split('|');
			alert(msg); 
			 $("#"+errlb).html('logging you in ...').show();
			 //alert(retstr[0]);
			  if(retstr[0]=='')
			  {
				  $("#"+errlb).html('Please enter a valid Username and Password').show();
			  }
			  else if(retstr[0]=='0')
			  {
				  $("#"+errlb).html('Invalid username or password').show();
			  }
			  else if(retstr[0]=='1')
			  {
				  var custName = retstr[1].toUpperCase()+' '+retstr[2].toUpperCase();
				  $("#resu").html('Welcome '+custName+' <font color="#009900"><br />You are now logged in</font>').css('font-size','10px');
				  $(".rerun").show();
				  $("#resu_recharge").show();
				  $("#balance").html(retstr[3]);
				  $("#resu_balance").show();
				  $("#"+errlb).hide();
				  $("#sresu").hide();
				  //callGenMOPTPG(mid);
				  window.location='generic_merchant_option_page.php';
				  //getpage(formurl,'content');
			  }
			  else if(retstr[0]=='2')
			  {
				  $("#"+errlb).html('Your user profile has been disabled').show();
			  }
			  else if(retstr[0]=='3')
			  {
				  $("#"+errlb).html('Your user profile has been locked').show();
			  }
			  else
			  {
				  $("#"+errlb).html('Invalid username or password').show();
			  }
		   } 
		 });
		//alert(data);
		return false;
}


function checkGateway(str)
{
	$("#reponse_message").hide();
	$("#resp_msg_td").css('border-top','none');
	if(str.name=='vuv' && $("#"+str.id).is(':checked'))
	{
		var mygtw = str.name;
		$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_payment_gateway&pgw="+mygtw, 
			   success: function(msg){
				   //alert(msg);
			   }
		});
		$("#etz").attr('checked',false);
		$("#intsw").attr('checked',false);
		$("#visa").attr('checked',false);
	}else if(str.name=='etz' && $("#"+str.id).is(':checked'))
	{
		var mygtw = str.name;
		$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_payment_gateway&pgw="+mygtw, 
			   success: function(msg){
				   //alert(msg);
			   }
		});
		$("#intsw").attr('checked',false);
		$("#visa").attr('checked',false);
		$("#vuv").attr('checked',false);
	}else if(str.name=='visa' && $("#"+str.id).is(':checked'))
	{
		var mygtw = str.name;
		$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_payment_gateway&pgw="+mygtw, 
			   success: function(msg){
				   //alert(msg);
			   }
		});
		$("#intsw").attr('checked',false);
		$("#etz").attr('checked',false);
		$("#vuv").attr('checked',false);
	}else if(str.name=='intsw' && $("#"+str.id).is(':checked'))
	{
		var mygtw = str.name;
		$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_payment_gateway&pgw="+mygtw, 
			   success: function(msg){
				   //alert(msg);
			   }
		});
		$("#visa").attr('checked',false);
		$("#etz").attr('checked',false);
		$("#vuv").attr('checked',false);
	}else
	{
		var mygtw = 'rev';
		$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_payment_gateway&pgw="+mygtw, 
			   success: function(msg){
				   //alert(msg);
			   }
		});
		$("#visa").attr('checked',false);
		$("#etz").attr('checked',false);
		$("#vuv").attr('checked',false);
	}
	
}


function makePayment(str)
{
	if($("#intsw").is(':checked') || $("#etz").is(':checked') || $("#vuv").is(':checked'))
	{
		var mygtw = $("#amount").val()+"::"+$("#tType").val()+"::"+$("#trDesc").val();
		$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_gateway_parameter&pgw="+mygtw, 
			   success: function(msg){
				   //alert(msg);
				   var myRes = msg.split('::');
				   if(myRes[0]==0)
				   { 
				   		$("#reponse_message").html("No Payment Gateway Selected Yet ! !! !!! ").css('color',"#F00");
				   		$("#reponse_message").show('fast');
				   }
				   else if(myRes[0]=='-1')
				   {
					  getpage(myRes[1],str);
				   }else
				   {
					   //alert(msg);
				   }
			   }
		});
	}else
	{
		$("#reponse_message").html("No Payment Gateway Selected Yet ! !! !!! Select a Payment Gateway and try again").css('color',"#F00");
		$("#resp_msg_td").css('border-top','1px solid #DDDDDD');
		$("#reponse_message").show('fast');
	}
}

	
		function doItemPayment(str)
		{
			$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=set_payment_value&pgw="+str, 
			   success: function(msg){
				   if(msg==1)
				   {
					  getpage('pay_for_item.php','page');
				   }else if(msg==0)
				   {
					   $("#err_messg").html('No Item Selected : Please Select Item and try again');
					}
				   
			   }
			});
		}
		
		function vuvaaPay(str)
		{
			$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=do_vuvaa_payment&pgw="+str, 
			   success: function(msg){
				   msgg = msg.split('::');
				   if(msgg[0]=='1')
				   {
					  $("#balance").html(msgg[1]);
					  $("#"+str).html("Your transaction has been successfully completed.").css({'color':'#999'});
				   }else if(msgg[0]=='2')
				   {
					  $("#"+str).html("ERROR ! !! !!! Invalid transaction details").css({'color':'#999'}); 
				   }else if(msgg[0]=='3')
				   {
					   $("#"+str).html("ERROR ! !! !!! System error has occur").css({'color':'#999'});
				   }else if(msgg[0]=='4')
				   {
					   $("#"+str).html("ERROR ! !! !!! You have insufficient balance to carry out this transaction").css({'color':'#999'});
				   }else if(msgg[0]=='5')
				   {
					   $("#"+str).html("ERROR ! !! !!! Un-Authorized transaction").css({'color':'#999'});
				   }
				   
			   }
			});
		}
		
		
		function resetParamers()
		{
			//alert('yes');
			$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=reset_parameters", 
			   success: function(msg){
				   alert(msg);
			   }
			});
		}
		
		
		function getCustomerDetails(str)
		{
			//alert('yes');
			$("#SubmitBtn").attr("disabled", "disabled");
			var merchant_id = $('#merchant_id-fd').val();
			$("#customerinfo").html('<img src="images/loading.gif" alt="" />loading please wait . . .');
			$("#customerinfo").show("fast");
			$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
			   data: "op=getCustomerDetails&str="+str+"&merchant_id="+merchant_id, 
			   success: function(msg){
				   //alert(msg);
				   if(msg.indexOf('NO DETAILS FOUND')<0)
				   {
					$("#SubmitBtn").removeAttr("disabled");
				   $("#customerinfo").html(msg);
				   $("#customerinfo").show("fast");
				   }
				   else
				   {
				   $("#customerinfo").html(msg);
				   $("#customerinfo").show("fast");
				   }
				   
				   }
			});
		}
		
		
		
function getMoreDetails(str){
	if(str=='505'){
		//$("#pilgrims_photo").show('fast');
		$("#teller").show('fast');
		$("#admin").hide('fast');
		}else if(str=='501' || str=='001'){
		$("#admin").show('fast');
		$("#teller").hide('fast');
		}else{
		//$("#pilgrims_photo").hide('fast');
		$("#teller").hide('fast');
		$("#admin").hide('fast');
		}
	
	}
	
	function calldownload(){
	//
	var data = $('#sql').val();
	var data2 = $('#filename').val();
	//alert(data);
	window.open("download.php?sql="+escape(data)+"&filename="+data2,"mydownload","status=0,toolbar=0");
}




function do_reverse()
{
$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
        //});
		if(getdata()!="error")
		{

        var data ="tid="+ $('#rtrans_id').val() + "&reason=" + $('#reason').val();
        //alert($('#reason').attr('value'));
        $.ajax({ 
           type: "POST", 
           url: "utilities.php", 
           data: "op=transaction_reverse"+"&"+data, 

           success: function(msg){ 
          // alert(data);
                 //alert( "Data Saved: " + msg ); 
                 //alert(msg);
                msg = jQuery.trim(msg)
        	$.unblockUI();
                 //$('#reversal_form').reset();
                 $("#display_message").html(msg);
                 $("#display_message").show("fast");
                $("#display_message").click();

                        //}
           } 
         });
}
}

	
function do_reverse_auth()
{
$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
        //});
		if(getdata()!="error")
		{
        var data ="tid="+ $('#rtrans_id').val();
        //alert($('#reason').attr('value'));
        $.ajax({ 
           type: "POST", 
           url: "utilities.php", 
           data: "op=auth_reversal"+"&"+data, 

           success: function(msg){ 
          // alert(data);
                 //alert( "Data Saved: " + msg ); 
                 //alert(msg);
                  msg = jQuery.trim(msg);
                $.unblockUI();
                 //$('#reversal_form').reset();
                
				 $("#display_message").html(msg);
                 $("#display_message").show("fast");
                $("#display_message").click();
                //$('button[role=button]').slideUp("fast");
                
                        //}
           } 
         });
}
}	
	
	
	
function do_trans_auth()
{
$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
        //});

        var data ="tid="+ $('#rtrans_id').val();
        //alert($('#reason').attr('value'));
        $.ajax({ 
           type: "POST", 
           url: "utilities.php", 
           data: "op=auth_trans"+"&"+data, 

           success: function(msg){ 
          // alert(data);
                 //alert( "Data Saved: " + msg ); 
                 //alert(msg);
                  msg = jQuery.trim(msg);
                $.unblockUI();
                 //$('#reversal_form').reset();
         
				 $("#display_message").html(msg);
                $("#display_message").show("fast");  
                $("#display_message").click();
           } 
         });

}	


function dec_trans_auth()
{
$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
        //});

        var data ="tid="+ $('#rtrans_id').val();
        //alert($('#reason').attr('value'));
        $.ajax({ 
           type: "POST", 
           url: "utilities.php", 
           data: "op=dec_trans"+"&"+data, 

           success: function(msg){ 
          // alert(data);
                 //alert( "Data Saved: " + msg ); 
                 //alert(msg);
                  msg = jQuery.trim(msg);
                $.unblockUI();
                 //$('#reversal_form').reset();
         
				 $("#display_message").html(msg);
                $("#display_message").show("fast");  
                $("#display_message").click();
           } 
         });

}	

function abort_trans()
{
$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
        //});

        var data ="tid="+ $('#rtrans_id').val();
        //alert($('#reason').attr('value'));
        $.ajax({ 
           type: "POST", 
           url: "utilities.php", 
           data: "op=abort_trans"+"&"+data, 

           success: function(msg){ 
          // alert(data);
                 //alert( "Data Saved: " + msg ); 
                 //alert(msg);
                  msg = jQuery.trim(msg);
                $.unblockUI();
                 //$('#reversal_form').reset();
         
				 $("#display_message").html(msg);
                $("#display_message").show("fast");  
                $("#display_message").click();
           } 
         });

}	


function dec_auth_reversal()
{
$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />processing request please wait . . .'});
        //});
		if(getdata()!="error")
		{
        var data ="tid="+ $('#rtrans_id').val();
        //alert($('#reason').attr('value'));
        $.ajax({ 
           type: "POST", 
           url: "utilities.php", 
           data: "op=dec_auth_reversal"+"&"+data, 

           success: function(msg){ 
          // alert(data);
                 //alert( "Data Saved: " + msg ); 
                 //alert(msg);
                  msg = jQuery.trim(msg);
                $.unblockUI();
                 //$('#reversal_form').reset();
                
				 $("#display_message").html(msg);
                 $("#display_message").show("fast");
                $("#display_message").click();
                //$('button[role=button]').slideUp("fast");
                
                        //}
           } 
         });
}
}
///////////////////////////////////////	
//Author : Isaiah /////////////////////
function callPageFormRequest(str,frmid)
{
	var data = getDatta(frmid);
	//alert(data);
	if(data!='error')
	{
		$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;processing request please wait . . .'});
		
		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op="+str+'&'+data, 
		   success: function(msg){
				//alert(msg);
				var myMsgTest = msg.split("::||::");
				if(myMsgTest[0]=='1')
				{ 
					$('#alertmsg').removeClass('alert-success');
					$('#alertmsg').removeClass('alert-danger');
					$('#alertmsg').addClass('alert-success');
					$("#hhdd").html('Success!');
					$("#display_message").html(myMsgTest[1]);
					$("#display_message").show('fast');
					$("#alertmsg").show('fast');
					$("#opt").hide('fast');
					$("#addopt").show('fast');
					
				}else
				{
					$('#alertmsg').removeClass('alert-danger');
					$('#alertmsg').removeClass('alert-success');
					$('#alertmsg').addClass('alert-danger');
					$("#hhdd").html('Error !');
					$("#display_message").html(msg);
					$("#display_message").show('fast');
					$("#alertmsg").show('fast');
					$("#opt").hide('fast');
					$("#addopt").show('fast');
				}
				$.unblockUI();
		   } 
			 
	   });
	}
}

function getDatta(str)
{
	var data = "";
	$("#"+str).serialize();
	$.each($("input, select, textarea"), function(i,v) {
    var theTag = v.tagName;
    var theElement = $(v);
	var theName = theElement.attr('name');
    var theValue = escape(theElement.val());
	var classname = theElement.attr('class');
	//alert('name : '+theName+"   value :"+theValue+"  class :"+classname);
	if(classname=='required-text')
	{
		if(!check_textvalues(theElement)) data = "error";
	}
	if(classname=='required-number')
	{
		if(!check_numbers(theElement)) data = "error";
	}
	if(classname=='required-email')
	{
		if(!check_email(theElement)) data = "error";
	}
	if(classname=='not-required-email')
	{
		if(!check_email(theElement)) data = "error";
	}
	if(classname=='required-alphanumeric')
	{
		if(!check_password_aplhanumeric(theElement)) data = "error";
	}
	if(classname=='required-password')
	{
		if(!check_password(theElement)) data = "error";
	}
	if(classname=='required-captcha')
	{
		if(!check_captcha(theElement)) data = "error";
	}
	if(data!='error')
	{
		data = data+theName+"="+theValue+"&";
	}
	});
	//alert(data);
	return data;
}
///////////////End of script///////////////////
//////////////////////////////////////////////////

////////////////////////////Mutual DIP Kunle
function getstate(country)
{
	$("#state_div").html('<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;Loading states please wait . . .');
	

	$.ajax({ 
	type: "POST", 
	url: "utilities.php", 
	data: "op=get_state&country="+country, 
	success: function(msg){
		$("#state_div").html(msg);
		},
		error: function(x,t,m)
		{
		$("#state_div").html(t);
		}
});
	
}
/////////////////////End Of Mutual DIP Kunle

///////////////////////////////////////	
//Author : Isaiah /////////////////////
function callPageFormRequest(str,frmid)
{
	var data = getDatta(frmid);
	//alert(data);
	if(data!='error')
	{
		$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;processing request please wait . . .'});
		
		$.ajax({ 
		   type: "POST", 
		   url: "utilities.php", 
		   data: "op="+str+'&'+data, 
		   success: function(msg){
				alert(msg);
				var myMsgTest = msg.split("::||::");
				if(myMsgTest[0]=='1')
				{ 
					$('#alertmsg').removeClass('alert-success');
					$('#alertmsg').removeClass('alert-danger');
					$('#alertmsg').addClass('alert-success');
					$("#hhdd").html('Success!');
					$("#display_message").html(myMsgTest[1]);
					$("#display_message").show('fast');
					$("#alertmsg").show('fast');
					$("#opt").hide('fast');
					$("#addopt").show('fast');
					
				}else
				{
					$('#alertmsg').removeClass('alert-danger');
					$('#alertmsg').removeClass('alert-success');
					$('#alertmsg').addClass('alert-danger');
					$("#hhdd").html('Error !');
					$("#display_message").html(msg);
					$("#display_message").show('fast');
					$("#alertmsg").show('fast');
					//$("#opt").hide('fast');
					//$("#addopt").show('fast');
				}
				$.unblockUI();
		   } 
			 
	   });
	}
}

function getDatta(str)
{
	var data = "";
	$("#"+str).serialize();
	$.each($("input, select, textarea"), function(i,v) {
    var theTag = v.tagName;
    var theElement = $(v);
	var theName = theElement.attr('name');
    var theValue = escape(theElement.val());
	var classname = theElement.attr('class');
	//alert('name : '+theName+"   value :"+theValue+"  class :"+classname);
	if(classname=='required-text')
	{
		if(!check_textvalues(theElement)) data = "error";
	}
	if(classname=='required-number')
	{
		if(!check_numbers(theElement)) data = "error";
	}
	if(classname=='required-email')
	{
		if(!check_email(theElement)) data = "error";
	}
	if(classname=='not-required-email')
	{
		if(!check_email(theElement)) data = "error";
	}
	if(classname=='required-alphanumeric')
	{
		if(!check_password_aplhanumeric(theElement)) data = "error";
	}
	if(classname=='required-password')
	{
		if(!check_password(theElement)) data = "error";
	}
	if(classname=='required-captcha')
	{
		if(!check_captcha(theElement)) data = "error";
	}
	if(data!='error')
	{
		data = data+theName+"="+theValue+"&";
	}
	});
	//alert(data);
	return data;
}

function getLga(str)
{
	//
	$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page LGAs ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	//alert(str);
	// $("#ddlViewBy option:selected").text();
	//alert(countri+' '+str);
	if(str!='#' && str!='')
	{
	  $.ajax({ 
		   type: "post", 
		   url: "utilities.php", 
		   data: "op=get_lga&state_code="+str,
		   success: function(msg){ 
		  console.log(msg +' ' + str);
			   $('#lga-fd').empty();
			   $('#lga-fd').append(msg);
			   $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
function getLga_new(str)
{
	//
	$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page LGAs ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	//alert(str);
	// $("#ddlViewBy option:selected").text();
	//alert(countri+' '+str);
	if(str!='#' && str!='')
	{
	  $.ajax({ 
		   type: "post", 
		   url: "utilities.php", 
		   data: "op=get_lga&state_code="+str,
		   success: function(msg){ 
		  console.log(msg +' ' + str);
			   $('#lga').empty();
			   $('#lga').append(msg);
			   $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
function getSub(str)
{
	//
	$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page LGAs ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	//alert(str);
	// $("#ddlViewBy option:selected").text();
	//alert(countri+' '+str);
	if(str!='#' && str!='')
	{
	  $.ajax({ 
		   type: "post", 
		   url: "utilities.php", 
		   data: "op=get_lga22&state_code22="+str,
		   success: function(msg){ 
		  console.log(msg +' ' + str);
			   $('#class_id-fd').empty();
			   $('#class_id-fd').append(msg);
			   $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
function getClass(str)
{
	//
	$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page LGAs ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	//alert(str);
	// $("#ddlViewBy option:selected").text();
	//alert(countri+' '+str);
	if(str!='#' && str!='')
	{
	  $.ajax({ 
		   type: "post", 
		   url: "utilities.php", 
		   data: "op=get_class22&sclass_code22="+str,
		   success: function(msg){ 
		  console.log(msg +' ' + str);
			   $('#getpass').empty();
			   $('#getpass').append(msg);
			   $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}

function addCoordChurch()
{
	var ch_id = $("#church_id-whr").val();
	var ch_name = $("#name-fd").val();
	if(ch_name!="")
	{
		var newOption = '<option value="'+ch_id+'" selected="selectec">'+ch_name+'</option>';
		if($("#state_co_flag-fd").val()=='1')
		{
			$("#state_co_id-fd").append(newOption);
		}else
		{
			$("#state_co_id-fd").find('option').removeAttr("selected");
			$("#state_co_id-fd option[value='"+ch_id+"']").remove();
		}
	}else{
		alert(" Church Name is Empty ! Church Cannot be set as Coordinating church");
		$("#state_co_flag-fd").attr('checked',false);
	}
	
}

function getLastFour(str)
{
	
	$.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	   data: "op=get_last_four&service_id="+str,
	   success: function(msg){ 
			console.log(msg);
			msg = jQuery.trim(msg);
			var chart = new CanvasJS.Chart("all_sum_com", {
			backgroundColor: "#FCFFC5",
			title:{
				text: " Last Four Attendance Review For "+$("#serv_id option:selected").text(),
				fontSize: 14            
			},
			dataPointWidth: 25,
		  axisY:{
			includeZero: false
		  },
			
			data: [ 
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "line",
				dataPoints: eval(msg)
			}
			/*{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: eval(msg)
			}*/
			]
		});
		chart.render();
	   } 
  });
}

$(document).ready(function(){
	if($("#role_idd").val()=='505')
	{
		$("#myModal").modal('show');
		console.log("Am here");
	}
});
function selectvalueoptionSubject(value,operation,sname,$sname2){
$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	
	if(value!='#' && value!=''){
	$.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	      
   data: "op="+ operation +"&value="+value,
	   success: function(msg){
		
		  console.log(msg +' ' + value);
			   $('#assignrole-fd').empty();
			   $('#assignrole-fd').append(msg);
	  $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
function selectvalueoptionStudent(value,operation,sname,$sname2){
$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	
	if(value!='#' && value!=''){
	$.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	      
   data: "op="+ operation +"&value="+value,
	   success: function(msg){
		
		  console.log(msg +' ' + value);
			   $('#std_id-fd').empty();
			   $('#std_id-fd').append(msg);
	  $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
function selectvalueoptionSubject2(value,operation,sname,$sname2){
$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	
	if(value!='#' && value!=''){
	$.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	      
   data: "op="+ operation +"&value="+value,
	   success: function(msg){
		
		  console.log(msg +' ' + value);
			   $('#classlvl-fd').empty();
			   $('#classlvl-fd').append(msg);
	  $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
//this is a function to get list of class when you select the category of a school class 
function selectvalueoptionClass(value,operation,sname,$sname2){
$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	
	if(value!='#' && value!=''){
	$.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	      
   data: "op="+ operation +"&value="+value,
	   success: function(msg){
		
		  console.log(msg +' ' + value);
			   $('#assignrole-fd').empty();
			   $('#assignrole-fd').append(msg);
			   $('#assignclass-fd').append(msg);
	  $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
function selectvalueoptionClassTeach(value,operation,sname,$sname2){
$.blockUI({ message: '<h5><font color="#FF0000"> Please wait, loading page ...</font></h5>', css: { border: '3px solid #a00', padding: '5px', 'text-align': 'left',padding: '15px'}
	  });
	
	if(value!='#' && value!=''){
	$.ajax({ 
	   type: "POST", 
	   url: "utilities.php", 
	      
   data: "op="+ operation +"&value="+value,
	   success: function(msg){
		
		  console.log(msg +' ' + value);
		 // alert(msg);
			  // $('#teach_id-fd').empty();
			   $('#teacher').html(msg);
			   //$('#teach_id-fd').append(msg);
	  $.unblockUI();
		   }
		 });
	}else
	{
		$.unblockUI();	
	}
}
/////////////////////////STUDENT S ////////////////////////////////////
function getpagegeneric(value,url,divpage){
	// $.blockUI({ message: "<img src='images/ajax-loader.gif' /> " }); 

	getpage(url+'?'+"&data2="+value,divpage);
	//$.unblockUI();
	
	//calldialogUnblock(loadingScreen);
	
}
function getBulkOption(val){
		if(val=="2"){
			$("#import_ex").hide();
			$("#disp1").show("fast");
			$("#disp2").show("fast");
			$("#disp3").show("fast");
		}
		else if(val=="1"){
			$("#import_ex").show("fast");
			$("#disp1").hide();
			$("#disp2").hide();
			$("#disp3").hide();
		}
	}
	function removetable(removeRow,getadd_amount){
	//alert(getadd_amount);
	var getval = parseFloat(getadd_amount);
	var benadd = parseFloat($('#total').val());
	benadd-=getval;
	$('#total').get(0).value=benadd;
    $('#'+removeRow).remove();	1
	$('#'+removeRow+1111).remove();	
}

function importExcel(){
	var str = $("#exfilename").val();
	var reg_no = $("#reg_no").val();
	//alert(str);
	
	$.blockUI({ message:'<img src="images/loading.gif" alt=""/><br />Extracting File to Database . . .'});
	$.ajax({ 
			   type: "POST", 
			   url: "utilities.php", 
		   	   data: "op=doImportExcel&str="+str+"&reg_no="+reg_no , 
		    	
			   success: function(msg){
				 //alert( "Data Saved: " + msg ); 
				 //alert(msg);
				 if(msg==1){
				// $("#display_message").html("Upload Successfull");
				// $("#display_message").show("fast"); 
				 //getpage('excel_ipload.php?excelid='+reg_no,'content'); 
				     $.ajax({ 
	   					type: "POST", 
					   	url: "excel_ipload.php", 
					  	data: "excelid="+reg_no,
					 	 success: function(msg){
							 
						 var sp = msg.split('|');	 
						 var add_data = sp[0];
						  
						  $('#beneficiary_div').append(add_data);
						  var dat = parseFloat(sp[1]);
						  var total = parseFloat($('#total').val());
						   var sumtotal = (total+dat).toFixed(2);
							//alert(sumtotal);
							// $('#add_ben').get(0).value="";
							// $('#add_amount').get(0).value="";
							// $('#total').get(0).value=sumtotal;
							//var amt = parseFloat($('#amount').val());
							//if((amt==sumtotal)&&(sumtotal>0)&&(!isNaN(amt))){
									//$("#subbtn").attr('disabled', false);
									
							//}else{
								// $("#subbtn").attr('disabled','false');
								//  }
							// $.unblockUI();	  
						   } 
					  });
						  
				 }else{
				 $("#display_message").html(msg);
				 $("#display_message").show("fast");
				 //getpage('set_up_list_auth.php','content');
				 }
				 $.unblockUI();
				 //$("#display_message").html("");
			   } 
			 });
	
	
	}
function doDefChurch()
{
	
	var ch_email = $("#d_email").val();
	 $.ajax({ 
		   type: "post", 
		   url: "utilities.php", 
		   data: "op=do_default_church&church_email="+ch_email,
		   success: function(msg){ 
		  console.log(msg +' ' + str);
			   $('#lga-fd').empty();
			   $('#lga-fd').append(msg);
			   $.unblockUI();
		   }
		 });
	$("#myModal").modal('hide');
}


function call_router(endpoint, retpage) {
	var data = getdata();
	var op 			= "SelfServiceConsole." + endpoint,
  	 	handler 	= "SelfServiceConsole";

	if(data!='error')
	{
		$.blockUI({ message:'<img src="images/loading.gif" alt=""/>&nbsp;&nbsp;processing request please wait . . .'});
		$.ajax({ 
		   	type: "POST", 
		   	url: '../router.php', 
		   	data: "op="+op + "&handler=" + handler + "&"+data, 
		   	success: function(msg){ 
		   		$.unblockUI();
		   		$('#display_message').removeClass('alert alert-success alert-danger');
		   		try{
		   			var retval = JSON.parse(msg);
 					if(retval['status'] == '200') {

						$('#display_message').addClass('alert alert-success').html(retval['message']);
						$("#display_message").show('fast');

						swal({
	                        icon: 'success',
	                        text: 'Successful: ' + retval['message'],
	                    });

						if(retpage != '') {
							 setTimeout(function() {
								getpage(retpage,'page');
							}, 2000);
						}
 					}
 					else {
 						$('#display_message').addClass('alert alert-danger').html(retval['message']);
						$("#display_message").show('fast');
 						swal({
	                        icon: 'error',
	                        text: retval['message'],
	                    });
 					}
		   		}
		   		catch(err) {
		   			swal({
                        icon: 'warning',
                        text: '[101] Unable to Interpret Service Response!',
                    });
		   		}
		   	},
		   	error:function(x, t, m){
		    	$.unblockUI();
		    	if(t==="timeout") {
		    		swal({
                        icon: 'warning',
                        text: 'Connection Error: Unable to Communicate with Service Provider. Kindly Check Your Internet Connection!',
                      });
		    	}
		    	else {
		    		swal({
                        icon: 'warning',
                        text: 'Connection Error: Service is not Available at the Moment!',
                      });
		    	}
	          	
	      	}
	    });  	
	}
	else {
		console.log("Error");
		swal({
            icon: 'warning',
            text: 'Missing Required Field Information!',
         });
	}
}
