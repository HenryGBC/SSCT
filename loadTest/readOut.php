<?php
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");
$data_true = array(TRUE);
$data_false = array(FALSE);
$arrayIn = [];
$arrayRecData = [];
$arrayLeds = [];
try {
  for ($i=24; $i <40 ; $i++) {

    $recData = $modbus->readCoils(0, $i, 1);
    array_push($arrayRecData, $recData);
    array_push($arrayLeds, $i);

  }
}
catch (Exception $e) {
    // Print error information if any
    echo $modbus;
    echo $e;
    exit;
}
for ($j=0; $j <16 ; $j++) {
  $array = array(
    "led" => $j,
    "value" => "false",
  );

  if($arrayRecData[$j][0] == true){
    $array = array(
      "led" => $arrayLeds[$j],
      "value" => "true",
    );
  }
  array_push($arrayIn, $array);
}

echo json_encode($arrayIn);
?>
