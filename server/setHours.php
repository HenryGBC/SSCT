<?php
header('Access-Control-Allow-Origin: *');  
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");

$HOUR_OFF = 'off';
$HOUR_EXTEND= 'extend';
$HOUR_NORMAL = 'normal';
$HOUR_WEEKEND = 'weekend';
$data_true = array(TRUE);
$data_false = array(FALSE);
$valueHour =$_POST["value"];


switch ($valueHour) {
    case $HOUR_OFF:
        $modbus->writeSingleCoil(0, 30, $data_false);
        $modbus->writeSingleCoil(0, 31, $data_false);
        response($HOUR_EXTEND);
        break;
    case $HOUR_EXTEND:
        $modbus->writeSingleCoil(0, 30, $data_true);
        $modbus->writeSingleCoil(0, 31, $data_false);
        response($HOUR_EXTEND);
        break;
    case $HOUR_NORMAL:
        $modbus->writeSingleCoil(0, 30, $data_false);
        $modbus->writeSingleCoil(0, 31, $data_true);
        response($HOUR_NORMAL);
        break;
    case $HOUR_WEEKEND:
        $modbus->writeSingleCoil(0, 30, $data_true);
        $modbus->writeSingleCoil(0, 31, $data_true);
        response($HOUR_WEEKEND);
        break;
    default:
        response('Errorrr');
}



function response($value){
	$array = array(
	        "value" => $value,
	      );
	echo json_encode($array);
}

?>
