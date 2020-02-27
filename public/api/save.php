<?php
require_once('../config.php');


try {
    $file = json_decode(file_get_contents("php://input"));
    file_put_contents($data_dir . $file->name, json_encode($file->data));
    http_response_code(201);
} catch (ErrorException $exx) {
    $err = new \stdClass;
    $err->error = $exx->getMessage();
    http_response_code(500);
    echo json_encode($err);
}
