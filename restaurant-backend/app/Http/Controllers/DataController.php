<?php

namespace App\Http\Controllers;

class DataController extends Controller
{
    protected function readJson($file)
    {
        $path = base_path("database/$file");
        return json_decode(file_get_contents($path), true);
    }
}
