<?php
header('Access-Control-Allow-Origin: *');  
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");
$HOUR_EXTEND= 'extend';
$HOUR_NORMAL = 'normal';
$HOUR_WEEKEND = 'weekend';

$valueHour =''; ///Read from PLC
//$recData = $modbus->readCoils(0, 0, 1);


function readData(){
    
   try{
       $recDataExtend= $modbus->readCoils(0, 30, 1);
       $recDataNormal= $modbus->readCoils(0, 31, 1);
   }
   catch (Exception $e) {
        echo $modbus;
        echo $e;
        exit;
    }
   
    if($recDataExtend[0] == true && $recDataNormal[0] == false){
        $valueHour = 'extend';
    }else{
       if($recDataExtend[0] == false && $recDataNormal[0] == true){
            $valueHour = 'normal';
        }else{
             if($recDataExtend[0] == true && $recDataNormal[0] == true){          
                $valueHour = 'weekend';
             }
        }
    }
    
    sendData($valueHour);
}

function sendData($dataHour){
  switch ($dataHour) {
    case $HOUR_EXTEND:
        response($HOUR_EXTEND);
        break;
    case $HOUR_NORMAL:
        response($HOUR_NORMAL);
        break;
    case $HOUR_WEEKEND:
        response($HOUR_WEEKEND);
        break;
    default:
        response('Errorrr');
   }

  
}


function response($value){
	$array = array(
	        "value" => $value,
	      );
	echo json_encode($array);
}

?>
