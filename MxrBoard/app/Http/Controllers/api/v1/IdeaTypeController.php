<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Idea_type;
use Illuminate\Http\Request;

class IdeaTypeController extends BaseController
{
    public function index () {
        return $this->sendResponse(Idea_type::all(), 'Retreived all idea types');
    }
}
