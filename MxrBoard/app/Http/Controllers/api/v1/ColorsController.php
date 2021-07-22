<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorsController extends BaseController
{
    public function index () {
        $user_id = (int)$_GET['user_id'];
        return $this->sendResponse(Color::where('author_id', $user_id)->get(), 'Colors retreived successfully');
    }

    public function addColor (Request $r) {
        $color = new Color([
            'color_value' => $r->color_value,
            'author_id' => $r->author_id
        ]);
        $color->save();
        return $this->sendResponse($color, 'Colors created successfully');
    }
}
