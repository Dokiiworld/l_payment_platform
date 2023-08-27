<style>
.ulspec{
	padding: 5px;
	margin-left:25px;
	
    /* list-style-type: disc; for a solid circle */
    /* list-style-type: circle; for a hollow circle */
    /* list-style-type: square; /*for a solid square */
    /* list-style-type: none; to remove the bullet point */
	/* list-style-image: url('bullet.png'); replace 'bullet.png' with the URL or file path of your image */
  }
  .ulspec li{color:#057242; font-size: 12px;}
  .step_title{color:#34ac78; font-size: 25px;font-weight: 600}
  .step_body{font-size: 20px;}
  .steps{padding:5px;}
  .but{color:#34ac78}
 .slider_button{float:right;margin-top: 8px;}
  /* .st_row{padding:10px 40px 10px 15px; margin-bottom:10px} */
  .st_row{padding:5px 30px; margin-bottom:10px}
  .st_col{padding:15px 10px; border:10px solid #CFE2DE; background:#CFE2DE}
  
  #display_message, #display_message2, #np_message, #t_message{font-size:12px}
 .caddy{padding:20px;font-size:15px}
 .caddy i{color:red;font-size: 12px}
 /* .caddy label{font-size: 14px} */
 #regreceipt_form label, #newpayment_form label{font-size: 14px}
 /* .cad2{padding:15px;background-color:#555555;margin-top:5px;box-shadow:1px 3px 10px 3px grey;display:none} */
 #regClick{padding:6px 25px 6px 0px;color:red;font-size: 14px;}
 #regreceipt_form{padding:15px 15px 25px 15px;display:none}
 .colmag{margin-top:10px}

 .wel h1{
    color:#555555;
    font-size:40px;
    font-weight:700;
    margin-bottom:20px;
}
.wel h1 i{
    margin-right:10px;
}
.wel h1 span{
    font-weight:300;color:#34ac78
}

#show_bg_2 {
    /* background-image:
    linear-gradient(to bottom, rgb(221 245 233 / 85%), rgb(161 220 189 / 85%), rgb(0 126 63 / 86%)),    url(images/background.jpg); */
    /*width: 80%;
    height: 400px;*/
    /* background-size: cover; */
	background:#CFE2DE;
    color: #f5f5f5 !important;
    padding: 0px;
    font-family: 'Times New Roman', Times, serif !important;
}
.wel{padding-top:30px}
.stp{color:#34ac78; font-size: 25px;font-weight: 600; padding:5px; text-shadow: 1px 4px 1px white; word-spacing: 0px ;}
</style>

		<div class="row" style="box-shadow:-2px 1px 5px 5px #181717c2">
			<div class="col-md-7 column" id="show_bg_2">
				<div class="wel">
					<h3 class="text-center" style="margin-bottom: 0px; font-weight:600"><span style="color:#057242">RWC</span> ONLINE PAYMENT PLATFORM PROCESS FLOW</h3>
				</div>
					<div class="row st_row">
						
						<div class="col-md-12" style="padding:15px">
							<p style="color: #057242"><b>Welcome to Lagos Computerised Vehicle Inspection Roadworthiness online payment platform. This platform is only for existing/returning/registered vehicle owners.</b></p>
							<hr style="border-top: 1px solid #34ac785e;">	
							<strong style="color:#057242">To complete your Vehicle Inspection Roadworthiness payment, please follow these instructions:</strong>
							<ul class="ulspec">
								<li><b>i. </b> Enter your vehicle number plate in the designated field and click on the SEARCH button.</li>
								<li><b>ii. </b> After your vehicle details appear, scroll down and provide your E-MAIL address, then click on PROCESS PAYMENT to continue.</li>
								<li><b>iii. </b> Choose your preferred payment method and enter your card details.</li>
								<li><b>iv. </b> Once your payment is approved, print your payment receipt.</li>
								<li><b>v. </b> You will also receive the payment receipt with the ONLINE PIN through the email address you provided.</li>
								
							</ul>
						</div>

					</div>
					<div class="col-md-12" style="background:#057242;padding:30px">
							<!-- <hr style="    border-top: 1px solid #34ac785e;"> -->
							<h5 style="color:#fff; font-weight: 600;">NOTE: After generating your ONLINE PIN, kindly visit any nearest or preferred VIS office for your referral note print out.</h5>
					</div>
          
			</div>

			<div class="col-md-5 column" >
				<div class="text-center caddy">
						<!-- <h4>LAGOS COMPUTERISED VEHICLE INSPECTION SERVICE</h4> -->
						<!-- <b>COMPUTERISED VEHICLE INSPECTION AND ROAD WORTHINESS</b></div> -->
					<div class="text-center" id="newpayment_form">
						
						<form action="javascript:void(0)">
							<div style="margin-bottom:30px"><img src="images/logo.png" width="100px"></div>
							<div class="col-md-12"><b>To Process New Payment</b><hr></div>
							<div>
								<label>Enter Number Plate: </label><i>*</i><br>
								<input type="text" class="form-control" id="number_plate" name="number_plate" maxlength="8" placeholder="Enter Number plate">
							</div>
							<div id="display_message"></div>
							<div><br>
								<button class="btn btn-success" style="width:100%" onclick="searchnumberPlate()">SEARCH</button>
							</div>
							<hr>
							<div class="text-left" style="color:green;margin-bottom:10px"><b>ALREADY COMPLETED PAYMENT?<b><br><a href="javascript:void(0)" class="small" id="regClick" onclick="regclick()"><u>Click here to regenerate payment receipt</u></a></div>							
						</form>
					</div>
					<div class="text-left" id="regreceipt_form">
						
						<form class="row " action="javascript:void(0)">
							<h4 class="" style="color:green;margin-bottom:10px"><b>Already Completed Payment?</b><button style="float:right;color:red" class="btn btn-default" onclick="goBack()"><span class="fa fa-arrow-left"></span> Go Back</button></h4>
							<div><b>To Regenerate Payment Receipt</b><hr></div>
							<div>
								<label>Enter your Transaction ID: </label><i>*</i><br>
								<input type="text" class="form-control"  name="transactionId" id="transactionId">
							</div>
							<div class="colmag">
								<label>Enter your Number Plate: </label><i>*</i><br>
								<input type="text" class="form-control" name="numberPlate" id="numberPlate" maxlength="8">
							</div>
							<div class="colmag">
								<label>Enter your Email: </label><i>*</i><br>
								<input type="email" class="form-control" name="email" id="email">
							</div>
								<div id="display_message2"></div>
								<div id="np_message"></div>
								<div id="t_message"></div>
							<div>
								<label>&nbsp;</label><br> 
								<button class="btn btn-success" style="width:100%" onclick="generateReceipt()">GENERATE RECEIPT</button>
							</div>
							
						</form>
						
					</div>
				</div>
				

			</div>
			
</div>

<script>
	var mask = new RegExp('^[A-Za-z0-9 ]*$')
	$("input[type=text]").regexMask(mask)

	// function sear()
	// {
	// 	// onblur="javascript: $('#number_plate').val((Math.round(this.value * 100) / 100).toFixed(2));"
	// 	alert($('#number_plate').val());
	// }
</script>