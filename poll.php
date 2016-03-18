<?php
$time_start = microtime(true);

require_once 'meekrodb.2.3.class.php';
DB::$user = 'keyboard_hero';
DB::$password = 'pondscum_k';
DB::$dbName = 'keyboard_hero';


$username = $_GET['username'];

$action = DB::queryFirstRow("SELECT id, username, action, data1, data2  FROM teacher_actions WHERE username LIKE %s AND delivered LIKE 'N'", $username);

//if there's no new messages, just loop until we find one or we're up to 10 mins
while($action == "" && microtime(true) - $time_start < 10){
	$action = DB::queryFirstRow("SELECT id, username, action, data1, data2  FROM teacher_actions WHERE username LIKE %s AND delivered LIKE 'N'", $username);
}

if($action == ""){ // no message
	echo ".";
}
else{
	DB::update('teacher_actions', array('delivered'=>'Y'),"id=%s",$action['id']); //mark message as delivered
	echo json_encode($action);

}



?> 