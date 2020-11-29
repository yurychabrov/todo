<?php 
if (!$_POST) 
    header("Location: /");

require_once("db.php");

if (isset($_POST["task_name"])) 
    $task_name = trim(
                        strip_tags($_POST["task_name"])  // делаем минимальную обработку
                  );

else {
    $task_name = null;
}

$insert_id = DB::add("INSERT INTO `tasks` (name_task) values(?) ", $task_name);

if ($insert_id) {
    $insert_id_log = DB::add("INSERT IGNORE INTO `log` (ip, task_id) values(?, ?) ", [ $_SERVER["REMOTE_ADDR"], $insert_id ]);
    $items = DB::getAll("SELECT * FROM `tasks` order by id desc");
    echo json_encode($items);
}
else {
    echo "Ошибка добавления!";
}