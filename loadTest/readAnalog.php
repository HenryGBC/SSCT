<?php
require_once dirname(__FILE__) . '/Phpmodbus/ModbusMaster.php';
// Create Modbus object
$modbus = new ModbusMaster("192.168.10.12", "TCP");
$data_true = array(TRUE);
$data_false = array(FALSE);

try{
    //$modbus->writeSingleCoil(0, 0, $data_true);

    //$recData = $modbus->readCoils(0, 10, 1);
    $recData = $modbus->readMultipleRegisters(0, 10, 2);
}catch (Exception $e) {
    echo $modbus;
    echo $e;
    exit;
}

var_dump($recData);
echo "<h3>STRING to string </h3>\n";
echo PhpType::bytes2string($recData) . "</br>";
?>
