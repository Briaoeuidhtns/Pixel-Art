<?php
require_once('../config.php');

try{
    $ret = new \stdClass;
    $ret->name = $_GET['name'];
    $ret->data = file_get_contents($data_dir.$_GET['name']);
    echo json_encode($ret);
}catch(ErrorException $exx){
    $err = new \stdClass;
    $err->error = $exx->getMessage();
    http_response_code(404);
    echo json_encode($err);
 }
