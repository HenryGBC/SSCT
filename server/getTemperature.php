<?php
header('Access-Control-Allow-Origin: *');  
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");

$data_true = array(TRUE);
$data_false = array(FALSE);
//$recDataCold = $modbus->readCoils(0, 0, 1);
//$recDataCalefaccion = $modbus->readCoils(0, 1, 1);
//Test without PLC

$rand = rand(0, 1);


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
if($rand==0){
     $valueTemperature = "calefaccion";
}else{
    $valueTemperature = "enfriamiento";
}

$array = array(
    "value" => $valueTemperature,
);

echo json_encode($array);
?>
