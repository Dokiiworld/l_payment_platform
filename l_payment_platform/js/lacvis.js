// regex function
$.fn.regexMask = function(mask) {
    $(this).keypress(function(event) {
        if (!event.charCode) return true;
        var part1 = this.value.substring(0, this.selectionStart);
        var part2 = this.value.substring(this.selectionEnd, this.value.length);
        if (!mask.test(part1 + String.fromCharCode(event.charCode) + part2))
            return false;
    });
};

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}

function searchnumberPlate() {

    var np = $('#number_plate').val();

    if (np == "") {
        $('#display_message').html('<div style="padding:7px; background:red; color:white">Number Plate field is empty</b></div>');
    } else {

        $.blockUI({ message: '<img src="../images/loading.gif" alt=""/>&nbsp;&nbsp; Verifying Number Plate. Kindly wait .....' })
        $.post("lacvis_process_form.php", { number_plate: np, op: "search_number_plate" }, (e) => {
           
            console.log(e)
               

            if (e.response_code == 200) {

                getpage('lv_number_plate_details.php?data=' + JSON.stringify(e.data), 'page');

            } else {
                $('#display_message').html('<div style="padding:7px; background:red; color:white">' + e.response_message + '</b></div>');
              
            }

            setTimeout(function() {
                $.unblockUI();
            }, 500);

        }, 'json')


    }


}
function regclick()
{
    $('#display_message2').html('');
    $('#np_message').html('');
    $('#t_message').html('');

    $('#regreceipt_form').fadeIn();
    $('#newpayment_form').hide();
   
}
function goBack()
{
    $('#display_message').html('');

    $('#regreceipt_form').hide();
    $('#newpayment_form').fadeIn();

}
function processPayment() {

    var email = $('#client_email').val();
    if (email == "") {

        $('#display_message2').html('<div style="padding:5px; background:red; color:white"><em>Email address is required</em></div>');
    } else if (IsEmail(email) == false) {
        $('#display_message2').html('<div style="padding:5px; background:red; color:white"><em>Invalid email address format</em></div>');
    } else {
       
        $.post("lacvis_process_form.php", { client_email: $("#client_email").val(), op: "email_storage" }, (e) => {});
        $.blockUI({ message: '<img src="images/loading.gif" alt=""/>&nbsp;&nbsp; processing request . . .' });
        
        $("#upay button").prop('disabled', true);

        $("#upay").submit()

        $('#display_message2').html('<div style="padding:5px; background:green; color:white"><em>Processing request..... kindly wait...</em></div>')
       
        setTimeout(function() {
            $.unblockUI();
        }, 500);

    }

}



function generateReceipt() {
    var t_id = $('#transactionId').val();
    var nplate = $('#numberPlate').val();
    var email = $('#email').val();

    // var data = $('#regreceipt_form').serializeArray(),
    //     dataObj = {};

    // $(data).each(function(i, field) {
    //     dataObj[field.name] = field.value;
    // });
    // var ema =dataObj['email'];
    // alert(t_id);

    if (t_id == "" || nplate == "" || email == "")
    {
        $('#display_message2').html('<div style="padding:5px; background:red; color:white">Input field is empty! Please fill all required fields</div>');
        $('#np_message').html('');
        $('#t_message').html('');
    }
    else if (IsEmail(email) == false)
    {
        $('#display_message2').html('<div style="padding:5px; background:red; color:white">Invalid email format</div>');
        $('#np_message').html('');
        $('#t_message').html('');
    }
    else
    {
        $.blockUI({ message: '&nbsp;&nbsp; processing request . . .' });
        $('#np_message').html('');
        $('#t_message').html('');
        $('#display_message2').html('<div style="padding:5px; background:green; color:white">Processing request... kindly wait...</div>');
        
        $.post("lacvis_process_form.php", {op:"regenerate_receipt", trans_id: t_id, numberPlate: nplate, email: email}, (e) => {
                console.log(e)
                
                if(e.count2!="200")
                {
                    $('#t_message').html('<div style="padding:5px; background:red; color:white">No payment record found for the Transaction Id provided</div><br>');
                    $('#display_message2').html('');
                    if(e.count!="200")
                    {
                        $('#np_message').html('<div style="padding:5px; background:red; color:white">No record found for the Number Plate provided</div><br>');
                    }
                }
                else if(e.count!="200")
                {
                    $('#np_message').html('<div style="padding:5px; background:red; color:white">No record found for the Number Plate provided</div><br>');
                    $('#display_message2').html('');
                    if(e.count2!="200")
                    {
                        $('#t_message').html('<div style="padding:5px; background:red; color:white">No payment record found for the Transaction Id provided</div><br>');
                    }
                }
                else
                {
                    $('#display_message2').html('<div style="padding:5px; background:green; color:white">Payment receipt successfully generated...</div>');
                    window.open('lv_regenerate_payment_receipt.php?client_email='+email+'&applicantName='+e.applicantName+'&merchant_id='+e.merchant_id+'&trans_id='+e.transaction_id,'_blank');
                }
               
            }, 'json')

            setTimeout(function() {
                $.unblockUI();
            }, 500);
       

    }


}