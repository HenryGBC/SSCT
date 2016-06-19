<?php
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");
$data_true = array(TRUE);
$data_false = array(FALSE);
$arrayIn = [];
$arrayRecData = [];
try {
  for ($i=0; $i <24 ; $i++) {

    $recData = $modbus->readCoils(0, $i, 1);
    echo var_dump($recData);
    array_push($arrayRecData, $recData);
  }
  $recData2 = $modbus->readCoils(0, $i, 1);
}
catch (Exception $e) {
    echo $modbus;
    echo $e;
    exit;
}

for ($j=0; $j <24 ; $j++) {
  $array = array(
    "led" => $j,
    "value" => "false",
  );
  if($arrayRecData[$j][0] == true){
    $array = array(
      "led" => $j,
      "value" => "true",
    );
  }
  array_push($arrayIn, $array);
}

//echo json_encode($arrayIn);


?>
