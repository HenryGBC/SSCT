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
$arrayRecData = [];
$arrayDegrees = [];
$rand = rand(2, 10);

try{
    $i = 2;
    while ($i < 11) {
        # code...
        $degree = 5*($i-1);
        //echo $grade;
        //$recData = $modbus->readCoils(0, $i, 1);
        //array_push($arrayRecData, $recData);
        /*if($recData[0]==true){
             $array = array(
                "degree" => $degree,
                "led" => $i
            );
            response($array);
            break;
        }*/
        
        //Test local without PLC
        
        if($rand==$i){
            
            $array = array(
                "degree" => $degree,
                "led" => $i
            );
            response($array);
            break;
        }
        
        $i++;
    }
        
}
catch (Exception $e) {
    echo $modbus;
    echo $e;
    exit;
}


//echo json_encode($arrayDegrees); 
function response($array){
    echo json_encode($array);  
}

?>
