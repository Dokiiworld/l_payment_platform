<?php
// session_start();
// include('dbfunctions.php');
include_once("validation.php");
//////////////////////

//////////////////////
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);

// class LavicsPayment extends dbobject 
class LavicsPayment
{
    // public $myconn;

    // public function __construct()
    // {
    //     $this->myconn =
    // }

    public function getVehicleDetails($data)
    {
        $validation_filter = new validation();
        $validation = $validation_filter->validate(
            $data,
            [
                "number_plate"=>"required|min:8|max:8",
            ]
          
        );
        if($validation['error'])
        {
            return json_encode(["response_code"=>69,"response_message"=>$validation['messages'][0]]);
        }
        // var_dump($data);exit;
        $payload = [
            "plate_no"=>$data['number_plate']
        ];
        return $this->makeAPICall("getDetails",$payload);
    }

    public function logTransactionComplete($data,$client_email,$applicantName)
    {
        // var_dump($data['xml_data']);exit;
        $dt = json_decode($data['xml_data'],true);
        // var_dump($dt['data']['payment_ref']);exit;
        $payload = [
            // "plate_no"=>$data['number_plate'],
            "transaction_id"=>$data['transaction_id'],
            "payment_ref"=>$dt['data']['payment_ref'],
            "amount_paid"=>$dt['data']['Amt_paid'],
            "client_email"=>$client_email,
            "applicant_name"=>$applicantName
        ];
        return $this->makeAPICall("logTransactionComplete",$payload);
    }

    public function validateTransactionDetails($data)
    {
        $payload1 = [
            "plate_no"=>$data['numberPlate']
        ];
        $validateNumberPlate = $this->makeAPICall("getDetails",$payload1);
        $valNumPlate = json_decode($validateNumberPlate,true);
        if($valNumPlate['response_code']=='200')
        {
            $applicantName =$valNumPlate['data']['applicantName'];

          
            $merchant_id =$valNumPlate['data']['merchant_id'];
           
            $count = "200";
        }
        else
        {
            // $response_message ="No record found for the Number Plate provided";
            $count = "400";
        }

        $v_reg  = new LavicsPayment();
        $tr_id = $data['trans_id'];
	    $merchantSt = substr($valNumPlate['data']['merchant_id'],9);
        $transid = $merchantSt.''.$tr_id;
        // var_dump($transid);exit;
        $validateTransId =  $v_reg->requeryPaymentStatus($transid);
        // var_dump($validateTransId);exit;
        // $dataOnepay = json_decode($validateTransId['xml_data'],true);
        $tstatus = $validateTransId['status'];
        if($tstatus=="200")
        {
            // $trans_id = $validateTransId['transaction_id'];
            $count2 = "200";
        }
        else
        {
            // $response_message ="No payment record found for the Transaction Id provided";
            $count2 = "400";
        }
        return json_encode(array('count'=>$count,'applicantName'=>$applicantName,'merchant_id'=>$merchant_id,'transaction_id'=>$transid,'count2'=>$count2));
      
    }


    public function requeryPaymentStatus($transid) {

        $merchant_id = $_SESSION['merchant_id'];

        // $onepay_url = $_SESSION['onepayRequery_url'];
        $onepay_url = "https://vuvaa.com/ONEPAY/api/ValidateTrans/getTrans.php";


        if($merchant_id == "" || $onepay_url == "" || $transid == "")
        // if($transid == "")
        {
            return array('response_code' => '99', 'response_message' => 'Missing/Invalid configuration to communicate with Thirdparty');
        }

        $transaction_id = substr($transid,9);
        $data = "MerchantRegID=".$merchant_id."&MerchantTransID=".$transid;
        $curl = curl_init();
        
        curl_setopt_array($curl, array(
            CURLOPT_URL => $onepay_url,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_POSTREDIR => 3,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS =>$data, 
            CURLOPT_CUSTOMREQUEST => "POST"
        ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) 
        {
          return array("status" => "404", "response_code" => '99', "response_message" => "Pending and awaiting payment confirmation", 'transaction_id' => $transaction_id);
        } 

        $serverJSON = json_decode($response, true);
        if(isset($serverJSON['status']) && $serverJSON['status'] == '200' && isset($serverJSON['data'])) 
        {

            $feedback = $serverJSON['data'];
            $code = isset($feedback['response_code']) ? $feedback['response_code'] : '99';
            $method = isset($feedback['payment_gate']) ? $feedback['payment_gate'] : 'ONEPAY';
            $msg = isset($feedback['response_message']) ? $feedback['response_message'] : 'Unknown/Unresolved';

            //FORCED SUCCESS FOR DEMO
            $code = 0;
            $msg = "Flagged Successful for DEMO usage";
            

            //UPDATE THE TRANSACTION
            // $this->myconn->query("UPDATE transaction_table SET response_code = '$code', response_message = '$msg', payment_gateway = '$method', xml_data='$response' WHERE debit_reference = '$transaction_id'");

            $status = ($code = '0' || $code = '00') ? '200' :  '404';
            return array("status" => $status, "response_code" => $code, "response_message" => $msg,  "payment_method" => $method, "xml_data" => $response, 'transaction_id' => $transaction_id);
        }

        return array("status" => "404", "response_code" => '-1', "response_message" => "Inconclusive Status", 'transaction_id' => $transaction_id);
    }
    


    public function makeAPICall($endpoint,$arr_data = [],$isPost = "true")
    {
        $curl = curl_init();
        $curl_options = array(

            // CURLOPT_URL => "https://fctevregendpoint.accessng.com/evreg_remita_new/autovinAPI/".$endpoint,
            CURLOPT_URL => "https://fctevregendpoint.accessng.com/evreg_remita_new/lacvisAPI/".$endpoint,
            CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false,
			CURLOPT_POSTREDIR => 3,
			// CURLOPT_CUSTOMREQUEST => "POST",
			// CURLOPT_POSTFIELDS => json_encode($arr_data),
			CURLOPT_HTTPHEADER => array(
				"content-type: application/json"
			),
		);
        if($isPost)
        {
            $curl_options[CURLOPT_CUSTOMREQUEST] = "POST";
            $curl_options[CURLOPT_POSTFIELDS] = json_encode($arr_data);
        }

		curl_setopt_array($curl, $curl_options);

		$response = curl_exec($curl);
		$err = curl_error($curl);
        curl_close($curl);
        if(!$err)
        {
            return $response;
        }else
        {
            return json_encode(['response_code'=>81,'response_message'=>'Unable to connect to server']);
        }
		
            
    }
   
}