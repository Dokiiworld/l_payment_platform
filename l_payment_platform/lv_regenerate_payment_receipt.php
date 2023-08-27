<?php
// session_start();
// include_once("lib/dbfunctions.php");
include_once("lib/lacvispayment.php");
// $dbobject = new dbobject();
$v_reg  = new LavicsPayment();

$client_email =$_REQUEST['client_email'];

$applicantName = $_REQUEST['applicantName'];

$_SESSION['merchant_id'] = $_REQUEST['merchant_id'];

$transid = $_REQUEST['trans_id'];

if($applicantName=="")
{
    echo "<script>window.location='index.php';</script>";
}

$process =  $v_reg->requeryPaymentStatus($transid);
$data = json_decode($process['xml_data'],true);
// if($data==null)
if($process["status"]=="404")
{
	echo "<script>
			$('#tdetail1').hide(); 
			$('#tdetail2').hide(); 
			$('#terror').html('<h1><b style='color:red'>Unable to generate transaction receipt at the moment.<b><br>You can regenerate your receipt at any time using your Transaction Id<br>Click the button below to proceed<br><br><a href='index.php'><button>Proceed</button></a></h1>');
			$('#terror').show(); 
		</script>";
}
else
{
	echo "<script>
			$('#tdetail1').show(); 
			$('#tdetail2').show(); 
			$('#terror').hide();
			$('#terror').html('');
	</script>";
	// var_dump($process);exit;
	// var_dump($data) ;exit;
	$trans_id = $process['transaction_id'];
	$res_mess =$data['data']['response_message'];
	$amount =$data['data']['Amt_paid'];
	$date =$data['data']['date_time'];
	$response_code = $data['data']['response_code'];
	// var_dump($response_code);exit;
	// echo date("Y-m-d h:i:s", $date);

	if($data['data']['response_code']!=0 || $data['data']['response_code']!=00)
	{
		echo "<style>#display_response{color:red;}</style>";
	}
	else
	{
		echo "<style>#display_response{color:green;}</style>";
	}

	$logtrans =  $v_reg->logTransactionComplete($process,$client_email,$applicantName);
	$lg = json_decode($logtrans, true);
	file_put_contents('logtransactioncomplete.txt',$logtrans);
	// var_dump($lg);exit;
	if($lg['response_code']!="200")
	{
		echo "<style>#p_response{color:red;}</style>";
		$response_mess = $lg['response_message'];
		$tpin = "Unable to generate pin";
	}
	else
	{
		echo "<style>#p_response{color:green;}</style>";
		$response_mess = $lg['response_message'];
		$tpin = $lg['data']['transaction_pin'];
	}
	
}

?>
<?php 
	
	include "header.php"
?>

<style>
    th, td{text-align: left;padding:4px}

</style>

<section>
	<div id="loader-wrapper">
		<div id="loader"></div>

		<div class="loader-section section-left"></div>
		<div class="loader-section section-right"></div>

	</div>
	<div class="block whitish">
			<div class="parallax" style="background:url(images/parallax5.jpg);"></div>
			<div class="container"  id="page">
				<div class="row" style="padding:0px 10px">
				
					<div class="col-md-6 column col-md-offset-3" style="padding:20px;border:3px solid #CFE2DE; border-radius:10px; box-shadow:1px 3px 10px 3px #ababab">
						<div class="row" style="padding:10px;margin-bottom:10px">
							<div class="col-md-2"><img src="images/logo.png" width="100px"></div>
							<!-- <div class="col-md-10" style="padding-left: 25px;"><br><br><b>COMPUTERISED VEHICLE INSPECTION AND ROAD WORTHINESS</b></div> -->
							<div class="col-md-10" style="padding-left: 35px;font-size:17px"><br><b>Lagos Computerized Vehicle Inspection Roadworthiness Online Payment</b></div>
						</div>
						<div class="row">
							<div class="col-md-12 text-center">
								<!-- <h4><b>LAGOS COMPUTERISED VEHICLE INSPECTION SERVICE</b></h4> -->
								<h4><u>PAYMENT RECEIPT</u></h4>
								<!-- <div class="small">Payment Receipt</div> -->
								<div><br></div>
							</div>
							<div class="col-md-12 text-center" id="tdetail1">
								<div class="small" id="display_response"><?php echo $data['data']['response_message']?></div>
								<div style="font-size: 20px; font-weight:600"><b>NGN <?php echo number_format($data['data']['Amt_paid'],2); ?></b></div><br>
							</div>
							<div class="col-md-12 text-center" id="terror"></div>
							<div class="col-md-12" id="tdetail2">
								<table class="">
									<tr>
										<th align="left">Transaction Id:</th> <td align="left"><?php echo $trans_id; ?></td>
									</tr>
									<tr>
										<th align="left">Transaction Pin:</th> <td align="left" style="font-size:15px"><b><?php echo $tpin;?></b></td>
									</tr>
									<tr>
										<th align="left">Applicant Name:</th> <td align="left"><?php echo $applicantName;?></td>
									</tr>
									<tr>
										<th align="left">Payment Date:</th> <td align="left"><?php echo date('F d, Y. h:ia', strtotime($date));?></td>
									</tr>
									<tr>
										<th align="left">Payment Amount:</th> <td id="display_response" align="left">NGN <?php echo number_format($data['data']['Amt_paid'],2); ?></td>
									</tr>
								</table>

							</div>
							<div class="col-md-12" style="padding:0px 20px;">
								<div>&nbsp;&nbsp;</div>
								<input  name="print" type="button" class="btn btn-info" id="search" onclick="javascript:window.open('lv_payment_receipt.php?transaction_id=<?php echo $trans_id; ?>&transaction_pin=<?php echo $tpin;?>&response_message=<?php echo $res_mess ?>&amount=<?php echo $amount?>&date= <?php echo $date?>&applicantName=<?php echo $applicantName ?>&response_code=<?php echo $response_code ?>','_blank');" value="PRINT RECEIPT" style="width:100%">
								
							</div>
						</div>
					</div>
					
						
				</div>

			</div>

		</div>
	
</section>

<?php include "footer.php"; ?>

<script type="text/javascript">
	// window.onload = function()
	// {
	// 	document.forms['upay_form'].submit();
	// }
	// $(document).ready(function(){
	// 	// getpage('lv_search_number_plate.php','page');
	// 	$("#upay").submit(function(e) {
    //     // e.preventDefault(); 
	// 	alert(JSON.stringify(e))
	// 	});
	// });
	
	</script>