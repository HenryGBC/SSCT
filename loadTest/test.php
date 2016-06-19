<?php
require 'vendor/autoload.php';

const DEFAULT_URL = 'https://ssct.firebaseio.com/';
const DEFAULT_TOKEN = 'jEmrpOuMqaNqWYtydDdtwn52v931hVreZgBp8DpQ';
const DEFAULT_PATH = '/firebase/example';
$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
// --- storing an array ---
$test = array(
    "foo" => "bar",
    "i_love" => "lamp",
    "id" => 42
);

$dateTime = new DateTime();
$firebase->set(DEFAULT_PATH . '/' . $dateTime->format('c'), $test);
$firebase->set(DEFAULT_PATH . '/name/contact001', "John Doe");

// --- reading the stored string ---
//$name = $firebase->get(DEFAULT_PATH . '/name/contact001');
//echo var_dump($name);


 ?>
