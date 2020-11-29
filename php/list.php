<?php 
if ($_SERVER["REQUEST_METHOD"] <> 'POST') 
    header("Location: /");

require_once("db.php");

    $items = DB::getAll("SELECT * FROM `tasks` order by id desc");
    echo  json_encode($items);

   
    
