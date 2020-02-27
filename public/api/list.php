<?php
require_once('../config.php');

try {
    $ret = new \stdClass;
    $ret->files = array_values(array_diff(scandir($data_dir), array('..', '.')));
    echo json_encode($ret);
}catch(ErrorException $exx){
    $err = new \stdClass;
    $err->error = $exx->getMessage();
    http_response_code(500);
    echo json_encode($err);
 }
