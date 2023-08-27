<style>
     th, td{text-align: left;padding:4px}
</style>
<?php
session_start();

$data = json_decode($_REQUEST['data'], true);
$_SESSION['applicantName'] = $data['applicantName'];
$_SESSION['applicantMobilePhone'] = $data['applicantMobilePhone'];
// var_dump($_SESSION);exit;


// $_SESSION['onepay_url'] = "https://vuvaa.com/ONEPAY/mod/live/main";
$_SESSION['merchant_id'] = $data['merchant_id'];

$onepay_url = "https://vuvaa.com/ONEPAY/mod/live/main";
// $onepay_merchant = $dbobject->getitemlabel("parameter", "parameter_name", "ONEPAY_MERCHANT_CODE", "parameter_value");
$onepay_merchant = $data['merchant_id'];

// var_dump($onepay_merchant);exit;
?>
 
<div class="row" style="box-shadow:0px 5px 10px 5px #ababab; padding:20px 10px">
    <div class="col-md-12 colum" >
        <h1>Transaction Preview</h1>
            <p>Please preview your transaction details below:</p><br>
               
    </div>
            <div class="col-md-6 column">
               
                <table class="table table-bordered">
                <tr><th colspan="2" style="color:red"><em><b>Vehicle Information</b></em></th></tr>
                <tr>
                    <th>Number Plate:</th> <td id="numberplate"> <?php echo $data['plateNo']?> </td>
                </tr>
                <tr>
                    <th>Chasis No:</th> <td id="chasis"> <?php echo $data['chasisNo']?></td>
                </tr>
                <tr>
                    <th>Applicant Name:</th> <td id="name"> <?php echo $data['applicantName']?> </td>
                </tr>
                <tr>
                    <th>Mobile Phone:</th> <td id="phone"> <?php echo $data['applicantMobilePhone']?></td>
                </tr>
               
                <tr>
                    <th>Address:</th> <td id="address"> <?php echo $data['applicantAddress']?></td>
                </tr>
               
            </table>

               
            </div>
            <div class="col-md-6 column ">
           
                <table class="table table-bordered">
               
                    <tr><th colspan="2" style="color:red"><em><b>Transaction Information</b></em></th></tr>
                    <tr>
                        <th>Transaction Id:</th> <td id="amount"> <?php echo $data['transactionId']; ?></td>
                    </tr>
                    <tr>
                        <th>Payment Amount:</th> <td id="amount"> NGN <?php echo number_format($data['amount'],2); ?></td>
                    </tr>
                    <tr>
                        <th>Payment Category:</th> <td id="category"> <?php echo $data['payment_category']?></td>
                    </tr>
                </table>
                <form action="<?php echo $onepay_url; ?>" method="POST" id="upay" name="upay_form">
                    <input name="merchant_reg_id" id="merchant_reg_id" type="hidden" value="<?php echo $onepay_merchant; ?>" />
                    <input name="merch_trans_id" id="merch_trans_id" type="hidden" value="<?php echo $data['transactionId']?>" />
                    
                    <input name="product_desc" id="product_desc" type="hidden" value="<?php echo $data['payment_category']?>" />
                    
                    <!-- <input name="client_email" id="client_email" type="hidden" value="<?php echo ($data['applicantEmail'] != "") ? $data['applicantEmail'] : "demo@mail.com"; ?>" /> -->
                
                    <input name="client_name" id="client_name" type="hidden" value="<?php echo $data['applicantName']?>" />
                    
                    <input name="client_phone" id="client_phone" type="hidden" value="<?php echo $data['applicantMobilePhone']?>" />
                    
                    <input name="amt_paid" id="amt_paid" type="hidden" value="<?php echo str_replace(',', '', number_format($data['amount'],2)); ?>" />
                   
                    <div class="row">
                        <div class="col-md-5">
                            <label>Enter Email Address: <span class="small" style="color:red">*</span></label><br>
                            <input name="client_email" id="client_email" type="email" value="" class="form-control"/>
                        </div>
                        <div class="col-md-7">
                            <label id="display_message2">&nbsp;</label><br>
                            <button class="btn btn-success" type="button" style="float:left" onclick="processPayment()">PROCESS PAYMENT</button> <button class="btn btn-danger" type="button" style="float:right" onclick="javascript:getpage('lv_search_number_plate.php','page')"> < GO BACK</button>
                        </div>
                        
                    </div>
                    <!-- <button class="btn btn-success" type="submit" style="float:left">Process Payment</button> <button class="btn btn-danger" type="button" style="float:right" onclick="javascript:getpage('lv_search_number_plate.php','page')"> < Go Back</button> -->
                </form>
            </div>

		</div>