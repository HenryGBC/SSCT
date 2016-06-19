<?php
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");
$data_true = array(TRUE);
$data_false = array(FALSE);
$led = $_POST["led"];
$value =$_POST["value"];

$array = array(
  "led" => $led,
  "value" => $value,
);
try {
		if($array["value"] == "false"){
			$modbus->writeSingleCoil(0, $array["led"], $data_true);
      $array = array(
        "led" => $led,
        "value" => "true",
      );

    }else{
    	$modbus->writeSingleCoil(0, $array["led"], $data_false);
      $array = array(
        "led" => $led,
        "value" => "false",
      );
    }

	}
	catch (Exception $e) {
	    echo $modbus;
	    echo $e;
	    exit;
	}

echo json_encode($array);
?>
