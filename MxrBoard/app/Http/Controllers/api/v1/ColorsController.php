<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorsController extends BaseController
{
    public function index () {
        return $this->sendResponse(Color::all(), 'Colors retreived successfully');
    }
}
