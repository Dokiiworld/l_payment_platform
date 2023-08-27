<?php
session_start();
require_once('lib/lacvispayment.php');

$v_reg  = new LavicsPayment();

$op = $_REQUEST['op'];

if($op == "search_number_plate")
{
    echo $v_reg->getVehicleDetails($_REQUEST);
}
if($op == "email_storage")
{
    $_SESSION['client_email'] = $_REQUEST['client_email'];
}
if($op == "regenerate_receipt")
{
    echo  $v_reg->validateTransactionDetails($_REQUEST);
   
}
