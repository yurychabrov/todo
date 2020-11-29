<?php 
if (!$_POST) 
    header("Location: /");

require_once("db.php");

if (isset($_POST["del"])) 
    $del = trim(
                        strip_tags($_POST["del"])  // делаем минимальную обработку
                  );

else $del = null;

$delete_id = DB::set("DELETE FROM `tasks` WHERE id = ? ", $del);

if ($delete_id) {
    $items = DB::getAll("SELECT * FROM `tasks` order by id desc");
    echo json_encode($items);

}
