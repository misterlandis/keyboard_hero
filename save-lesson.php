
<?php
//setup database
	require_once 'meekrodb.2.3.class.php';
	DB::$user = 'keyboard_hero';
	DB::$password = 'pondscum_k';
	DB::$dbName = 'keyboard_hero';



echo "Saving lesson...";

echo var_dump($_GET);


if($_GET['id']== "new"){
	DB::insert('lessons',array(
					'title' => $_GET['title'],
					'type' => $_GET['type'],
					'prerequisites' => $_GET['prerequisites'],
					'objectives' => $_GET['objectives'],
					'content' => $_GET['content'],
					'visible' => intval($_GET['visible'])
					
				)
				);
}
else{
	DB::replace('lessons',array(
					'id' => $_GET['id'],
					'title' => $_GET['title'],
					'type' => $_GET['type'],
					'prerequisites' => $_GET['prerequisites'],
					'objectives' => $_GET['objectives'],
					'content' => $_GET['content'],
					'visible' => intval($_GET['visible'])
					
				)
				);
	
}


?>