<?php
// ob_end_clean();
include_once("lib/lacvispayment.php");
include_once('lib/fpdf.php');
// ini_set('display_errors', 1);
// error_reporting(E_ALL);



// $dbobject = new dbobject();
$pdf = new FPDF();
$object  = new LavicsPayment();


// $object = new myDbobject();
// $id= $_REQUEST['id'];
// $data = json_decode($_REQUEST['onepay_data'], true);
// var_dump($data);exit;
// $process= $_REQUEST['onepay_data'];
$trans_id =$_REQUEST["transaction_id"];
$trans_pin =$_REQUEST["transaction_pin"];
$res_mess =$_REQUEST["response_message"];
$applicantName =$_REQUEST["applicantName"];
$amount = $_REQUEST["amount"];
$date = $_REQUEST["date"];
$response_code = $_REQUEST["response_code"];
// var_dump($response_code);exit;

$today = date('Y-m-d');

                $pdf->AddPage();
                // $pdf->Image('uploads/receipt_bg.png',1,1,208);
                // For our Reff 
                $pdf->SetFont('Arial','i',10);
                $pdf->Ln(0);
                $pdf->SetX(135);
                $pdf->Cell(40,10,'Date printed:',0);

                $pdf->Ln(0);
                $pdf->SetX(158);
                $pdf->Cell(40,10,$today,0);

                // $pdf->SetFont('Arial','BU',14);
                // $pdf->Ln(13);
                // $pdf->SetX(20);
                // $pdf->Cell(40,10, 'FEE PAYMENT PAYMENT',0);
                
                  
                
                $pdf->Image('images/logo.png',20,18,25,25);

                // $pdf->SetTextColor(26,141,79);
                $pdf->SetDrawColor(26,141,79);
                $pdf->SetFont('Arial','',14);
                $pdf->Ln(17);
                $pdf->SetX(45);
                // $pdf->MultiCell(100,5, 'COMPUTERISED VEHICLE INSPECTION AND ROAD WORTHINESS',0);
                $pdf->MultiCell(130,5, 'Lagos Computerized Vehicle Inspection Roadworthiness Online Payment',0);
                
                

                $pdf->Rect(30, 55, 150, 79, 'S');

                $pdf->SetTextColor(0,0,0);
                $pdf->SetFont('Arial','U',15);
                $pdf->Ln(25);
                $pdf->SetX(80);
                $pdf->Cell(40,10, 'PAYMENT RECEIPT',0);

                // $pdf->SetFont('Arial','',8);
                // $pdf->Ln(5);
                // $pdf->SetX(88);
                // $pdf->Cell(40,10,'Payment Receipt',0); 
                if($response_code!=0 || $response_code!=00)
                {
                    $pdf->SetTextColor(200,0,0);
                }
                else
                {
                    $pdf->SetTextColor(26,141,79);
                }

                $pdf->SetFont('Arial','',8);
                $pdf->Ln(10);
                $pdf->SetX(90);
                $pdf->Cell(40,10,$res_mess,0); 

                $pdf->SetTextColor(0,0,0);

                $pdf->SetFont('Arial','B',15);
                $pdf->Ln(5);
                $pdf->SetX(91);
                $pdf->Cell(40,10,'NGN '.$amount,0); 

                // $pdf->SetTextColor(0,0,0);
                $pdf->SetFont('Arial','',10);
                $pdf->Ln(10);
                $pdf->SetX(60);
                $pdf->Cell(40,10, 'Transaction Id:',0);
    

                $pdf->Ln(8);
                $pdf->SetX(60);
                $pdf->Cell(40,10, 'Transaction Pin:',0);

                $pdf->Ln(8);
                $pdf->SetX(60);
                $pdf->Cell(40,10, 'Applicant Name:',0);

                $pdf->Ln(8);
                $pdf->SetX(60);
                $pdf->Cell(40,10, 'Payment Date:',0);

                $pdf->Ln(8);
                $pdf->SetX(60);
                $pdf->Cell(40,10, 'Payment Amount:',0);


                $pdf->SetFont('Arial','',10);
                $pdf->Ln(-32);
                $pdf->SetX(100);
                $pdf->Cell(40,10,$trans_id,0);

              
                $pdf->SetFont('Arial','B',12);
                $pdf->Ln(8);
                $pdf->SetX(100);
                $pdf->Cell(40,10,$trans_pin,0);

                $pdf->SetFont('Arial','',10);
                $pdf->Ln(8);
                $pdf->SetX(100);
                $pdf->Cell(40,10,$applicantName,0);

                $pdf->Ln(8);
                $pdf->SetX(100);
                $pdf->Cell(40,10,date('F d, Y. h:ia', strtotime($date)),0);

                if($response_code!=0 || $response_code!=00)
                {
                    $pdf->SetTextColor(200,0,0);
                }
                else
                {
                    $pdf->SetTextColor(26,141,79);
                }
                $pdf->Ln(8);
                $pdf->SetX(100);
                $pdf->Cell(40,10,'NGN '.$amount,0);


                $pdf->Output();
      
        
?>