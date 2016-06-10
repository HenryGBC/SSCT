<?php
header('Access-Control-Allow-Origin: *');  
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");

$data_true = array(TRUE);
$data_false = array(FALSE);

$recDataCold = $modbus->readCoils(0, 0, 1);
$recDataCalefaccion = $modbus->readCoils(0, 1, 1);
//Test without PLC
$valueTemperature = '';
//echo $recDataCalefaccion[0][0];
//echo $recDataCalefaccion[0];
if($recDataCalefaccion[0] == true){
    $valueTemperature = "calefaccion";
}else{
    if($recDataCold[0] == true){
        $valueTemperature = "enfriamiento";
    }else{
        $valueTemperature = "none";
    }

}

//Test without PLC
/*
if($rand==0){
     $valueTemperature = "calefaccion";
}else{
    $valueTemperature = "enfriamiento";
}
*/

$valueHour =''; ///Read from PLC
//$recData = $modbus->readCoils(0, 0, 1);
$recDataExtend= $modbus->readCoils(0, 30, 1);
$recDataNormal= $modbus->readCoils(0, 31, 1);

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



  
$array = array(
    "value" => $valueTemperature,
    "hour" => $valueHour
);

echo json_encode($array);
?>
