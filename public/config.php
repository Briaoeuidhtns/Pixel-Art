<?php
require_once('handler.php');
header("Content-Type: application/json");
$data_dir = getenv('DATA_DIR').'/' ?: __DIR__.'/data/';
